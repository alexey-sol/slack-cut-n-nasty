module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "airbnb-base",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint",
    ],
    rules: {
        "class-methods-use-this": 0,
        "import/prefer-default-export": 0,
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: [2, "double"],
        "lines-between-class-members": 0,
        "max-classes-per-file": 0,
        "max-len": ["error", { code: 100 }],
        "no-empty-function": 0,
        "no-unused-vars": ["error", { args: "none" }],
        "no-useless-constructor": 0,
    },
};
