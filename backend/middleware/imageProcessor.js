const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const filePath = req.file.path;
    const fileName = req.file.filename;
    const fileDir = path.dirname(filePath);
    const webpFileName = `${path.parse(fileName).name}.webp`;
    const webpFilePath = path.join(fileDir, webpFileName);

    // Convert to WebP with optimization
    await sharp(filePath)
      .resize(1200, 800, {
        fit: 'cover',
        position: 'center',
        withoutEnlargement: true,
      })
      .webp({ quality: 80, effort: 6 })
      .toFile(webpFilePath);

    // Remove original file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Update req.file with new path
    req.file.path = webpFilePath;
    req.file.filename = webpFileName;
    req.file.mimetype = 'image/webp';

    next();
  } catch (error) {
    console.error('Image processing error:', error);
    // If processing fails, still continue but with original file
    next();
  }
};

module.exports = processImage;