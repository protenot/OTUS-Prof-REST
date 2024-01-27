module.exports = {
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },

  "preset": "jest-playwright-preset"
};
