import path from "path";
import { main } from "./main";
import { needFixture } from "../testhelper";

const image = path.resolve(__dirname, "..", "fixture/image/resin.img");
const template = path.resolve(__dirname, "..", "fixture/template");
const env = path.resolve(__dirname, "..", "fixture/env");

describe("main", () => {
  needFixture("should update image", () => {
    const input = { image, template };
    return main(input)
      .then(res => expect(res).toHaveProperty("length"))
      .catch(err => expect(err).toBeFalsy());
  });
  needFixture("should update image with env", () => {
    const input = { image, template, env };
    return main(input)
      .then(res => expect(res).toHaveProperty("length"))
      .catch(err => expect(err).toBeFalsy());
  });
});
