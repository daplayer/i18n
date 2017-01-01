require('./test_helper');

describe('#t', () => {
  it('should look for loaded I18n key', () => {
    I18n.cache = {foo: {bar: "baz"}};

    assert.equal(I18n.t('foo.bar'), 'baz');
  });

  it('should pick `app` keys if there is no nesting', () => {
    I18n.cache = { app: { foo: 'bar' }};

    assert.equal(I18n.t('foo'), 'bar');
  });

  it('should replace placeholders given a hash', () => {
    I18n.cache = {foo: {bar: "Hello %{name}, you are %{age} years old!"}};

    var result = I18n.t('foo.bar', {
      name: 'Jacky',
      age:  20
    });

    assert.equal(result, 'Hello Jacky, you are 20 years old!');
  });
});
