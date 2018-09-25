import path from "path";
import { validateDef } from "./image";
import { needFixture } from "../../testhelper";

describe("validateDef", () => {
  needFixture("should validate if file exist in img", () => {
    const image = path.resolve(
      __dirname,
      "..",
      "..",
      "fixture/image",
      "resin.img"
    );
    const cases = [
      {
        def: {
          image,
          partition: 1,
          path: "/config.json"
        },
        output: true
      },
      {
        def: {
          image,
          partition: 1,
          path: "/config.js"
        },
        output: false
      }
    ];
    return Promise.all(
      cases.map(c => {
        const { output, def } = c;
        if (output) {
          return validateDef({ def }).then(res => expect(res).toBeTruthy());
        }
        return validateDef({ def }).catch(err => expect(err).toBeTruthy());
      })
    );
  });
});
