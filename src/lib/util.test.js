import path from "path";
import { getDefs, listPath, getStats, getRelativePath } from "./util";

describe("getStats", () => {
  it("should return file stats with file path", () => {
    return getStats(path.resolve(__dirname, "util.js"))
      .then(res => {
        expect(res).toHaveProperty("isDir", false);
        expect(res).toHaveProperty("name");
      })
      .catch(err => expect(err).toBeFalsy());
  });
});

describe("listPath", () => {
  it("should return all files with full path", () => {
    const dir = path.resolve(__dirname, "..", "lib");
    return listPath(dir)
      .then(res => expect(res).toHaveProperty("length"))
      .catch(err => expect(err).toBeFalsy());
  });
});

describe("getRelativePath", () => {
  it("should get relative path", () => {
    const dir = "/root/";
    const filepath = "/root/dir/root";
    const expected = "/dir/root";
    const output = getRelativePath(dir, filepath);
    expect(output).toBe(expected);
  });
});

describe("getDefs", () => {
  it("should return image config and file content", () => {
    const image = "mock";
    const files = [{ file: "path1", content: "something" }];
    const defs = getDefs({ image, files });
    defs.forEach(def => {
      expect(def).toHaveProperty("def");
      expect(def).toHaveProperty("content");
      expect(def.def).toHaveProperty("image", image);
      expect(def.def).toHaveProperty("partition");
    });
  });
});
