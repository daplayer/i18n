require('./test_helper');

describe('#load', () => {
  it('should load keys according to the defined locale', () => {
    I18n.load('en');
    assert.equal('History', I18n.t('meta.history'))

    I18n.load('fr');
    assert.equal('Historique', I18n.t('meta.history'));
  });
});
