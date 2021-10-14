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

  test("secretWord is returned", async (done) => {
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
    // 2)
    const secretWord = await getSecretWord();
    expect(secretWord).toBe("party");
    done();

    // 1) old
    // getSecretWord()
    //   .then(secretWord => {
    //     expect(secretWord).toBe('party');
    //   })
  });
});
