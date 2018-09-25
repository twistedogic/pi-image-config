import path from "path";
import program from "commander";
import { writeToImage } from "./lib/image";
import { generateTemplate } from "./lib/template";
import { readPath } from "./lib/util";

const options = [
  {
    key: "image",
    description: "filepath to rpi image to be patched",
    required: true
  },
  {
    key: "template",
    description: "filepath to dir of files/template to patch",
    required: true
  },
  {
    key: "env",
    description:
      "filepath to dir of environment variables for the templates (use template directly if not provided)",
    required: false
  },
  {
    key: "partition",
    description: "partition to write (default:1)",
    required: false
  }
];

const check = opt => argv => {
  opt.filter(({ required }) => required).forEach(({ key }) => {
    if (!argv[key]) {
      throw new Error(`parameter ${key} is missing`);
    }
  });
};

const addOpts = (cmd, opt) => {
  options.forEach(({ key, description, required }) => {
    const variable = required ? `<${key}>` : `[${key}]`;
    cmd.option(`-${key.charAt(0)}, --${key} ${variable}`, description);
  });
};

export const fixPath = filepath =>
  filepath.charAt(0) === "/" ? filepath : path.resolve(process.cwd(), filepath);

export const main = async ({ image, template, env, partition = 1 }) => {
  try {
    const templateDir = fixPath(template);
    const files = env
      ? await generateTemplate({ templateDir, envDir: fixPath(env) })
      : await readPath(templateDir);
    return writeToImage({ image, partition: partition || 1, files });
  } catch (err) {
    throw err;
  }
};

export const run = argv => {
  program.version("0.0.1");
  addOpts(program, options);
  program.parse(argv);

  check(options)(program);
  main(program)
    .then(res => {
      if (res) {
        res.forEach(file => console.log(`${file}: done`));
      }
    })
    .catch(console.error);
};
