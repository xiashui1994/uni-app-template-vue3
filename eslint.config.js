const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  overrides: {
    vue: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
    typescript: {
      'ts/no-unused-expressions': 'off',
      'ts/no-empty-object-type': 'off',
    },
  },
  ignores: [
    'dist/*',
    'plugins/*',
    'node_modules/*',
    'src/uni_modules/*',
  ],
})
