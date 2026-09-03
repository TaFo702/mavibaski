import fs from "fs";
import path from "path";
import { getRouteSEO, injectSEOMetadata, URL_REDIRECTS } from "../src/utils/seoGenerator";

async function prerender() {
  console.log("--- Starting Static HTML Metadata Prerendering ---");
  const distDir = path.join(process.cwd(), "dist");
  const templatePath = path.join(distDir, "index.html");
  const sitemapPath = path.join(process.cwd(), "public", "sitemap.xml");

  if (!fs.existsSync(templatePath)) {
    console.error("CRITICAL ERROR: dist/index.html not found! Run vite build before prerender.");
    process.exit(1);
  }

  if (!fs.existsSync(sitemapPath)) {
    console.error("CRITICAL ERROR: public/sitemap.xml not found!");
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");

  // Extract all <loc> URLs from sitemap.xml
  const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

  if (locMatches.length === 0) {
    console.error("CRITICAL ERROR: No URLs found in sitemap.xml!");
    process.exit(1);
  }

  console.log(`Found ${locMatches.length} URLs in public/sitemap.xml`);

  let generatedCount = 0;
  const redirectKeys = new Set(Object.keys(URL_REDIRECTS).map(k => k.toLowerCase()));

  for (const fullUrl of locMatches) {
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
      const html = injectSEOMetadata(
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
      process.exit(1);
    }
  }

  console.log(`Prerender completed successfully: ${generatedCount} static HTML files generated.`);
}

prerender().catch((err) => {
  console.error("Fatal prerender execution error:", err);
  process.exit(1);
});
