module.exports = {
  "extends": [
    "typescript"
  ],
  "plugins": ["unused-imports"],
  "env": {
    "node": true
  },
  "rules": {
    "object-curly-spacing": ["error", "always"],
    'array-bracket-spacing': ["error", "always"],
    'no-multiple-empty-lines': ["error", { "max": 1, "maxEOF": 1 }],
    'import/no-unresolved': 0,
    'import/extensions': 0,
    semi: ['error', 'never'],
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/unbound-method': 0,
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        minimumDescriptionLength: 4,
      },
    ],
    'import/no-extraneous-dependencies': 0,
    'import/no-duplicates': 0,
    'import/no-self-import': 0,
    'import/named': 0,
    'import/order': 0,
    'import/no-cycle': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-useless-path-segments': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    'max-len': [1, 125, 2],
    'no-useless-constructor': 0,
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ]
  }
}