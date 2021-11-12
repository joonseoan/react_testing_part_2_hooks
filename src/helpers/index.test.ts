import { getLetterMatchCount } from "./index";

describe("getLetterMatchCount", () => {
  const secretWord = "party";

  test("no matched word", () => {
    const matchedCount = getLetterMatchCount("bones", secretWord);
    expect(matchedCount).toBe(0);
  });

  test("three matched characters", () => {
    const matchedCount = getLetterMatchCount("train", secretWord);
    expect(matchedCount).toBe(3);
  });

  test("duplicated word", () => {
    const matchedCount = getLetterMatchCount("parka", secretWord);
    expect(matchedCount).toBe(3);
  });
});
