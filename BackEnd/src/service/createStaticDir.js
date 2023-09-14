const fs = require("fs/promises");
const path = require("path");

// Crea los directorios de las fotos \\
const createStaticDir = async (staticDir) => {
  const dirsToCreate = ["avatarUser", "exercisePhoto"];

  for (const dirName of dirsToCreate) {
    const dirPath = path.join(staticDir, dirName);

    try {
      await fs.access(dirPath);
    } catch (error) {
      await fs.mkdir(dirPath, { recursive: true });
    }
  }
};

module.exports = createStaticDir;