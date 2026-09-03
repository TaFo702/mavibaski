import * as fs from 'fs';

const code = fs.readFileSync('./src/components/Makbuz.tsx', 'utf8');
const lines = code.split('\n');

const tagRegex = /<\/?[a-zA-Z0-9\._\-]+(?:\s+[a-zA-Z0-9\._\-]+(?:=(?:\"[^\"]*\"|'[^']*'|{[^}]*}))?)*\s*\/?>/g;
const stack = [];

console.log('Scanning JSX tags for mismatched tags...');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trim = line.trim();
  
  // Skip comments
  if (trim.startsWith('//') || trim.startsWith('{/*')) continue;
  
  let match;
  while ((match = tagRegex.exec(line)) !== null) {
    const fullTag = match[0];
    
    // Check if self-closing
    if (fullTag.endsWith('/>')) {
      continue;
    }
    
    // Extract tag name
    let tagName = fullTag.replace(/[<>\/]/g, '').trim().split(/\s+/)[0];
    
    if (fullTag.startsWith('</')) {
      // Closing tag
      if (stack.length === 0) {
        console.log(`Error: Extra closing tag </${tagName}> on line ${i + 1}`);
      } else {
        const top = stack.pop();
        if (top.name !== tagName) {
          console.log(`Error: Tag mismatch on line ${i + 1}. Expected </${top.name}> (opened on line ${top.line}), but found ${fullTag}`);
          // Put it back or adjust to keep scanning
          stack.push(top);
        }
      }
    } else {
      // Opening tag
      stack.push({ name: tagName, line: i + 1 });
    }
  }
}

if (stack.length > 0) {
  console.log('Unclosed tags remaining in stack:');
  stack.forEach(t => console.log(` - <${t.name}> opened on line ${t.line}`));
} else {
  console.log('All JSX tags are perfectly balanced!');
}
