/* eslint-disable sort-keys */
module.exports = {
  env: {
    "cypress/globals": true,
    es6: true,
    node: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jest-dom/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    localStorage: true,
    window: true,
  },
  overrides: [
    {
      files: ["*test.js", "*.spec.js"],
      rules: {
        "no-undef": 0,
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: [
    "eslint-plugin-cypress",
    "@typescript-eslint",
    "typescript",
    "react-hooks",
    "jest-dom",
    "sort-destructure-keys",
    "sort-imports-es6-autofix",
    "testing-library",
    "typescript-sort-keys",
    "graphql",
  ],
  rules: {
    strict: 0,
    "arrow-body-style": "off",
    curly: [2, "all"],
    "default-param-last": "off",
    "implicit-arrow-linebreak": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "no-console": "off",
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",

    // We should put react-hooks rules back in - https://trello.com/c/00pCP32g
    // TODO: Set these rules to 'error' when we resolve all offending warnings
    // If this is set to `warn`, then CI will not pass
    // 'react-hooks/rules-of-hooks': 'warn', // Checks rules of Hooks
    // 'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies

    // This was added in `react-scripts` v5.0.0 and produced a lot of errors
    // We can discuss later if we want it on
    "react/function-component-definition": "off",

    "react/jsx-filename-extension": "off",
    "react/prop-types": [
      0,
      {
        ignore: ["classes", "theme"],
        skipUndeclared: false,
      },
    ],
    "react/react-in-jsx-scope": "off", // We no longer need this thanks to changes in the JSX compiler in React 17.x
    "react/require-default-props": "off", // disabling this in favor or passing in default props for presentational components
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-max-props-per-line": [
      2,
      {
        maximum: 1,
      },
    ],
    // TODO: Set this rule to 'error' when we resolve all offending warnings.
    // We are enforing this rule in local changes only right now.
    // 'react/jsx-sort-props': [
    //   'error',
    //   {
    //     reservedFirst: false,
    //   },
    // ],
    "sort-destructure-keys/sort-destructure-keys": 2,
    "sort-imports-es6-autofix/sort-imports-es6": [
      2,
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
      },
    ],
    "sort-keys": [
      "error",
      "asc",
      {
        caseSensitive: true,
        natural: false,
      },
    ],
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        mjs: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "import/no-cycle": "off",
    "react/jsx-props-no-spreading": "off",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["utils", "./src/utils"]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
};
