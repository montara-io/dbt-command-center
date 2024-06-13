export default {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/", // Set the URL for the test environment
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
  },
};
