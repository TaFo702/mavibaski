const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/blogData.ts');
const content = fs.readFileSync(filePath, 'utf8');

const lines = content.split('\n');
for (let i = 1320; i < 1560; i++) {
  if (lines[i].includes('`')) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
}
