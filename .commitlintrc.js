const {
  utils: { getPackages },
} = require('@commitlint/config-lerna-scopes');
/**
 * Additional scopes for `@commitlint/config-lerna-scopes`
 * https://github.com/conventional-changelog/commitlint/issues/629
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': async ctx => [
      2,
      'always',
      [...(await getPackages(ctx)), 'root'],
    ],
  },
};
