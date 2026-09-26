import * as fs from 'fs';

const code = fs.readFileSync('./src/components/Makbuz.tsx', 'utf8');
const lines = code.split('\n');

let braceDepth = 0;
let parenDepth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.trim().startsWith('//') || line.trim().startsWith('{/*')) continue;
  
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '{') braceDepth++;
    else if (char === '}') braceDepth--;
    else if (char === '(') parenDepth++;
    else if (char === ')') parenDepth--;
  }
}

console.log('Overall Brace depth (should be 0):', braceDepth);
console.log('Overall Parentheses depth (should be 0):', parenDepth);

let bDepth = 0;
let pDepth = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.trim().startsWith('//') || line.trim().startsWith('{/*')) continue;
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '{') bDepth++;
    else if (char === '}') bDepth--;
    else if (char === '(') pDepth++;
    else if (char === ')') pDepth--;
  }
  if (bDepth < 0 || pDepth < 0) {
    console.log(`Out of sync at line ${i + 1}: braceDepth=${bDepth} parenDepth=${pDepth}`);
    break;
  }
}
