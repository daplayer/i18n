require('./test_helper');

describe('translation files', () => {
  it('should have the same keys', () => {
    ['meta', 'local', 'soundcloud', 'youtube', 'app'].forEach((module) => {
      var fr = JSON.parse(I18n.read(module, 'fr'));
      var en = JSON.parse(I18n.read(module, 'en'));

      var fr_keys = keys(fr);
      var en_keys = keys(en);

      if (fr_keys.length < en_keys.length)
        var missing = 'french';
      else
        var missing = 'english';

      assert.deepEqual(fr_keys, en_keys, `Missing ${missing} translation in the "${module}" module`);
    })
  });
});
