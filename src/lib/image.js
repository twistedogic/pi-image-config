import { writeFile, readFile } from "resin-image-fs";
import { getDefs } from "./util";

export const validateDef = ({ def }) =>
  readFile(def)
    .then(() => Promise.resolve(true))
    .catch(err => {
      if (err) {
        return Promise.reject(err);
      }
    });

export const writeToImage = async opt => {
  try {
    const defs = await getDefs(opt);
    await Promise.all(defs.map(validateDef));
    const pipeline = defs.map(({ def, content }) =>
      writeFile(def, content).then(() => def.path)
    );
    const result = await Promise.all(pipeline);
    return result;
  } catch (err) {
    throw err;
  }
};
