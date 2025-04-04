import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default {
   ignores: ["dist"],
   files: ["**/*.{ts,tsx}"],
   languageOptions: {
      ecmaVersion: 2020,
      parser: tsParser,
      globals: globals.browser,
   },
   plugins: {
      "@typescript-eslint": tsPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
   },
   extends: ["plugin:prettier/recommended"],
   rules: {
      ...tsPlugin.configs.recommended.rules, // Правильное подключение правил TypeScript
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", {}],
      "@typescript-eslint/no-unused-vars": "off",
      "prettier/prettier": "error", // Подключение Prettier
   },
};

