const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, 'dist', 'assets', 'index-dwwwNeyG.js');
if (!fs.existsSync(jsPath)) {
  console.log("No compiled JS found at:", jsPath);
  process.exit(1);
}

const content = fs.readFileSync(jsPath, 'utf8');

// Find el-ilani-dagitimi-ise-yariyor-mu
const elIlaniIdx = content.indexOf('el-ilani-dagitimi-ise-yariyor-mu');
if (elIlaniIdx !== -1) {
  console.log("Found el-ilani-dagitimi-ise-yariyor-mu at index:", elIlaniIdx);
  // Extract around 20000 characters
  const start = Math.max(0, elIlaniIdx - 1000);
  const end = Math.min(content.length, elIlaniIdx + 40000);
  fs.writeFileSync('el-ilani-extracted.txt', content.substring(start, end));
  console.log("Wrote el-ilani-extracted.txt");
} else {
  console.log("el-ilani not found in JS");
}

// Find etiket-baskida-rulo-mu-tabaka-mi
const etiketIdx = content.indexOf('etiket-baskida-rulo-mu-tabaka-mi');
if (etiketIdx !== -1) {
  console.log("Found etiket-baskida-rulo-mu-tabaka-mi at index:", etiketIdx);
  const start = Math.max(0, etiketIdx - 1000);
  const end = Math.min(content.length, etiketIdx + 40000);
  fs.writeFileSync('etiket-extracted.txt', content.substring(start, end));
  console.log("Wrote etiket-extracted.txt");
} else {
  console.log("etiket not found in JS");
}
