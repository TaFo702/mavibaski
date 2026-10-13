import fs from 'fs';

let content = fs.readFileSync('./src/data/blogData.ts', 'utf-8');

// Fix unescaped backticks within the newly added section
// Specifically `Ctrl+Shift+O`, `Type > Create Outlines`, `Ctrl+Q`
content = content.replace(/`Ctrl\+Shift\+O`/g, '\\`Ctrl+Shift+O\\`');
content = content.replace(/`Type > Create Outlines`/g, '\\`Type > Create Outlines\\`');
content = content.replace(/`Ctrl\+Q`/g, '\\`Ctrl+Q\\`');

fs.writeFileSync('./src/data/blogData.ts', content, 'utf-8');
console.log('Fixed backticks in blogData.ts');
