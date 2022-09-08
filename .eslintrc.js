module.exports = {
  root: true, // 从当前配置文件往下生效
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      globalReturn: true
    },
    sourceType: 'module'
  },
  globals: {
    LODOP: false
  },
  rules: {
    'prefer-const': 2,
    'no-console': 1,
    'arrow-parens': 1,
    quotes: [1, 'single'],
    'space-in-parens': [2, 'never'],
    semi: [2, 'always'],
    'semi-spacing': [2, { before: false, after: true }],
    'max-len': [
      1,
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreTemplateLiterals: true
      }
    ]
  }
};
