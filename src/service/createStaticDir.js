const fs = require("fs/promises");

// Crea los directorios de las fotos \\

const createStaticDir = async (staticDir) => {
  try {
    await fs.access(staticDir);
  } catch (error) {
    await fs.mkdir(staticDir);
    await fs.mkdir(`${staticDir}/avatarUser`);
    await fs.mkdir(`${staticDir}/exercisePhoto`);
  }
};

module.exports = createStaticDir;
