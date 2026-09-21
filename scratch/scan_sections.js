const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('gridTemplateColumns') || l.includes('grid-cols') || l.includes('display: "grid"')) {
    console.log(`${i + 1}: ${l.trim()}`);
  }
});
