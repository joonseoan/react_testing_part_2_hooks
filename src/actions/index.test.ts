import { doesNotReject } from "assert";
import moxios from "moxios";
import { getSecretWord } from "./index";

describe("getSecretWord", () => {
  beforeEach(() => {
    // if "axios" instance is available,
    //  that instance must pass as an argument in moxios.install().
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  test("secretWord is returned", async () => {
    //.wait is for asynchronous function
    moxios.wait(() => {
      // moxios mock requests instead of http
      const request = moxios.requests.mostRecent();

      // moxios mock response.
      request.respondWith({
        status: 200,
        response: "party",
      });
    });

    // update to test app in Redux / context section
    const secretWord = await getSecretWord();
    expect(secretWord).toBe("party");

    // return getSecretWord().then((secretWord) => {
    //   expect(secretWord).toBe("party");
    // });

    // 1) old
    // return getSecretWord()
    //   .then(secretWord => {
    //     expect(secretWord).toBe('party');
    //   })
  });
});
