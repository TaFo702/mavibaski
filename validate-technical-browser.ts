import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium, type Page } from 'playwright';

declare global {
  interface Window {
    technicalAuditOpenedUrls: string[];
  }
}

async function checkOrderMessage(page: Page, expectedCount: number) {
  const drawer = page.locator('div.max-w-md').filter({ has: page.getByRole('heading', { name: 'Sepetim (1)', exact: true }) });
  const name = (await drawer.locator('h4').textContent())?.trim() || '';
  const code = (await drawer.locator('h4 + p').textContent())?.trim() || '';
  const description = (await drawer.locator('p.line-clamp-1').textContent())?.trim() || '';
  const quantity = (await drawer.locator('span.w-20').textContent())?.trim() || '';
  const total = (await drawer.getByText('Toplam Tutar', { exact: true }).locator('..').locator('span').last().innerText()).trim();
  assert.ok(name && code && description && quantity && total, 'Cart must show complete order details');
  await drawer.getByRole('button', { name: 'Siparişi Gönder', exact: true }).click();
  const captured = await page.evaluate(() => window.technicalAuditOpenedUrls);
  assert.equal(captured.length, expectedCount);
  const orderURL = new URL(captured.at(-1)!);
  assert.equal(orderURL.hostname, 'wa.me');
  const message = orderURL.searchParams.get('text') || '';
  for (const detail of [`${name} (${code})`, `Adet: ${quantity}`, `Özellikler: ${description}`, `Fiyat: ${total}`, `Toplam Tutar: ${total}`]) {
    assert.ok(message.includes(detail), `Order message must match the visible cart: ${detail}`);
  }
  return { drawer, total };
}

async function validateTechnicalBrowser() {
  const baseURL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
    || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : undefined);
  const browser = await chromium.launch({ headless: true, executablePath });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(30000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => {
      // Capture order URLs locally. Never send an order or open WhatsApp during tests.
      window.technicalAuditOpenedUrls = [];
      window.open = (url) => {
        window.technicalAuditOpenedUrls.push(String(url));
        return null;
      };
    });

    await page.goto(new URL('/', baseURL).href);
    await page.getByRole('textbox', { name: 'Ürün ara' }).fill('kartvizit');
    await page.getByRole('button', { name: 'Kartvizit Ürün', exact: true }).click();
    await page.waitForURL('**/kartvizit');
    await page.getByRole('button', { name: 'Hemen Sipariş Ver', exact: true }).first().click();
    await page.getByRole('button', { name: 'SEPETE EKLE', exact: true }).click();
    await page.getByRole('button', { name: 'SİPARİŞ VER', exact: true }).click();
    await page.getByRole('heading', { name: 'Sepetim (1)', exact: true }).waitFor();
    const firstOrder = await checkOrderMessage(page, 1);
    await firstOrder.drawer.locator('button').filter({ has: page.locator('svg.lucide-plus') }).click();
    const updatedOrder = await checkOrderMessage(page, 2);
    assert.notEqual(updatedOrder.total, firstOrder.total, 'Changing quantity must update the cart and order total');
    await page.getByRole('button', { name: 'Sepeti Temizle', exact: true }).click();
    await page.getByText('Sepetiniz boş.', { exact: true }).waitFor();
    console.log('PASS desktop search, product selection, quantity update, matching cart/order details and cart clear');

    // Navigating closes the cart without depending on an unlabeled close icon.
    await page.goto(new URL('/', baseURL).href);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Menüyü Aç', exact: true }).click();
    await page.getByRole('link', { name: /Broşür Baskı/ }).filter({ visible: true }).first().click();
    await page.waitForURL('**/brosur');
    await page.getByRole('button', { name: 'Menüyü Aç', exact: true }).waitFor();
    console.log('PASS mobile menu navigation and menu closure');

    await page.goto(new URL('/kartvizit', baseURL).href);
    await page.getByRole('button', { name: 'Hemen Sipariş Ver', exact: true }).first().click();
    await page.getByRole('button', { name: 'SEPETE EKLE', exact: true }).click();
    await page.getByRole('button', { name: 'SİPARİŞ VER', exact: true }).click();
    await page.getByRole('heading', { name: 'Sepetim (1)', exact: true }).waitFor();
    await checkOrderMessage(page, 1);
    await page.getByRole('button', { name: 'Sepeti Temizle', exact: true }).click();
    await page.getByText('Sepetiniz boş.', { exact: true }).waitFor();
    console.log('PASS mobile product selection, cart, matching order details and cart clear');

    await page.goto(new URL('/', baseURL).href);
    await page.locator('#root main h1').first().waitFor();
    // Different system fonts exposed the 372px overflow in the Ubuntu runner.
    // Check the visible layout with both the default font and that fallback.
    for (const font of [null, 'DejaVu Sans']) {
      const style = font ? await page.addStyleTag({ content: `#root, #root * { font-family: "${font}" !important; }` }) : null;
      try {
        for (const width of [360, 390, 768, 1440]) {
          await page.setViewportSize({ width, height: 900 });
          await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
          const scrollWidth = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
          assert.ok(scrollWidth <= width + 2, `Homepage overflow at ${width}px with ${font || 'default'} font: ${scrollWidth}px`);
          await page.getByRole('heading', { name: /^Matbaa Hizmetlerimiz\s*&\s*Matbaa Ürünleri$/ }).waitFor();
        }
      } finally { await style?.evaluate(node => node.parentNode?.removeChild(node)); }
    }
    console.log('PASS homepage without overflow at four viewport widths and two font settings');

    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(new URL('/matbaa', baseURL).href);
      await page.locator('#root main h1').first().waitFor();
      const directory = page.getByRole('navigation', { name: 'Ürün ve bölge sayfaları', exact: true });
      await directory.locator('summary').click();
      assert.ok(await directory.locator('a[href="/cilt-isleri"]').isVisible());
      assert.ok(await directory.locator('a[href="/sektor/donerci-magnet-baski"]').isVisible());
      const widthAfterOpen = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth));
      assert.ok(widthAfterOpen <= width + 2, `Matbaa overflow with open directory at ${width}px: ${widthAfterOpen}px`);
      await directory.getByRole('link', { name: 'Cilt İşleri', exact: true }).click();
      await page.waitForURL('**/cilt-isleri');
      await page.locator('#root main h1').first().waitFor();
    }
    console.log('PASS open Matbaa directory and real product navigation without overflow at four widths');

    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(new URL('/kataloglar', baseURL).href);
      await page.locator('#root h1').first().waitFor();
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      assert.ok(scrollWidth <= width + 2, `Catalog overflow at ${width}px: ${scrollWidth}px`);
    }
    console.log('PASS catalog without page overflow at four viewport widths');

    await page.goto(new URL('/sektor/e-ticaret-perakende-baski', baseURL).href);
    const images = page.locator('#root img[src^="/images/sektor/e-ticaret-perakende/"]');
    await images.first().waitFor();
    assert.equal(await images.count(), 6);
    const loaded = await images.evaluateAll(async elements => {
      const images = elements as HTMLImageElement[];
      await Promise.all(images.map(image => {
        image.loading = 'eager';
        return image.decode();
      }));
      return images.every(image => image.naturalWidth > 0);
    });
    assert.ok(loaded, 'All six e-commerce images must decode successfully');
    assert.deepEqual(errors, [], 'No uncaught application errors');
    console.log('PASS all six e-commerce images and no uncaught application errors');

    const dottedBlog = await page.goto(new URL('/blog/antetli-kagit-baskisinda-80gr-1.hamur', baseURL).href);
    assert.equal(dottedBlog?.status(), 200, 'A dot in a valid blog slug must not cause a 404');
    await page.locator('#root h1').first().waitFor();
    console.log('PASS valid blog route containing a dot');

    await page.goto(new URL('/blog/baskili-urunlerle-pazarlama-markanizi-buyuten-matbaa-urunleri', baseURL).href);
    const menuParagraph = page.locator('#root main p').filter({ hasText: 'Gıda sektöründeki işletmeler için masada hijyen sağlayan' });
    assert.ok((await menuParagraph.textContent())?.includes('Menü Baskıları'), 'The menu wording must remain visible');
    assert.equal(await menuParagraph.getByRole('link', { name: 'Menü Baskıları', exact: true }).count(), 0);
    assert.equal(await page.locator('a[href="/menu-baski"]').count(), 0);
    assert.equal(await menuParagraph.getByRole('link', { name: 'Amerikan Servis', exact: true }).getAttribute('href'), '/amerikan-servis');
    console.log('PASS menu wording preserved without a menu link; existing American service link preserved');
    const folderParagraph = page.locator('#root main p').filter({ hasText: 'Ürün gamınızı detaylı sergilemek' });
    const folderLink = folderParagraph.getByRole('link', { name: 'Cepli Dosya', exact: true });
    assert.equal(await folderLink.getAttribute('href'), '/dosyalar');
    assert.equal(await page.locator('#root main h3').filter({ hasText: 'Katalog ve Cepli Dosya ile Kurumsal Tanıtım' }).innerText(), 'Katalog ve Cepli Dosya ile Kurumsal Tanıtım');
    await folderLink.click();
    await page.waitForURL('**/dosyalar');
    await page.locator('#root main h1').first().waitFor();
    console.log('PASS blog heading/paragraph separation and actual product link navigation');

    const removedFiles = [
      '/Mavi-Basim-Fiyat-Listesi.pdf',
      '/downloads/portfoy-gosterim-takip-cetveli.xlsx',
      '/downloads/yer-gosterme-belgesi-bos-sablon.docx',
      '/downloads/yer-gosterme-belgesi-bos-sablon.pdf',
    ];
    for (const width of [360, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const routePath of ['/bloknotlar', '/blog/emlak-yer-gosterme-belgesi-nedir']) {
        const response = await page.goto(new URL(routePath, baseURL).href);
        assert.equal(response?.status(), 200);
        const html = await response!.text();
        await page.locator('#root h1').first().waitFor();
        for (const target of removedFiles) {
          assert.ok(!html.includes(target), `Removed file must not remain in initial HTML: ${routePath} ${target}`);
          assert.equal(await page.locator(`a[href="${target}"]`).count(), 0, `Removed file must not remain linked after rendering: ${target}`);
        }
        assert.equal(await page.getByRole('link', { name: 'FİYAT LİSTESİNİ İNDİR (PDF)', exact: true }).count(), 0);
        if (routePath.startsWith('/blog/')) {
          assert.equal(await page.locator('img[src=":::"]').count(), 0);
          for (const file of ['yer-gosterme-belgesi-otokopili', 'yer-gosterme-belgesi-numaratorlu-ornek', 'yer-gosterme-belgesi-doldurulmus-ornek', 'yer-gosterme-belgesi-bos-sablon', 'otokopili-sozlesme-basimi', 'sozlesme-taslagi-baski']) {
            const image = page.locator(`img[src="/images/sozlesme/${file}.webp"]`).first();
            await image.evaluate(async node => { const img = node as HTMLImageElement; img.loading = 'eager'; await img.decode(); });
          }
          for (const title of ['Yer Gösterme Belgesi Şablonu (PDF)', 'Yer Gösterme Belgesi Şablonu (Word)', 'Portföy Gösterim Çizelgesi (Excel)']) {
            await page.getByRole('heading', { name: title, exact: true }).waitFor();
          }
          for (const name of ['Hemen İndir (PDF)', 'Düzenle & İndir (Word)', 'Excel İndir (Excel)']) {
            assert.equal(await page.getByRole('link', { name, exact: true }).count(), 0);
          }
        }
      }
    }
    console.log('PASS removed missing-file links/buttons in initial HTML and rendered desktop/mobile pages; document descriptions preserved');

    await page.goto(new URL('/tahsilat-makbuzu', baseURL).href);
    await page.locator('#root h1').first().waitFor();
    assert.equal(await page.locator('a[href^="/makbuz/"]').count(), 0);
    for (const slug of ['gider-makbuzu', 'tediye-makbuzu', 'para-makbuzu', 'adisyon', 'siparis-fisi']) {
      assert.equal(await page.locator(`a[href="/makbuz/${slug}"]`).count(), 0);
      assert.ok(await page.locator(`a[href="/${slug}"]`).count() > 0);
      assert.equal((await page.request.get(new URL(`/${slug}`, baseURL).href)).status(), 200);
    }
    await page.goto(new URL('/karton-canta', baseURL).href);
    await page.locator('#root h1').first().waitFor();
    assert.equal(await page.locator('a[href="/antetli-kagit"]').count(), 0);
    assert.ok(await page.locator('a[href="/antetli"]').count() > 0);
    assert.equal((await page.request.get(new URL('/antetli', baseURL).href)).status(), 200);
    assert.deepEqual(errors, [], 'No uncaught application errors after navigation');
    console.log('PASS receipt and letterhead links resolve to existing pages');
  } finally {
    await browser.close();
  }
}

validateTechnicalBrowser().catch((error: unknown) => {
  console.error('TECHNICAL BROWSER VALIDATION FAILED (requires a running application).', error);
  process.exitCode = 1;
});
