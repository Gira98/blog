module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["react-hooks", "react-refresh"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
