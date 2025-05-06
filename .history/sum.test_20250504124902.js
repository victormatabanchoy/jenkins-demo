const sum = require("./sum");

test("suma 1 + 2 debe ser 3", () => {
  expect(sum(1, 2)).toBe(3);
});
