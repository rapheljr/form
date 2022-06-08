module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    camelcase: 'error',
    'class-methods-use-this': 'warn',
    'array-bracket-spacing': ['error'],
    'comma-spacing': 'error',
    'arrow-spacing': 'error',
    'no-var': 'off',
    curly: 'error',
    'brace-style': 'error',
    'eol-last': 'warn',
    eqeqeq: 'warn',
    'getter-return': 'error',
    'grouped-accessor-pairs': 'warn',
    'global-require': 'error',
    'handle-callback-err': 'error',
    'id-length': 'error',
    'key-spacing': 'error',
    'max-len': 'error',
    'max-params': [
      'error',
      {
        max: 4,
      },
    ],
    'max-statements': 'error',
    'no-console': 'off',
    'no-else-return': 'error',
    'no-eval': 'error',
    'no-implicit-globals': 'error',
    'prefer-const': 'error',
    'no-magic-numbers': 'off',
    'no-process-exit': 'off',
    'no-process-env': 'error',
    'no-return-assign': 'error',
    'no-useless-return': 'error',
    'max-depth': 'error',
    'no-mixed-operators': 'error',
    complexity: ['error', 4],
    'no-extra-parens': 'error',
    'no-template-curly-in-string': 'error',
    'array-callback-return': 'error',
    'default-param-last': 'error',
    'no-constructor-return': 'error',
    'no-invalid-this': 'error',
    'no-lone-blocks': 'error',
    'no-loop-func': 'error',
    'no-proto': 'error',
    'prefer-spread': 'warn',
    'no-useless-call': 'error',
    'no-param-reassign': 'error',
    'space-infix-ops': 'error',
    'no-multi-spaces': 'error',
    'semi-spacing': 'error',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'func-style': ['error', 'expression'],
    'no-nested-ternary': 'error',
    'no-shadow': 'error',
    'no-unused-expressions': 'off',
    'one-var-declaration-per-line': 'error',
    yoda: 'error',
    'no-undefined': 'off',
    'no-lonely-if': 'error',
  },
  overrides: [
    {
      files: ['test*.js'],
      rules: {
        'max-len': 'warn',
        'no-magic-numbers': 'off',
        'max-statements': 'off',
      },
    },
  ],
};
