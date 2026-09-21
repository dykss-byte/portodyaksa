const sharp = require('sharp');
const fs = require('fs');

if (!fs.existsSync('scratch/extracted')) {
  fs.mkdirSync('scratch/extracted', { recursive: true });
}

// Let's inspect the exact centers for each character in toystory_characters.png
// The image has 1024 x 443
// Let's crop candidate boxes and save them to scratch/extracted to view!
const characters = [
  { name: 'woody', row: 0, col: 0 },
  { name: 'buzz', row: 0, col: 1 },
  { name: 'jessie', row: 0, col: 2 },
  { name: 'hamm', row: 0, col: 3 },
  { name: 'rex', row: 0, col: 4 },
  { name: 'slinky', row: 0, col: 5 },
  { name: 'bullseye', row: 0, col: 6 },
  { name: 'mr_potato', row: 0, col: 7 },
  { name: 'mrs_potato', row: 1, col: 0 },
  { name: 'aliens', row: 1, col: 1 },
  { name: 'bo_peep', row: 1, col: 2 },
  { name: 'forky', row: 1, col: 3 },
  { name: 'ducky_bunny', row: 1, col: 4 },
  { name: 'giggle', row: 1, col: 5 },
  { name: 'duke_caboom', row: 1, col: 6 },
  { name: 'buttercup', row: 1, col: 7 }
];

async function extract() {
  const meta = await sharp('public/toystory_characters.png').metadata();
  console.log('Image size:', meta.width, meta.height);

  // Each circle is roughly 120x120. Let's crop 128x128 for each grid cell
  for (const char of characters) {
    const left = char.col * 128;
    const top = char.row === 0 ? 10 : 158;
    await sharp('public/toystory_characters.png')
      .extract({ left, top, width: 128, height: 130 })
      .toFile(`scratch/extracted/${char.name}_raw.png`);
  }
  console.log('Extracted raw cells');
}

extract().catch(console.error);
