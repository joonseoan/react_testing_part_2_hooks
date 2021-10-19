// module.exports = {
//   ...jest.requireActual(".."),
//   __esModule: true,
//   // TODO: update return value for Redux / Context API
//   getSecretWord: jest.fn().mockReturnValue(Promise.resolve("party")),
// };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...jest.requireActual(".."),
  __esModule: true,
  // TODO: update return value for Redux / Context API
  getSecretWord: jest.fn().mockReturnValue(Promise.resolve("party")),
};
