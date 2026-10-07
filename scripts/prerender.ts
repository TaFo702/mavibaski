import fs from "fs";
import path from "path";
import { getRouteSEO, injectSEOMetadata, URL_REDIRECTS, knownStaticRoutes } from "../src/utils/seoGenerator";
import { createRouteRenderer } from './render-route';

async function prerender() {
  console.log("--- Starting Static HTML Metadata Prerendering ---");
  const distDir = path.join(process.cwd(), "dist");
  const templatePath = path.join(distDir, "index.html");
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");

  if (!fs.existsSync(templatePath)) {
    throw new Error("dist/index.html not found! Run vite build before prerender.");
  }

  if (!fs.existsSync(sitemapPath)) {
    console.log("public/sitemap.xml not found, generating sitemap from active route definitions...");
    try {
      const { execSync } = await import("child_process");
      execSync("npx tsx generate-complete-sitemap.ts", { stdio: "inherit" });
    } catch (err) {
      console.error("Failed to generate sitemap:", err);
    }
  }

  if (!fs.existsSync(sitemapPath)) {
    throw new Error("public/sitemap.xml not found!");
  }

  const rawTemplate = fs.readFileSync(templatePath, "utf-8");
  const template = rawTemplate
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "")
    .replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>');
  const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");
  // Fallback responses must use the empty template, not the rendered homepage.
  fs.writeFileSync(path.join(distDir, '.seo-template.html'), template, 'utf-8');

  // Extract all <loc> URLs from sitemap.xml
  const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

  if (locMatches.length === 0) {
    throw new Error("No URLs found in sitemap.xml!");
  }

  console.log(`Found ${locMatches.length} URLs in public/sitemap.xml`);

  let generatedCount = 0;
  const redirectKeys = new Set(Object.keys(URL_REDIRECTS).map(k => k.toLowerCase()));

  const additionalUrls = [...knownStaticRoutes].map(route => `https://mavibasim.com${route}`);
  const targetUrls = Array.from(new Set([...locMatches, ...additionalUrls]));
  const renderer = await createRouteRenderer(distDir);

  try {
  for (const fullUrl of targetUrls) {
    let pathname = fullUrl.replace(/^https?:\/\/[^/]+/i, "");
    if (!pathname) pathname = "/";
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.substring(0, pathname.length - 1);
    }

    // Skip 301 redirect URLs so they are never generated as static files
    if (redirectKeys.has(pathname.toLowerCase())) {
      console.log(`Skipping 301 redirect route: ${pathname}`);
      continue;
    }

    try {
      const seo = getRouteSEO(pathname);
      const metadataHTML = injectSEOMetadata(
        template,
        seo.title,
        seo.desc,
        seo.canonical,
        false,
        seo.extraHead,
        seo.h1Text,
        seo.bodyContent,
        seo.ogImage
      );
      const html = await renderer.render(pathname, metadataHTML);

      let targetPath: string;
      if (pathname === "/" || pathname === "") {
        targetPath = path.join(distDir, "index.html");
      } else {
        const routeDir = path.join(distDir, pathname.replace(/^\//, ""));
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        targetPath = path.join(routeDir, "index.html");
      }

      fs.writeFileSync(targetPath, html, "utf-8");
      generatedCount++;
    } catch (err) {
      console.error(`FAILED to prerender route: ${pathname}`, err);
      throw err;
    }
  }
  } finally {
    renderer.dispose();
  }

  console.log(`Prerender completed successfully: ${generatedCount} static HTML files generated.`);
}

prerender().catch((err) => {
  console.error("Fatal prerender execution error:", err);
  process.exitCode = 1;
});
