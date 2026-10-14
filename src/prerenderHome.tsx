import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ZarfPage from './components/Zarf';
import { DosyalarPage } from './components/Dosyalar';
import { AntetliPage } from './components/Antetli';
import { BlogPage } from './components/Blog';

export function prerenderHome() {
  const HomeRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={HomeRouter} />);
}

export function prerenderZarf() {
  const ZarfRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/zarf']}>{children}</MemoryRouter>
  );
  // Resolve only this build-time route without altering the client's lazy route.
  return renderToString(<App Router={ZarfRouter} ZarfComponent={ZarfPage} />);
}

// Use the existing blog renderer for this audited route. The browser keeps its lazy route.
export function prerenderZarfBlog(pathname = '/blog/zarf-baskisinda-diplomat-ve-torba-zarf') {
  const BlogRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[pathname]}>{children}</MemoryRouter>
  );
  // Metadata remains owned by injectSEOMetadata; keep only visible React output here.
  return renderToString(<App Router={BlogRouter} BlogComponent={BlogPage} />)
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}


export function prerenderAntetli() {
  const AntetliRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/antetli']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={AntetliRouter} AntetliComponent={AntetliPage} />);
}

export function prerenderDosyalar() {
  const DosyalarRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/dosyalar']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={DosyalarRouter} DosyalarComponent={DosyalarPage} />);
}
