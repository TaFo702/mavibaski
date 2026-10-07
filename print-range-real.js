import * as fs from 'fs';

const code = fs.readFileSync('./src/components/Makbuz.tsx', 'utf8');
const lines = code.split('\n');

let bDepth = 0;
let pDepth = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const oldB = bDepth;
  const oldP = pDepth;

  if (line.trim().startsWith('//') || line.trim().startsWith('{/*')) {
    continue;
  }

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '{') bDepth++;
    else if (char === '}') bDepth--;
    else if (char === '(') pDepth++;
    else if (char === ')') pDepth--;
  }

  if (i >= 1345 && i <= 1365) {
    console.log(`${i + 1} | b: ${oldB}->${bDepth} | p: ${oldP}->${pDepth} | ${line}`);
  }
}
