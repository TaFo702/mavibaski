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
    (container.dataset.prerendered === 'antetli' && path === '/antetli')) {
  hydrateRoot(container, application);
} else {
  createRoot(container).render(application);
}
