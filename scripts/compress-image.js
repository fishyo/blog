const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/island/island1.png');
const outputPath = path.join(__dirname, '../public/images/island/island1_compressed.png');

sharp(inputPath)
  .resize(2000, 2000, {
    fit: 'inside',
    withoutEnlargement: true
  })
  .png({ quality: 85, compressionLevel: 9 })
  .toFile(outputPath)
  .then(info => {
    console.log('Compression complete:', info);
  })
  .catch(err => {
    console.error('Error during compression:', err);
  });
