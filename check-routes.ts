import fs from 'fs';

const appContent = fs.readFileSync('./src/App.tsx', 'utf-8');
const routeMatches = appContent.matchAll(/path="([^"]+)"/g);
const registeredPaths = new Set<string>();

for (const m of routeMatches) {
  registeredPaths.add(m[1]);
}

console.log('--- Registered Routes in App.tsx ---');
Array.from(registeredPaths).sort().forEach(p => console.log('  ', p));
