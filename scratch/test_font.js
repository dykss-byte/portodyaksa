const sharp = require('sharp');
const fs = require('fs');

const fontB64 = fs.readFileSync('public/fonts/AgentOrange.ttf').toString('base64');
const gillB64 = fs.readFileSync('public/fonts/GillSansUltraBold.ttf').toString('base64');

const svg = `
<svg width="800" height="300" xmlns="http://www.w3.org/2000/svg">
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
  <rect width="100%" height="100%" fill="#55acee" />
  <text x="400" y="130" font-family="AgentOrange" font-size="95" fill="#FFE800" stroke="#1145b5" stroke-width="6" text-anchor="middle">DYAKSA</text>
  <text x="400" y="230" font-family="GillSansUltra" font-size="65" fill="#FFE800" stroke="#b31317" stroke-width="6" text-anchor="middle">WIRATARA</text>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile('scratch/test_font.png')
  .then(() => console.log('Successfully generated scratch/test_font.png'))
  .catch((err) => console.error(err));
