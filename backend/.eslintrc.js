module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "airbnb-base",
    ],
    ignorePatterns: [
        "node_modules/",
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
    },
    settings: {
        "import/resolver": {
            alias: {
                extensions: [".ts", ".js", ".json"],
                map: [
                    ["@app", "./src/app"],
                    ["@config", "./src/config"],
                    ["@const", "./src/utils/const"],
                    ["@graphql", "./src/graphql"],
                    ["@root", "./src"],
                    ["@utils", "./src/utils"],
                ],
            },
            node: {
                extensions: [".js", ".ts"],
                paths: ["src"],
            },
        },
    },
};
