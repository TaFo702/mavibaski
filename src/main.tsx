import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const application = (
  <StrictMode>
    <App />
  </StrictMode>
);

const path = window.location.pathname.replace(/\/$/, '') || '/';
if ((container.dataset.prerendered === 'home' && path === '/') ||
    (container.dataset.prerendered === 'amerikan-servis' && path === '/amerikan-servis') ||
    (container.dataset.prerendered === 'oto-paspas' && path === '/oto-paspas') ||
    (container.dataset.prerendered === 'afis' && path === '/afis') ||
    (container.dataset.prerendered === 'el-ilani' && path === '/el-ilani') ||
    (container.dataset.prerendered === 'brosur' && path === '/brosur') ||
    (container.dataset.prerendered === 'zarf' && path === '/zarf') ||
    (container.dataset.prerendered === 'antetli' && path === '/antetli') ||
    (container.dataset.prerendered === 'dosyalar' && path === '/dosyalar') ||
    (container.dataset.prerendered === 'bloknotlar' && path === '/bloknotlar') ||
    (container.dataset.prerendered === 'kataloglar' && path === '/kataloglar') ||
    (container.dataset.prerendered === 'gider-makbuzu' && path === '/gider-makbuzu') ||
    (container.dataset.prerendered === 'tahsilat-makbuzu' && path === '/tahsilat-makbuzu') ||
    (container.dataset.prerendered === 'recete' && path === '/recete') ||
    (container.dataset.prerendered === 'para-makbuzu' && path === '/para-makbuzu') ||
    (container.dataset.prerendered === 'perakende-satis-fisi' && path === '/perakende-satis-fisi') ||
    (container.dataset.prerendered === 'siparis-fisi' && path === '/siparis-fisi') ||
    (container.dataset.prerendered === 'adisyon' && path === '/adisyon') ||
    (container.dataset.prerendered === 'otokopili-kagit-blog' && path === '/blog/adisyon-ve-makbuzlarda-otokopili-kagit') ||
    (container.dataset.prerendered === 'sozlesme-baski' && path === '/sozlesme-baski') ||
    (container.dataset.prerendered === 'arac-kiralama' && path === '/arac-kiralama') ||
    (path.endsWith('-matbaa') && container.dataset.prerendered === path.slice(1))) {
  hydrateRoot(container, application);
} else {
  createRoot(container).render(application);
}
