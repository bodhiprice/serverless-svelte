module.exports = {
  env: {
    browser: false,
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'standard',
    'standard-preact',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['import', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all'
      }
    ],
    'array-callback-return': 1,
    'no-console': 0,
    'no-await-in-loop': 2,
    'no-extra-semi': 2,
    'array-callback-return': 2,
    curly: 2,
    'no-else-return': 2,
    'require-await': 2,
    'no-var': 2,
    'no-unused-vars': [2, { args: 'none', varsIgnorePattern: '^h$' }],
    'prefer-arrow-callback': 2,
    'prefer-const': 2,
    'prefer-rest-params': 2,
    'prefer-template': 2
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true
      },
      plugins: ['jest'],
      rules: {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'off'
      }
    }
  ]
};
