import { renderTemplate, getEnvObj } from "./template";

describe("getEnvObj", () => {
  it("should yaml content", () => {
    const input = [{ content: `value: "ok"` }, { content: `key: "ok"` }];
    const expected = {
      value: "ok",
      key: "ok"
    };
    const output = input.reduce(getEnvObj, {});
    expect(output).toMatchObject(expected);
  });
});

describe("renderTemplate", () => {
  it("should render template", () => {
    const cases = [
      {
        env: { key: "ok" },
        input: {
          file: "/myfile",
          content: "this is {{key}}"
        },
        expected: {
          file: "/myfile",
          content: "this is ok"
        }
      }
    ];
    cases.forEach(c => {
      const { env, input, expected } = c;
      const output = renderTemplate(env)(input);
      expect(output).toMatchObject(expected);
    });
  });
});
