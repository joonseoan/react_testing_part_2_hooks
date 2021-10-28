// Basic moxios for redux or context.

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

    // 2) with callback from the component.
    // it is from component to be a role of "setSecretWord"
    // [Important]: mock for useState's set function!
    const mockSetSecretWord = jest.fn();
    await getSecretWord(mockSetSecretWord);
    // the setState will be called with "party" from the server.
    expect(mockSetSecretWord).toBeCalledWith("party");

    // 1) without callback from the component
    // return getSecretWord().then((secretWord) => {
    //   expect(secretWord).toBe("party");
    // });
  });
});
