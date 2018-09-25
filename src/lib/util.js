import fs from "fs";
import path from "path";
import { promisify } from "util";

const BOOT_PARTITION = 1;
const readdir = promisify(fs.readdir);
const readFile = file => promisify(fs.readFile)(file, "utf8");
const stat = promisify(fs.stat);

export const getStats = file =>
  stat(file).then(stats => ({ name: file, isDir: stats.isDirectory() }));

export const getRelativePath = (dir, filepath) =>
  path.resolve("/", filepath.replace(dir, ""));

export const listPath = async (dir, limit = 30) => {
  let dirToWalk = [dir];
  let fileList = [];
  while (dirToWalk.length !== 0) {
    if (dirToWalk.length >= limit) {
      throw new Error(`exceeded directory limit: ${limit}`);
    }
    const currentDir = dirToWalk.pop();
    const fpath = await readdir(currentDir);
    const stats = await Promise.all(
      fpath.map(f => getStats(path.resolve(currentDir, f)))
    );
    const walk = stats.reduce(
      (res, fileStats) => {
        const { name, isDir } = fileStats;
        if (isDir) {
          res.dirs.push(name);
        } else {
          res.files.push(name);
        }
        return res;
      },
      { dirs: [], files: [] }
    );
    const { dirs, files } = walk;
    dirToWalk = dirToWalk.concat(dirs);
    fileList = fileList.concat(files);
  }
  return fileList;
};

export const readFilePath = dir => file =>
  readFile(file).then(content => ({
    file: getRelativePath(dir, file),
    content
  }));

export const readPath = (dir, limit = 30) =>
  listPath(dir, limit).then(files => Promise.all(files.map(readFilePath(dir))));

export const getDefs = ({ image, partition = BOOT_PARTITION, files }) => {
  const defs = files.map(({ file, content }) => {
    const def = {
      image,
      partition: BOOT_PARTITION,
      path: file
    };
    return { def, content };
  });
  return defs;
};
