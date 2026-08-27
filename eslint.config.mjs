import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([".react-router/**", "build/**", "node_modules/**"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs.flat["recommended-latest"],
  {
    files: ["**/*.{ts,tsx,mts,mjs,js}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
]);
