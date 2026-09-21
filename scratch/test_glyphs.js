const sharp = require('sharp');
const fs = require('fs');

const fontB64 = fs.readFileSync('public/fonts/AgentOrange.ttf').toString('base64');
const gillB64 = fs.readFileSync('public/fonts/GillSansUltraBold.ttf').toString('base64');

const svg = `
<svg width="900" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: 'AgentOrange';
        src: url('data:font/truetype;charset=utf-8;base64,${fontB64}') format('truetype');
      }
      @font-face {
        font-family: 'GillSansUltra';
        src: url('data:font/truetype;charset=utf-8;base64,${gillB64}') format('truetype');
      }
    </style>
  </defs>
  <rect width="100%" height="100%" fill="#4a90e2" />
  <text x="450" y="100" font-family="AgentOrange" font-size="70" fill="#FFE800" text-anchor="middle">DYAKSA (AgentOrange Plain)</text>
  <text x="450" y="200" font-family="GillSansUltra" font-size="70" fill="#FFE800" text-anchor="middle">DYAKSA (GillSans Plain)</text>
  <text x="450" y="300" font-family="GillSansUltra" font-size="70" fill="#FFE800" stroke="#003399" stroke-width="8" paint-order="stroke fill" text-anchor="middle">DYAKSA (GillSans Strok)</text>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile('scratch/test_glyphs.png')
  .then(() => console.log('Successfully generated scratch/test_glyphs.png'))
  .catch((err) => console.error(err));
