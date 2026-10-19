import fs from "fs";
import path from "path";
import { getRouteSEO, injectSEOMetadata, URL_REDIRECTS } from "../src/utils/seoGenerator";
import { build } from "esbuild";
import { createRequire } from "node:module";
import { optimizeReceteHTML, optimizeProductHTML } from "./recetePerformance";
import { CITIES_DATA } from '../src/data/cityData';

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
  let tediyeContent: string;
  let receteContent: string;
  let giderContent: string;
  let tahsilatContent: string;
  let aracKiralamaContent: string;
  let sozlesmeContent: string;
  let paraContent: string;
  let siparisContent: string;
  let adisyonContent: string;
  let zarfBlogContent: string;
  let antetliBlogContent: string;
  let otokopiliBlogContent: string;
  const cityContent: Record<string, string> = {};
  try {
    await build({ entryPoints: ['src/prerenderHome.tsx'], outfile: rendererPath,
      bundle: true, platform: 'node', format: 'cjs', packages: 'external' });
    const { prerenderHome, prerenderZarf, prerenderZarfBlog, prerenderAntetli, prerenderDosyalar, prerenderBloknotlar, prerenderKatalog, prerenderKartvizit, prerenderTediyeMakbuzu, prerenderRecete, prerenderGiderMakbuzu, prerenderTahsilatMakbuzu, prerenderAracKiralama, prerenderSozlesme, prerenderParaMakbuzu, prerenderSiparisFisi, prerenderAdisyon, prerenderCity } = createRequire(import.meta.url)(rendererPath);
    homeContent = prerenderHome();
    zarfContent = prerenderZarf();
    antetliContent = prerenderAntetli();
    dosyalarContent = prerenderDosyalar();
    bloknotlarContent = prerenderBloknotlar();
    katalogContent = prerenderKatalog();
    kartvizitContent = prerenderKartvizit();
    tediyeContent = prerenderTediyeMakbuzu();
    receteContent = prerenderRecete();
    giderContent = prerenderGiderMakbuzu();
    tahsilatContent = prerenderTahsilatMakbuzu();
    if ((tahsilatContent.match(/id="fiyat-tablosu"/g) || []).length !== 1 ||
        (tahsilatContent.match(/<h1\b/g) || []).length !== 1 ||
        !tahsilatContent.includes('Tahsilat Makbuzu 14 x 20 cm Fiyat Listesi') ||
        !tahsilatContent.includes('id="ozellikler"') ||
        !tahsilatContent.includes('id="nasil-doldurulur"') ||
        !tahsilatContent.includes('id="sss-bolumu"') ||
        !tahsilatContent.includes('Tahsilat Makbuzu Ürün Fotoğraf Galerisi')) {
      throw new Error('Tahsilat prerender validation failed: existing pricing, content, gallery, FAQ or H1 missing.');
    }
    paraContent = prerenderParaMakbuzu();
    siparisContent = prerenderSiparisFisi();
    adisyonContent = prerenderAdisyon();
    if ((adisyonContent.match(/id="fiyat-tablosu"/g) || []).length !== 1 ||
        (adisyonContent.match(/<h1\b/g) || []).length !== 1 ||
        !adisyonContent.includes('id="sss-bolumu"') ||
        !adisyonContent.includes('Numaratörlü Adisyon Baskı Örnekleri') ||
        !adisyonContent.includes('10 x 14 cm')) {
      throw new Error('Adisyon prerender is missing its existing content or protected price table.');
    }
    if ((siparisContent.match(/id="fiyat-tablosu"/g) || []).length !== 1 ||
        (siparisContent.match(/<h1\b/g) || []).length !== 1 ||
        !siparisContent.includes('id="kimler-kullanir"') ||
        !siparisContent.includes('id="uretim-sureci"') ||
        !siparisContent.includes('id="sss-bolumu"') ||
        !siparisContent.includes('Sipariş Fişi Ürün Fotoğraf Galerisi') ||
        !siparisContent.includes('14 x 20 cm (YARIM BOY)')) {
      throw new Error('Sipariş fişi prerender validation failed: existing pricing, content, gallery, FAQ or H1 missing.');
    }
    if ((paraContent.match(/id="fiyat-tablosu"/g) || []).length !== 1 ||
        (paraContent.match(/<h1\b/g) || []).length !== 1 ||
        !paraContent.includes('id="sss-bolumu"') ||
        !paraContent.includes('Para Makbuzu Ürün Fotoğraf Galerisi') ||
        !paraContent.includes('14 x 20 cm (YARIM BOY)')) {
      throw new Error('Para makbuzu prerender validation failed: existing pricing, gallery, FAQ or H1 missing.');
    }
    sozlesmeContent = prerenderSozlesme();
    if ((sozlesmeContent.match(/id="fiyat-tablosu"/g) || []).length !== 1 ||
        (sozlesmeContent.match(/<h1\b/g) || []).length !== 1 ||
        !sozlesmeContent.includes('id="sss-bolumu"') ||
        !sozlesmeContent.includes('Sözleşme Baskı Ürün Fotoğraf Galerisi') ||
        !sozlesmeContent.includes('20,5 x 28,5 cm (TAM BOY)')) {
      throw new Error('Contract prerender validation failed: existing pricing, gallery, FAQ or H1 missing.');
    }
    aracKiralamaContent = prerenderAracKiralama();
    if ((aracKiralamaContent.match(/id="fiyat-tablosu"/g) || []).length !== 1 ||
        (aracKiralamaContent.match(/<h1\b/g) || []).length !== 1 ||
        !aracKiralamaContent.includes('id="sss-bolumu"') ||
        !aracKiralamaContent.includes('Araç Kiralama Ürün Fotoğraf Galerisi') ||
        !aracKiralamaContent.includes('20,5 x 28,5 cm (TAM BOY)')) {
      throw new Error('Araç kiralama prerender validation failed: existing pricing, gallery, FAQ or H1 missing.');
    }
    if ((giderContent.match(/id="fiyat-tablosu"/g) || []).length !== 1 ||
        !giderContent.includes('id="sss-bolumu"') ||
        !giderContent.includes('Gider Makbuzu Ürün Fotoğraf Galerisi')) {
      throw new Error('Gider prerender validation failed: existing table, gallery or FAQ missing.');
    }
    // Keep the published pricing section byte-for-byte. Only the surrounding
    // content comes from the existing React page; neither pricing renderer changes.
    const pricingSection = /<section\b[^>]*\bid="fiyat-tablosu"[^>]*>[\s\S]*?<\/section>/g;
    const protectedPricing = getRouteSEO('/kartvizit').bodyContent?.match(pricingSection);
    if (protectedPricing?.length !== 1 || kartvizitContent.match(pricingSection)?.length !== 1) {
      throw new Error('Kartvizit pricing preservation failed: expected one section in each renderer.');
    }
    // The protected legacy section omits the existing tax notice. Keep that
    // section intact and carry the React notice immediately after it so both
    // initial HTML and the client show the same commercial information once.
    const taxNotices = kartvizitContent.match(/<div\b[^>]*>[^<]*Fiyatlarımıza[^<]*KDV[^<]*<\/div>/g);
    if (taxNotices?.length !== 1) {
      throw new Error('Kartvizit tax notice preservation failed: expected one existing notice.');
    }
    kartvizitContent = kartvizitContent.replace(pricingSection, () => protectedPricing[0] + taxNotices[0]);

    // Use the existing React page and its unchanged pricing component for
    // the full first-HTML output, keeping it identical to the hydration tree.
    const pricingRootIndex = tediyeContent.indexOf('id="fiyat-tablosu"');
    const renderedTableMatch = pricingRootIndex < 0
      ? null
      : /<table\b[\s\S]*?<\/table>/i.exec(tediyeContent.slice(pricingRootIndex));
    if (!renderedTableMatch ||
        (tediyeContent.match(/id="fiyat-tablosu"/g) || []).length !== 1) {
      throw new Error('Tediye pricing preservation failed: expected one existing React price table.');
    }
    if (!renderedTableMatch[0].includes('Tediye Makbuzu 14 x 20 cm Yarım Boy Fiyat Listesi') ||
        (tediyeContent.match(/<h1\b/g) || []).length !== 1 ||
        !tediyeContent.includes('id="sss-bolumu"') || !tediyeContent.includes('Tediye makbuzları ne kadar süre saklanmalıdır?')) {
      throw new Error('Tediye prerender validation failed: content or protected table did not match expectations.');
    }
    zarfBlogContent = prerenderZarfBlog();
    antetliBlogContent = prerenderZarfBlog('/blog/antetli-kagit-baskisinda-80gr-1.hamur');
    otokopiliBlogContent = prerenderZarfBlog('/blog/adisyon-ve-makbuzlarda-otokopili-kagit');
    if (!otokopiliBlogContent.includes('Otokopili ne demek?') ||
        !otokopiliBlogContent.includes('href="/adisyon"') ||
        (otokopiliBlogContent.match(/<h1\b/g) || []).length !== 1) {
      throw new Error('Otokopili guide prerender validation failed: article, FAQ or product link missing.');
    }
    for (const city of CITIES_DATA) {
      const route = `/${city.slug}`;
      cityContent[route] = prerenderCity(route);
      if ((cityContent[route].match(/<h1\b/g) || []).length !== 1 || !cityContent[route].includes('id="teklif-bilgileri"')) {
        throw new Error(`City prerender missing H1 or order content: ${route}`);
      }
    }
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
          : pathname === '/gider-makbuzu' ? giderContent
          : pathname === '/tahsilat-makbuzu' ? tahsilatContent
          : pathname === '/para-makbuzu' ? paraContent
          : pathname === '/siparis-fisi' ? siparisContent
          : pathname === '/adisyon' ? adisyonContent
          : pathname === '/sozlesme-baski' ? sozlesmeContent
          : pathname === '/arac-kiralama' ? aracKiralamaContent
          : pathname === '/recete' ? receteContent
          : pathname === '/tediye-makbuzu' ? tediyeContent
          : pathname === '/blog/zarf-baskisinda-diplomat-ve-torba-zarf' ? zarfBlogContent
          : pathname === '/blog/antetli-kagit-baskisinda-80gr-1.hamur' ? antetliBlogContent
          : pathname === '/blog/adisyon-ve-makbuzlarda-otokopili-kagit' ? otokopiliBlogContent : cityContent[pathname] || seo.bodyContent,
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

      let output = pathname === '/'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="home">')
        : pathname === '/zarf'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="zarf">')
        : pathname === '/antetli'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="antetli">')
        : pathname === '/dosyalar'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="dosyalar">')
        : pathname === '/bloknotlar'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="bloknotlar">')
        : pathname === '/gider-makbuzu'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="gider-makbuzu">')
        : pathname === '/tahsilat-makbuzu'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="tahsilat-makbuzu">')
        : pathname === '/para-makbuzu'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="para-makbuzu">')
        : pathname === '/siparis-fisi'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="siparis-fisi">')
        : pathname === '/adisyon'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="adisyon">')
        : pathname === '/blog/adisyon-ve-makbuzlarda-otokopili-kagit'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="otokopili-kagit-blog">')
        : pathname === '/sozlesme-baski'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="sozlesme-baski">')
        : pathname === '/arac-kiralama'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="arac-kiralama">')
        : pathname === '/recete'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="recete">')
        : pathname === '/kataloglar'
        ? html.replace('<div id="root">', '<div id="root" data-prerendered="kataloglar">')
        : html;
      if (cityContent[pathname]) output = output.replace('<div id="root">', `<div id="root" data-prerendered="${pathname.slice(1)}">`);
      if (pathname === "/recete") output = optimizeReceteHTML(output, distDir);
      if (pathname === "/arac-kiralama") output = optimizeProductHTML(output, distDir, "arac-kiralama");
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
