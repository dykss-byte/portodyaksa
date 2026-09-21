const sharp = require('sharp');
const fs = require('fs');

async function testExtraction() {
  const characters = [
    { name: 'woody', cx: 84, cy: 80, r: 56, removeBlueRing: true },
    { name: 'buzz', cx: 206, cy: 80, r: 56 },
    { name: 'jessie', cx: 328, cy: 80, r: 56 },
    { name: 'hamm', cx: 450, cy: 80, r: 56 },
    { name: 'rex', cx: 572, cy: 80, r: 56 },
    { name: 'slinky', cx: 694, cy: 80, r: 56 },
    { name: 'bullseye', cx: 816, cy: 80, r: 56 },
    { name: 'mr_potato', cx: 938, cy: 80, r: 56 },
    { name: 'mrs_potato', cx: 84, cy: 230, r: 56 },
    { name: 'aliens', cx: 206, cy: 230, r: 56 },
    { name: 'bo_peep', cx: 328, cy: 230, r: 56 },
    { name: 'forky', cx: 450, cy: 230, r: 56 },
    { name: 'ducky_bunny', cx: 572, cy: 230, r: 56 },
    { name: 'giggle', cx: 694, cy: 230, r: 56 },
    { name: 'duke_caboom', cx: 816, cy: 230, r: 56 },
    { name: 'buttercup', cx: 938, cy: 230, r: 56 },
    { name: 'trixie', cx: 407, cy: 377, r: 56 },
    { name: 'pricklepants', cx: 512, cy: 377, r: 56 },
    { name: 'dolly', cx: 622, cy: 377, r: 56 }
  ];

  const size = 120; // 120x120 output
  const radius = 56;

  // Create an antialiased circular mask SVG
  const circleMask = Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <circle cx="${size/2}" cy="${size/2}" r="${radius}" fill="#fff" />
    </svg>
  `);

  for (const c of characters) {
    const left = Math.round(c.cx - size/2);
    const top = Math.round(c.cy - size/2);

    // Extract slightly larger square
    let img = sharp('public/toystory_characters.png').extract({
      left,
      top,
      width: size,
      height: size
    });

    if (c.removeBlueRing) {
      // If woody, mask out the blue ring: the blue ring is around radius 53 to 57
      // We can use radius 53 for Woody or replace blue pixels near the edge
      const woodyMask = Buffer.from(`
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <circle cx="${size/2}" cy="${size/2}" r="53" fill="#fff" />
        </svg>
      `);
      await img
        .composite([{ input: woodyMask, blend: 'dest-in' }])
        .resize(128, 128)
        .toFile(`scratch/extracted/${c.name}_clean.png`);
    } else {
      await img
        .composite([{ input: circleMask, blend: 'dest-in' }])
        .resize(128, 128)
        .toFile(`scratch/extracted/${c.name}_clean.png`);
    }
  }
  console.log('Finished testing extraction!');
}

testExtraction().catch(console.error);
