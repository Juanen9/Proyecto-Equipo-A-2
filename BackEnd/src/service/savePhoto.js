const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const uuid = require("uuid");

// Almacena las fotos en las carpetas \\

const savePhoto = async (dataPhoto, dir) => {
  const img = sharp(dataPhoto.data);

  const photNameUnique = `${uuid.v4()}_${dataPhoto.name}`;

  const parentDir = path.resolve(__dirname, '../../..');
  
  await img.toFile(
    path.join(parentDir, process.env.UPLOADS_DIRECTORY + dir, photNameUnique)
  );

  return photNameUnique;
};

module.exports = savePhoto;
