import ember from "eslint-plugin-ember";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:ember/recommended",
    "plugin:prettier/recommended",
), {
    plugins: {
        ember,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            requireConfigFile: false,

            babelOptions: {
                plugins: [["@babel/plugin-proposal-decorators", {
                    decoratorsBeforeExport: true,
                }]],
            },
        },
    },

    rules: {},
}, ...compat.extends("plugin:n/recommended").map(config => ({
    ...config,

    files: [
        "./.eslintrc.js",
        "./.prettierrc.js",
        "./.stylelintrc.js",
        "./.template-lintrc.js",
        "./ember-cli-build.js",
        "./testem.js",
        "./blueprints/*/index.js",
        "./config/**/*.js",
        "./lib/*/index.js",
        "./server/**/*.js",
    ],
})), {
    files: [
        "./.eslintrc.js",
        "./.prettierrc.js",
        "./.stylelintrc.js",
        "./.template-lintrc.js",
        "./ember-cli-build.js",
        "./testem.js",
        "./blueprints/*/index.js",
        "./config/**/*.js",
        "./lib/*/index.js",
        "./server/**/*.js",
    ],

    languageOptions: {
        globals: {
            ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, "off"])),
            ...globals.node,
        },

        ecmaVersion: 5,
        sourceType: "commonjs",
    },
}, ...compat.extends("plugin:qunit/recommended").map(config => ({
    ...config,
    files: ["tests/**/*-test.{js,ts}"],
})), {
    files: ["tests/**/*-test.{js,ts}"],

    rules: {
        "ember/no-empty-glimmer-component-classes": "off",
    },
}, ...compat.extends("@qonto/eslint-config-typescript").map(config => ({
    ...config,
    files: ["**/*.ts"],
}))];