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

if (container.dataset.prerendered === 'home' && window.location.pathname === '/') {
  hydrateRoot(container, application);
} else {
  createRoot(container).render(application);
}
