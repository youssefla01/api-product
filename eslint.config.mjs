import globals from "globals";
import pluginJs from "@eslint/js";
import pluginTs from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"], // Cible JavaScript et TypeScript.
    ignores: ["node_modules/**", "dist/**"], // Ignore certains répertoires.
    languageOptions: {
      parser: tsParser, // Utilisation du parser TypeScript.
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser, // Variables globales pour le navigateur.
        ...globals.node, // Variables globales pour Node.js.
      },
    },
    plugins: {
      "@typescript-eslint": pluginTs, // Plugin pour TypeScript.
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Règles recommandées JavaScript.
      ...pluginTs.configs.recommended.rules, // Règles recommandées TypeScript.
      "no-console": "warn", // Exemple de règle personnalisée.
    },
    rules: {
      "no-console": "off",
    },
    
  },
];
