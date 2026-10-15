import fs from "fs";
import path from "path";
import { getRouteSEO, injectSEOMetadata, URL_REDIRECTS } from "../src/utils/seoGenerator";
import { build } from "esbuild";
import { createRequire } from "node:module";

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
    console.log("public/sitemap.xml not found, generating sitemap from active route definitions...");
    try {
      const { execSync } = await import("child_process");
      execSync("npx tsx generate-complete-sitemap.ts", { stdio: "inherit" });
    } catch (err) {
      console.error("Failed to generate sitemap:", err);
    }
  }

  if (!fs.existsSync(sitemapPath)) {
    console.error("CRITICAL ERROR: public/sitemap.xml not found!");
    process.exit(1);
  }

  const shellPath = path.join(distDir, '.prerender-template.html');
  const builtTemplate = fs.readFileSync(templatePath, "utf-8");
  const rawTemplate = builtTemplate.includes('data-prerendered="home"')
    ? fs.readFileSync(shellPath, 'utf-8') : builtTemplate;
  fs.writeFileSync(shellPath, rawTemplate, 'utf-8');
  const template = rawTemplate
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "")
    .replace(/<div id="root">[\s\S]*?<\/div>/i, '<div id="root"></div>');
  const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");

  // Bundle the existing React renderers with the project's existing esbuild.
  // CJS interop also supports react-helmet-async's Node package exports.
  const rendererPath = path.join(distDir, '.prerender-home.cjs');
  let homeContent: string;
  let zarfContent: string;
  let antetliContent: string;
  let dosyalarContent: string;
  let bloknotlarContent: string;
  let katalogContent: string;
  let kartvizitContent: string;
  let zarfBlogContent: string;
  let antetliBlogContent: string;
  try {
    await build({ entryPoints: ['src/prerenderHome.tsx'], outfile: rendererPath,
      bundle: true, platform: 'node', format: 'cjs', packages: 'external' });
    const { prerenderHome, prerenderZarf, prerenderZarfBlog, prerenderAntetli, prerenderDosyalar, prerenderBloknotlar, prerenderKatalog, prerenderKartvizit } = createRequire(import.meta.url)(rendererPath);
    homeContent = prerenderHome();
    zarfContent = prerenderZarf();
    antetliContent = prerenderAntetli();
    dosyalarContent = prerenderDosyalar();
    bloknotlarContent = prerenderBloknotlar();
    katalogContent = prerenderKatalog();
    kartvizitContent = prerenderKartvizit();
    // Keep the published pricing section byte-for-byte. Only the surrounding
    // content comes from the existing React page; neither pricing renderer changes.
    const pricingSection = /<section\b[^>]*\bid="fiyat-tablosu"[^>]*>[\s\S]*?<\/section>/g;
    const protectedPricing = getRouteSEO('/kartvizit').bodyContent?.match(pricingSection);
    if (protectedPricing?.length !== 1 || kartvizitContent.match(pricingSection)?.length !== 1) {
      throw new Error('Kartvizit pricing preservation failed: expected one section in each renderer.');
    }
    kartvizitContent = kartvizitContent.replace(pricingSection, () => protectedPricing[0]);
    zarfBlogContent = prerenderZarfBlog();
    antetliBlogContent = prerenderZarfBlog('/blog/antetli-kagit-baskisinda-80gr-1.hamur');
  } finally { fs.rmSync(rendererPath, { force: true }); }

  // Extract all <loc> URLs from sitemap.xml
  const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

  if (locMatches.length === 0) {
    console.error("CRITICAL ERROR: No URLs found in sitemap.xml!");
    process.exit(1);
  }

  console.log(`Found ${locMatches.length} URLs in public/sitemap.xml`);

  let generatedCount = 0;
  const redirectKeys = new Set(Object.keys(URL_REDIRECTS).map(k => k.toLowerCase()));

  const additionalUrls = ["https://mavibasim.com/teslimat-sartlari"];
  const targetUrls = Array.from(new Set([...locMatches, ...additionalUrls]));

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
      const html = injectSEOMetadata(
        template,
        seo.title,
        seo.desc,
        seo.canonical,
        false,
        seo.extraHead,
        seo.h1Text,
        pathname === '/' ? homeContent : pathname === '/zarf' ? zarfContent
          : pathname === '/antetli' ? antetliContent
          : pathname === '/dosyalar' ? dosyalarContent
          : pathname === '/bloknotlar' ? bloknotlarContent
          : pathname === '/kataloglar' ? katalogContent
          : pathname === '/kartvizit' ? kartvizitContent
          : pathname === '/blog/zarf-baskisinda-diplomat-ve-torba-zarf' ? zarfBlogContent
          : pathname === '/blog/antetli-kagit-baskisinda-80gr-1.hamur' ? antetliBlogContent : seo.bodyContent,
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

      const output = pathname === '/'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="home">')
        : pathname === '/zarf'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="zarf">')
        : pathname === '/antetli'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="antetli">')
        : pathname === '/dosyalar'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="dosyalar">')
        : pathname === '/bloknotlar'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="bloknotlar">')
        : pathname === '/kataloglar'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="kataloglar">')
        : html;
      fs.writeFileSync(targetPath, output, "utf-8");
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
