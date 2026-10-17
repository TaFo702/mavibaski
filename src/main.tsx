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
    (container.dataset.prerendered === 'zarf' && path === '/zarf') ||
    (container.dataset.prerendered === 'antetli' && path === '/antetli') ||
    (container.dataset.prerendered === 'dosyalar' && path === '/dosyalar') ||
    (container.dataset.prerendered === 'bloknotlar' && path === '/bloknotlar') ||
    (container.dataset.prerendered === 'kataloglar' && path === '/kataloglar') ||
    (container.dataset.prerendered === 'gider-makbuzu' && path === '/gider-makbuzu') ||
    (container.dataset.prerendered === 'tahsilat-makbuzu' && path === '/tahsilat-makbuzu') ||
    (container.dataset.prerendered === 'recete' && path === '/recete') ||
    (container.dataset.prerendered === 'arac-kiralama' && path === '/arac-kiralama')) {
  hydrateRoot(container, application);
} else {
  createRoot(container).render(application);
}
