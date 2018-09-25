import fs from "fs";
import path from "path";

const fixture = path.resolve(__dirname, "fixture");
const check = fs.existsSync(fixture);

export const needFixture = check ? test : test.skip;
