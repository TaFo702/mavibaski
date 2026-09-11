import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";


import {
  getRouteSEO,
  injectSEOMetadata,
  isKnownRoute,
  URL_REDIRECTS,
  knownStaticRoutes,
  citySlugs,
  staticPages
} from "./src/utils/seoGenerator";

export {
  getRouteSEO,
  injectSEOMetadata,
  isKnownRoute,
  URL_REDIRECTS,
  knownStaticRoutes,
  citySlugs,
  staticPages
};

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // WWW to non-WWW 301 Permanent Redirect
  app.use((req, res, next) => {
    const host = req.headers.host;
    if (host && host.toLowerCase().startsWith("www.")) {
      const nonWwwHost = host.substring(4);
      return res.redirect(301, `https://${nonWwwHost}${req.originalUrl || req.url}`);
    }
    next();
  });

  // URL 301 Permanent Redirects
  app.use((req, res, next) => {
    let cleanPath = req.path.trim().toLowerCase();
    if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
      cleanPath = cleanPath.substring(0, cleanPath.length - 1);
    }
    const redirectTarget = URL_REDIRECTS[cleanPath] || URL_REDIRECTS[req.path];
    if (redirectTarget) {
      const rawUrl = req.originalUrl || req.url;
      const queryIdx = rawUrl.indexOf('?');
      const queryString = queryIdx >= 0 ? rawUrl.substring(queryIdx) : '';
      return res.redirect(301, `${redirectTarget}${queryString}`);
    }
    next();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Dynamic SEO pre-injection fallback for any direct routing matching a client screen in development
    app.get("*", async (req, res, next) => {
      if (req.path.includes(".") || req.path.startsWith("/api/")) {
        return next();
      }
      try {
        const url = req.originalUrl;
        let template = fs.readFileSync(path.join(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        const known = isKnownRoute(req.path);
        const statusCode = known ? 200 : 404;
        const seo = known
          ? getRouteSEO(req.path)
          : {
              title: "404 Sayfa Bulunamadı | Mavi Basım",
              desc: "Aradığınız sayfa veya dijital matbaa ürünü bulunamadı.",
              canonical: `https://mavibasim.com${req.path}`
            };
        const html = injectSEOMetadata(template, seo.title, seo.desc, seo.canonical, !known, seo.extraHead, seo.h1Text, seo.bodyContent, seo.ogImage);
        res.status(statusCode).set({ "Content-Type": "text/html" }).end(html);
      } catch (e) {
        next(e);
      }
    });

  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files (exclude index.html so that root serves our SEO-injected page)
    app.use(express.static(distPath, { index: false, redirect: false }));

    // Dynamic SEO pre-injection fallback for any client path in production
    app.get("*", (req, res, next) => {
      if (req.path.includes(".") || req.path.startsWith("/api/")) {
        return next();
      }
      try {
        let cleanPath = req.path.trim().toLowerCase();
        if (cleanPath.length > 1 && cleanPath.endsWith("/")) {
          cleanPath = cleanPath.substring(0, cleanPath.length - 1);
        }
        const cleanSlug = cleanPath.replace(/^\//, "");
        const prerenderedPath = cleanSlug ? path.join(distPath, cleanSlug, "index.html") : null;
        if (prerenderedPath && fs.existsSync(prerenderedPath)) {
          return res.status(200).set({ "Content-Type": "text/html" }).sendFile(prerenderedPath);
        }

        const indexPath = path.join(distPath, "index.html");
        if (fs.existsSync(indexPath)) {
          const template = fs.readFileSync(indexPath, "utf-8");
          const known = isKnownRoute(req.path);
          const statusCode = known ? 200 : 404;
          const seo = known
            ? getRouteSEO(req.path)
            : {
                title: "404 Sayfa Bulunamadı | Mavi Basım",
                desc: "Aradığınız sayfa veya dijital matbaa ürünü bulunamadı.",
                canonical: `https://mavibasim.com${req.path}`
              };
          const html = injectSEOMetadata(template, seo.title, seo.desc, seo.canonical, !known, seo.extraHead, seo.h1Text, seo.bodyContent, seo.ogImage);
          res.status(statusCode).set({ "Content-Type": "text/html" }).end(html);
        } else {
          res.status(404).send("index.html not found");
        }
      } catch (err) {
        console.error("Error inject SEO in production:", err);
        res.sendFile(path.join(distPath, "index.html"));
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

if (process.env.NODE_ENV !== "test" && process.env.DISABLE_AUTO_START !== "true" && !process.env.DISABLE_AUTO_START) {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
  });
}
