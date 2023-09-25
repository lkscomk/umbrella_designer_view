module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'error',
    'no-debugger': 'error',
    'vue/eqeqeq': 'error',
    'vue/no-irregular-whitespace': 'error',
    'vue/no-restricted-syntax': 'error',
    'vue/no-confusing-v-for-v-if': 'warn',
    'vue/order-in-components': 'error',
    'vue/no-template-shadow': 'off',
    'vue/this-in-template': 'error',
    'vue/attributes-order': 'error'
  }
}
