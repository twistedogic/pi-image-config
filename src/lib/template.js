import Mustache from "mustache";
import yaml from "js-yaml";
import { readPath } from "./util";

export const getEnvObj = (obj, { content }) =>
  Object.assign(obj, yaml.safeLoad(content));

export const renderTemplate = env => ({ file, content }) => ({
  file,
  content: Mustache.render(content, env)
});

export const generateTemplate = async ({ templateDir, envDir }) => {
  try {
    const envFiles = await readPath(envDir);
    const templateFiles = await readPath(templateDir);
    const env = envFiles.reduce(getEnvObj, {});
    return templateFiles.map(renderTemplate(env, templateDir));
  } catch (err) {
    throw err;
  }
};
