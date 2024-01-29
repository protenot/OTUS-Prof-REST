module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["@typescript-eslint", "jest", "import"],
  rules: {
    "no-undef": "off",
    "@typescript-eslint/no-var-requires": "off",
    //"@typescript-eslint/no-explicit-any": "off",
  },
};
