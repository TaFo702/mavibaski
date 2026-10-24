import { YagKartiPage } from './components/YagKarti';
import { MagnetPage } from './components/Magnet';
import { EtiketPage } from './components/Etiket';
import { AmerikanServisPage } from './components/AmerikanServis';
import { OtoPaspasPage } from './components/OtoPaspas';
import { AfisPage } from './components/Afis';
import { ElIlaniPage } from './components/ElIlani';
import { BrosurPage } from './components/Brosur';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ZarfPage from './components/Zarf';
import { DosyalarPage } from './components/Dosyalar';
import { BloknotlarPage } from './components/Bloknotlar';
import { AntetliPage } from './components/Antetli';
import { KatalogPage } from './components/Katalog';
import { KartvizitPage } from './components/Kartvizit';
import { BlogPage } from './components/Blog';
import { GenericPriceTablePage, MakbuzFormlarPage } from './components/Makbuz';
import { CityPage } from './components/CityPage';
import { SEOPages } from './components/SEOPages';
import { SECTOR_PRICE_PRODUCTS } from './data/sectorPriceExamples';

export function prerenderSectorPages(): Record<string, string> {
  const sectorPages = Object.fromEntries(Object.keys(SECTOR_PRICE_PRODUCTS).map(pathname => [pathname, SEOPages]));
  return Object.fromEntries(Object.keys(sectorPages).map(pathname => {
    const SectorRouter = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={[pathname]}>{children}</MemoryRouter>
    );
    const html = renderToString(<App Router={SectorRouter} StaticPages={sectorPages} />)
      .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
      .replace(/<meta\b[^>]*\/?>/gi, '')
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
    if (!html.includes('data-sector-hero') || (html.match(/<h1\b/g) || []).length !== 1) {
      throw new Error(`Missing sector hero or H1: ${pathname}`);
    }
    return [pathname, html];
  }));
}

import { CILT_ISLERI_DATA } from './data/makbuzData';
import { STATIC_PAGE_ROUTES } from './data/staticPageRoutes';
import { KitapAyraciPage } from './components/KitapAyraci';
import { IletisimPage } from './components/Contact';
import { MatbaaPage } from './components/Matbaa';
import { ReferanslarPage } from './components/References';
import { SikcaSorulanPage } from './components/FAQ';
import { GrafikTasarimPage } from './components/GrafikTasarim';
import { HakkimizdaPage } from './components/About';
import { KullanimSartlariPage } from './components/KullanimSartlari';
import { GizlilikPolitikasiPage } from './components/GizlilikPolitikasi';
import { CerezPolitikasiPage } from './components/CerezPolitikasi';
import { MesafeliSatisSozlesmesiPage } from './components/MesafeliSatisSozlesmesi';
import { IptalVeiadeSartlariPage } from './components/IptalVeiadeSartlari';
import { LisansPage } from './components/Lisans';

const CiltIsleriPage = () => <GenericPriceTablePage data={CILT_ISLERI_DATA} />;

const staticPages: Partial<Record<string, React.ComponentType>> = {
  '/kitap-ayraci': KitapAyraciPage,
  '/cilt-isleri': CiltIsleriPage,
  '/makbuz-ve-formlar': MakbuzFormlarPage,
  '/matbaa': MatbaaPage,
  '/referanslar': ReferanslarPage,
  '/sikca-sorulan': SikcaSorulanPage,
  '/grafik-tasarim': GrafikTasarimPage,
  '/hakkimizda': HakkimizdaPage,
  '/iletisim': IletisimPage,
  '/kullanim-sartlari': KullanimSartlariPage,
  '/gizlilik-politikasi': GizlilikPolitikasiPage,
  '/cerez-politikasi': CerezPolitikasiPage,
  '/mesafeli-satis-sozlesmesi': MesafeliSatisSozlesmesiPage,
  '/iptal-ve-iade-sartlari': IptalVeiadeSartlariPage,
  '/lisans': LisansPage,
  '/blog': BlogPage,
};

export function prerenderStaticPages() {
  return Object.fromEntries(STATIC_PAGE_ROUTES.map(pathname => {
    const PageRouter = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={[pathname]}>{children}</MemoryRouter>
    );
    // Use the existing page and layout; the SEO head stays owned by injectSEOMetadata.
    const html = renderToString(<App Router={PageRouter} StaticPages={staticPages} />)
      .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
      .replace(/<meta\b[^>]*\/?>/gi, '')
      .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
    if ((html.match(/<h1\b/g) || []).length !== 1 || !html.includes('<main')) {
      throw new Error(`Static page is missing its existing H1 or main content: ${pathname}`);
    }
    return [pathname, html];
  }));
}

export function prerenderCity(pathname: string) {
  const CityRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[pathname]}>{children}</MemoryRouter>
  );
  // The first-HTML head is owned by getRouteSEO/injectSEOMetadata. React 19
  // can return native metadata with the body; keep it out of the root tree.
  return renderToString(<App Router={CityRouter} CityComponent={CityPage} />)
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}

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

export function prerenderBloknotlar() {
  const BloknotlarRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/bloknotlar']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={BloknotlarRouter} BloknotlarComponent={BloknotlarPage} />);
}

export function prerenderKatalog() {
  const KatalogRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/kataloglar']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={KatalogRouter} KatalogComponent={KatalogPage} />);
}

export function prerenderKartvizit() {
  const KartvizitRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/kartvizit']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={KartvizitRouter} KartvizitComponent={KartvizitPage} />);
}

export function prerenderTediyeMakbuzu() {
  const TediyeRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/tediye-makbuzu']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={TediyeRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

export function prerenderRecete() {
  const ReceteRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/recete']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={ReceteRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

// Render the audited page with its existing, unchanged pricing component.
export function prerenderGiderMakbuzu() {
  const GiderRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/gider-makbuzu']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={GiderRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

// Keep the existing page, price table and client hydration tree in sync.
export function prerenderTahsilatMakbuzu() {
  const TahsilatRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/tahsilat-makbuzu']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={TahsilatRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

// Reuse the page and protected price component for the complete initial HTML.
export function prerenderAracKiralama() {
  const AracKiralamaRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/arac-kiralama']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={AracKiralamaRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

// Render the contract page with its existing, protected pricing component.
export function prerenderSozlesme() {
  const SozlesmeRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/sozlesme-baski']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={SozlesmeRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

// Reuse the existing para makbuzu page and protected pricing component.
export function prerenderParaMakbuzu() {
  const ParaRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/para-makbuzu']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={ParaRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

// Reuse the sipariş fişi page, including its protected pricing component.
export function prerenderSiparisFisi() {
  const SiparisRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/siparis-fisi']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={SiparisRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

// Render the existing Adisyon page and its protected price table before hydration.
export function prerenderAdisyon() {
  const AdisyonRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/adisyon']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={AdisyonRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

// Render the existing page unchanged, including its protected filter and tables.
export function prerenderBrosur() {
  const BrosurRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/brosur']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={BrosurRouter} BrosurComponent={BrosurPage} />)
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}

// Render the existing page and protected table with the same tree the client hydrates.
export function prerenderElIlani() {
  const ElIlaniRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/el-ilani']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={ElIlaniRouter} ElIlaniComponent={ElIlaniPage} />)
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}

// Render the existing afiş page without changing its protected table.
export function prerenderAfis() {
  const AfisRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/afis']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={AfisRouter} AfisComponent={AfisPage} />)
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}

// Use the existing page, including the unchanged protected price section.
export function prerenderOtoPaspas() {
  const OtoPaspasRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/oto-paspas']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={OtoPaspasRouter} OtoPaspasComponent={OtoPaspasPage} />)
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}

// Render the existing page and protected price table without changing their markup.
export function prerenderAmerikanServis() {
  const AmerikanServisRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/amerikan-servis']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={AmerikanServisRouter} AmerikanServisComponent={AmerikanServisPage} />)
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}

// Reuse the existing page and protected table for the initial HTML and hydration.
export function prerenderPerakendeSatisFisi() {
  const PerakendeRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/perakende-satis-fisi']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={PerakendeRouter} MakbuzComponent={MakbuzFormlarPage} />);
}

// Reuse the existing page, including the protected price table, for hydration.
export function prerenderEtiket() {
  const EtiketRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/etiket']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={EtiketRouter} EtiketComponent={EtiketPage} />)
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}

// Render the existing Magnet page, including its unchanged protected tariff.
export function prerenderMagnet() {
  const MagnetRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/magnet']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={MagnetRouter} MagnetComponent={MagnetPage} />)
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}

// Use the existing page and protected tariff unchanged for the first HTML.
export function prerenderYagKarti() {
  const YagKartiRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/yag-karti']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={YagKartiRouter} YagKartiComponent={YagKartiPage} />)
    .replace(/<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b[^>]*rel="canonical"[^>]*\/?>/gi, '')
    .replace(/<meta\b[^>]*\/?>/gi, '')
    .replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
}
