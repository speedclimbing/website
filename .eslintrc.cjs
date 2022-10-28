module.exports = {
  plugins: [
    'svelte3',
    '@typescript-eslint', // add the TypeScript plugin
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    extraFileExtensions: ['.svelte'],
  },
  env: {
    es6: true,
    browser: true,
  },
  parser: '@typescript-eslint/parser', // add the TypeScript parser

  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    // ...
  },
  settings: {
    'svelte3/typescript': true, // load TypeScript as peer dependency
    // ...
  },
  extends: [
    // then, enable whichever type-aware rules you want to use
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
}
