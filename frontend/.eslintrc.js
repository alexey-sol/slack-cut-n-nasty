module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: [
        "react",
        "react-hooks",
        "@typescript-eslint",
    ],
    rules: {
        "class-methods-use-this": 0,
        "import/prefer-default-export": 0,
        "import/extensions": 0,
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: [2, "double"],
        "lines-between-class-members": 0,
        "max-classes-per-file": 0,
        "max-len": ["error", { code: 100 }],
        "no-else-return": 0,
        "no-empty-function": 0,
        "no-unused-vars": ["error", { args: "none" }],
        "no-use-before-define": 0,
        "no-useless-constructor": 0,
        "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
        "react/jsx-indent": ["error", 4],
        "react/prop-types": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },
};
