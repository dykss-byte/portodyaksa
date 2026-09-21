const sharp = require('sharp');

async function findExactCircles() {
  const { data, info } = await sharp('public/toystory_characters.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  function getPixel(x, y) {
    if (x < 0 || x >= info.width || y < 0 || y >= info.height) return [255, 255, 255, 255];
    const idx = (y * info.width + x) * 4;
    return [data[idx], data[idx+1], data[idx+2], data[idx+3]];
  }

  function isBgWhite(x, y) {
    const [r, g, b] = getPixel(x, y);
    // Background is white/near white (r,g,b > 248)
    return r >= 246 && g >= 246 && b >= 246;
  }

  // List of characters with rough centers
  const targets = [
    { name: 'woody', x: 84, y: 80 },
    { name: 'buzz', x: 206, y: 80 },
    { name: 'jessie', x: 328, y: 80 },
    { name: 'hamm', x: 450, y: 80 },
    { name: 'rex', x: 572, y: 80 },
    { name: 'slinky', x: 694, y: 80 },
    { name: 'bullseye', x: 816, y: 80 },
    { name: 'mr_potato', x: 938, y: 80 },
    { name: 'mrs_potato', x: 84, y: 230 },
    { name: 'aliens', x: 206, y: 230 },
    { name: 'bo_peep', x: 328, y: 230 },
    { name: 'forky', x: 450, y: 230 },
    { name: 'ducky_bunny', x: 572, y: 230 },
    { name: 'giggle', x: 694, y: 230 },
    { name: 'duke_caboom', x: 816, y: 230 },
    { name: 'buttercup', x: 938, y: 230 },
    { name: 'trixie', x: 407, y: 377 },
    { name: 'pricklepants', x: 512, y: 377 },
    { name: 'dolly', x: 622, y: 377 }
  ];

  const results = [];

  for (const t of targets) {
    // Cast rays in 36 directions (every 10 degrees) from (t.x, t.y) to find where pixel transitions to bg
    const points = [];
    for (let deg = 0; deg < 360; deg += 10) {
      const rad = (deg * Math.PI) / 180;
      let found = null;
      for (let dist = 40; dist < 75; dist++) {
        const x = Math.round(t.x + Math.cos(rad) * dist);
        const y = Math.round(t.y + Math.sin(rad) * dist);
        if (isBgWhite(x, y)) {
          // Check if previous 2 were not white and next 2 are white
          found = { x, y, dist };
          break;
        }
      }
      if (found && found.dist > 45 && found.dist < 65) {
        points.push(found);
      }
    }

    // Average center
    const avgDist = points.reduce((acc, p) => acc + p.dist, 0) / points.length;
    // Calculate min/max X and Y among boundary points
    const minX = Math.min(...points.map(p => p.x));
    const maxX = Math.max(...points.map(p => p.x));
    const minY = Math.min(...points.map(p => p.y));
    const maxY = Math.max(...points.map(p => p.y));
    const exactCx = (minX + maxX) / 2;
    const exactCy = (minY + maxY) / 2;
    const exactRadius = (maxX - minX + maxY - minY) / 4;

    results.push({
      name: t.name,
      cx: Math.round(exactCx * 10) / 10,
      cy: Math.round(exactCy * 10) / 10,
      r: Math.round(exactRadius * 10) / 10,
      pts: points.length
    });
  }

  console.log(JSON.stringify(results, null, 2));
}

findExactCircles().catch(console.error);
