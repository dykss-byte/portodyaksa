const sharp = require('sharp');
const path = require('path');

const CHARACTERS = [
  { name: 'woody', cx: 84.5, cy: 71.5, r: 50.5, clearBlue: true },
  { name: 'buzz', cx: 208.5, cy: 71.5, r: 52 },
  { name: 'jessie', cx: 327.5, cy: 71.5, r: 52 },
  { name: 'hamm', cx: 452, cy: 72.5, r: 52 },
  { name: 'rex', cx: 581, cy: 72, r: 52 },
  { name: 'slinky', cx: 697, cy: 72, r: 52 },
  { name: 'bullseye', cx: 821, cy: 72.5, r: 52 },
  { name: 'mr_potato', cx: 948, cy: 72, r: 52 },
  { name: 'mrs_potato', cx: 84.5, cy: 221, r: 52 },
  { name: 'aliens', cx: 208.5, cy: 224, r: 52 },
  { name: 'bo_peep', cx: 329, cy: 221, r: 52 },
  { name: 'forky', cx: 453, cy: 221, r: 52 },
  { name: 'ducky_bunny', cx: 581, cy: 221.5, r: 52 },
  { name: 'giggle', cx: 698, cy: 221.5, r: 52 },
  { name: 'duke_caboom', cx: 820, cy: 223, r: 52 },
  { name: 'buttercup', cx: 948, cy: 221.5, r: 52 }
];

async function generatePerfectAvatars() {
  const outSize = 160;

  for (const c of CHARACTERS) {
    const cropSize = Math.round(c.r * 2);
    const left = Math.round(c.cx - c.r);
    const top = Math.round(c.cy - c.r);

    let imgBuffer = await sharp('public/toystory_characters.png')
      .extract({ left, top, width: cropSize, height: cropSize })
      .resize(outSize, outSize, { fit: 'fill' })
      .raw()
      .toBuffer({ resolveWithObject: true });

    let { data, info } = imgBuffer;

    if (c.clearBlue) {
      // Clear any remaining blue ring pixels
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i+1], b = data[i+2];
        if (b > 130 && b > r * 1.3 && b > g * 1.1) {
          // near edge
          const pixelIdx = i / 4;
          const x = pixelIdx % outSize;
          const y = Math.floor(pixelIdx / outSize);
          const dx = x - outSize / 2;
          const dy = y - outSize / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > outSize * 0.38) {
            data[i] = 255;
            data[i+1] = 255;
            data[i+2] = 255;
            data[i+3] = 0;
          }
        }
      }
    }

    const maskSvg = Buffer.from(`
      <svg width="${outSize}" height="${outSize}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${outSize/2}" cy="${outSize/2}" r="${outSize/2 - 1}" fill="#fff" />
      </svg>
    `);

    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
      .composite([{ input: maskSvg, blend: 'dest-in' }])
      .png()
      .toFile(`public/characters/${c.name}.png`);

    console.log(`Saved public/characters/${c.name}.png`);
  }
}

generatePerfectAvatars().catch(console.error);
