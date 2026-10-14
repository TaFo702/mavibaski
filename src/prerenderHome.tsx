import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import ZarfPage from './components/Zarf';

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
