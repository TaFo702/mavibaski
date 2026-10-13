import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

export function prerenderHome() {
  const HomeRouter = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>
  );
  return renderToString(<App Router={HomeRouter} />);
}
