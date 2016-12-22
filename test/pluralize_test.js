require('./test_helper');

describe('#pluralize', () => {
  it('should pluralize when there is no count arg', () => {
    assert.equal('singles', I18n.pluralize('single'));
  });

  it('should join the pluralized key with the count', () => {
    assert.equal('1 single', I18n.pluralize(1, 'single'));
    assert.equal('10 singles', I18n.pluralize(10, 'single'));
  });

  describe('in English', () => {
    beforeEach(() => {
      I18n.load('en');
    });

    it('should pluralize for 0 records', () => {
      assert.equal(I18n.pluralize(0, 'album'), '0 albums');
    });
  });

  describe('in French', () => {
    beforeEach(() => {
      I18n.load('fr');
    });

    it('should not pluralize for 0 records', () => {
      assert.equal(I18n.pluralize(0, 'album'), '0 album');
    });
  });
});
