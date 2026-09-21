const sharp = require('sharp');

sharp('public/toystory_characters.png')
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    function getPix(x, y) {
      if (x < 0 || x >= info.width || y < 0 || y >= info.height) return [255,255,255,255];
      const idx = (y * info.width + x) * 4;
      return [data[idx], data[idx+1], data[idx+2], data[idx+3]];
    }
    function isWhite(x, y) {
      const [r, g, b] = getPix(x, y);
      return r > 248 && g > 248 && b > 248;
    }

    console.log('--- Row 1 ---');
    for (let c = 0; c < 8; c++) {
      const approxX = Math.round(c * (1024 / 8) + 64);
      let topY = 0, botY = 160;
      while (topY < 160 && isWhite(approxX, topY)) topY++;
      while (botY > topY && isWhite(approxX, botY)) botY--;
      const midY = Math.round((topY + botY) / 2);
      let leftX = approxX - 80, rightX = approxX + 80;
      while (leftX < approxX && isWhite(leftX, midY)) leftX++;
      while (rightX > approxX && isWhite(rightX, midY)) rightX--;
      console.log(`Col ${c}: x=[${leftX}, ${rightX}] (w=${rightX-leftX+1}), y=[${topY}, ${botY}] (h=${botY-topY+1}), center=(${(leftX+rightX)/2}, ${(topY+botY)/2})`);
    }

    console.log('--- Row 2 ---');
    for (let c = 0; c < 8; c++) {
      const approxX = Math.round(c * (1024 / 8) + 64);
      let topY = 160, botY = 320;
      while (topY < 320 && isWhite(approxX, topY)) topY++;
      while (botY > topY && isWhite(approxX, botY)) botY--;
      const midY = Math.round((topY + botY) / 2);
      let leftX = approxX - 80, rightX = approxX + 80;
      while (leftX < approxX && isWhite(leftX, midY)) leftX++;
      while (rightX > approxX && isWhite(rightX, midY)) rightX--;
      console.log(`Col ${c}: x=[${leftX}, ${rightX}] (w=${rightX-leftX+1}), y=[${topY}, ${botY}] (h=${botY-topY+1}), center=(${(leftX+rightX)/2}, ${(topY+botY)/2})`);
    }

    console.log('--- Row 3 ---');
    // Row 3 has 3 characters centered: Trixie, Mr. Pricklepants, Dolly
    // They are centered around cols ~ 2.5, 3.5, 4.5
    const row3Centers = [390, 512, 630];
    for (let i = 0; i < row3Centers.length; i++) {
      const approxX = row3Centers[i];
      let topY = 300, botY = 440;
      while (topY < 440 && isWhite(approxX, topY)) topY++;
      while (botY > topY && isWhite(approxX, botY)) botY--;
      const midY = Math.round((topY + botY) / 2);
      let leftX = approxX - 80, rightX = approxX + 80;
      while (leftX < approxX && isWhite(leftX, midY)) leftX++;
      while (rightX > approxX && isWhite(rightX, midY)) rightX--;
      console.log(`Row 3 [${i}]: x=[${leftX}, ${rightX}] (w=${rightX-leftX+1}), y=[${topY}, ${botY}] (h=${botY-topY+1}), center=(${(leftX+rightX)/2}, ${(topY+botY)/2})`);
    }
  });
