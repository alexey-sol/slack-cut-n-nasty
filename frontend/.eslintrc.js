module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "airbnb",
        "plugin:react/recommended",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
    ],
    ignorePatterns: ["node_modules/"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: [
        "@typescript-eslint",
        "react",
        "react-hooks",
        "import",
    ],
    rules: {
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-unused-vars": ["error", { args: "none" }],
        "class-methods-use-this": 0,
        "consistent-return": 0,
        "import/extensions": 0,
        "import/no-unresolved": "error",
        "import/prefer-default-export": 0,
        indent: ["error", 4, { SwitchCase: 1 }],
        quotes: [2, "double"],
        "lines-between-class-members": 0,
        "max-classes-per-file": 0,
        "max-len": ["error", { code: 100 }],
        "no-else-return": 0,
        "no-empty-function": 0,
        "no-param-reassign": ["error", {
            ignorePropertyModificationsFor: ["state"],
            props: true,
        }],
        "no-shadow": 0,
        "no-use-before-define": 0,
        "no-useless-constructor": 0,
        "react/jsx-filename-extension": [1, { extensions: [".tsx", ".ts"] }],
        "react/jsx-indent": ["error", 4],
        "react/jsx-indent-props": ["error", 4],
        "react/jsx-props-no-spreading": 0,
        "react/prop-types": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
        "import/parsers": {
            "@typescript-eslint/parser": [".js", ".jsx", ".ts", ".tsx"],
        },
        "import/resolver": {
            alias: {
                extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
                map: [
                    ["@", "./src"],
                    ["@config", "./src/utils/config"],
                    ["@const", "./src/utils/const"],
                    ["@gql", "./src/utils/gql"],
                    ["@helpers", "./src/utils/helpers"],
                    ["@hooks", "./src/app/hooks"],
                ],
            },
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                paths: ["src"],
            },
        },
    },
};
