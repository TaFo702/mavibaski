import * as fs from 'fs';

const code = fs.readFileSync('./src/components/Makbuz.tsx', 'utf8');
const lines = code.split('\n');

let bDepth = 0;
let pDepth = 0;

console.log('Line# | bDepth | pDepth | Line Content');
console.log('-------------------------------------');

for (let i = 1224; i < 1365; i++) {
  const line = lines[i];
  if (!line) continue;
  
  const trim = line.trim();
  if (trim.startsWith('//') || trim.startsWith('{/*')) {
    console.log(`${i + 1} | ${bDepth} | ${pDepth} | [Comment] ${trim}`);
    continue;
  }

  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '{') bDepth++;
    else if (char === '}') bDepth--;
    else if (char === '(') pDepth++;
    else if (char === ')') pDepth--;
  }

  console.log(`${i + 1} | ${bDepth} | ${pDepth} | ${line}`);
}
