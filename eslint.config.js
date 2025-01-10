const antfu = require('@antfu/eslint-config').default
const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat()

module.exports = antfu({
  overrides: {
    vue: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
      'vue/no-template-shadow': 'off',
    },
    typescript: {
      'ts/no-unused-expressions': 'off',
      'ts/no-empty-object-type': 'off',
      'ts/no-require-imports': 'off',
    },
    stylistic: {
      'style/max-statements-per-line': 'off',
    },
  },
  ignores: [
    'dist/*',
    'plugins/*',
    'node_modules/*',
    'src/uni_modules/*',
  ],
}, ...compat.config({
  globals: {
    uni: true,
    jWeixin: true,
    wx: true,
    plus: true,
    getApp: true,
    feConfig: true,
  },
}))
