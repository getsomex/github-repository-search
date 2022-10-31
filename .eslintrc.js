module.exports =  {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  plugins: ["react","@typescript-eslint", "import", "unused-imports", "import-access"],
  rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-function-return-type": ["warn"],
      "@typescript-eslint/require-await": ["warn"],
      "@typescript-eslint/no-unused-vars": ["off",],
      "import/order": [
          "error",
          {
            groups: [
              ["builtin", "external"],
              "parent",
              "sibling",
              "index",
              "object",
            ],
            alphabetize: {
              order: "asc",
              caseInsensitive: true,
            },
          },
      ],
      "unused-imports/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
          },
      ],
  },
  ignorePatterns: ['.eslintrc.js','tailwind.config.js']

}
