import stringsModule from "./strings";
const { getStringByLanguage } = stringsModule;

const strings = {
  en: { submit: "submit" },
  emoji: { submit: "🚀" },
  mermish: {},
};

describe("language string testing", () => {
  const mockWarn = jest.fn();
  let originalWarning: (data: any) => void;

  beforeEach(() => {
    originalWarning = console.warn;

    console.warn = mockWarn;
  });

  afterEach(() => {
    console.warn = originalWarning;
  });

  test("returns correct submit string for English", () => {
    const string = getStringByLanguage("en", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns the correct submit string for Emoji", () => {
    const string = getStringByLanguage("emoji", "submit", strings);
    expect(string).toBe("🚀");
    expect(mockWarn).not.toHaveBeenCalled();
  });

  test("returns English submit string when language does not exist", () => {
    const string = getStringByLanguage("noLang", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [noLang]"
    );
  });

  test("returns English submit string when submit key does not exist for language", () => {
    const string = getStringByLanguage("memish", "submit", strings);
    expect(string).toBe("submit");
    expect(mockWarn).toHaveBeenCalledWith(
      "Could not get string [submit] for [memish]"
    );
  });
});

test("testing the original warning is working after mock testing", () => {
  console.warn("Warn!!!!!!!");
});
