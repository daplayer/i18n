'use strict';

const fs   = require('fs');
const path = require('path');

module.exports = class I18n {
  /**
   * Loads the translation files of each module based on the
   * defined locale and store them in the cache.
   *
   * @param  {String=} locale - Optionally the locale to load,
   *                            otherwise, `Config.meta.locale`
   *                            is used.
   * @return {null}
   */
  static load(locale) {
    this.locale = locale;

    if (!this.cache)
      this.cache = {};

    ['app', 'soundcloud', 'youtube', 'local', 'meta'].forEach((e) => {
      this.cache[e] = JSON.parse(this.read(e, locale))[e];
     });
  }

  /**
   * Facility to get access to a specific value. The dot (".")
   * is used to represent the nesting of elements. For instance:
   *
   *   t("meta.foo.bar")
   *
   * is equivalent to accessing:
   *
   *   I18n.cache.meta.foo.bar
   *
   * @param  {String}  string - The path string.
   * @param  {Object=} hash   - Eventual placeholder values.
   * @return {String}
   */
  static t(string, hash) {
    // Short-hands to access to the SoundCloud and YouTube
    // translations.
    if (string.startsWith('sc'))
      string = string.replace('sc', 'soundcloud');
    else if (string.startsWith('yt'))
      string = string.replace('yt', 'youtube');

    var methods = string.split(".");
    var context = this.cache;

    if (methods.length == 1)
      return this.cache.app[string];

    methods.forEach(function(element) {
      context = context[element];
    });

    if (hash)
      context = context.replace(/%{(\w+)}/g, (match, p1) => {
        return hash[p1];
      });

    return context;
  }

  /**
   * Facility to read the specific translation file of a
   * module.
   *
   * @param  {String} module - The module to look for.
   * @param  {String} locale - The local to load.
   * @return {String}
   */
  static read(module, locale) {
    var translation_file = `${module}/${locale}.json`;

    return fs.readFileSync(path.join(__dirname, '..', 'translations', translation_file)).toString();
  }

  /**
   * Facility to pluralize a word given a count. The given
   * word's translation should be stored under the `app`
   * namespace.
   *
   *    pluralize('single')     // => 'singles'
   *    pluralize(1, 'single')  // => '1 single'
   *    pluralize(10, 'single') // => '10 singles'
   *
   * Some rules are applied depending on the locale.
   * For instance:
   *
   *    I18n.locale == 'en'    // => true
   *    pluralize(0, 'album') // => '0 albums'
   *
   *    I18n.locale == 'fr'    // => true
   *    pluralize(0, 'album') // => '0 album'
   *
   * @param  {Number|String} count
   * @param  {String=}       word
   * @return {String}
   */
  static pluralize(count, word) {
    if (typeof word !== 'string') {
      var translated = this.t("app." + count);
      return `${translated}s`;
    } else {
      var translated = this.t("app." + word);

      if (this.locale == 'fr' && count < 2 ||
          this.locale == 'en' && count == 1)
        return `${count} ${translated}`;

      return `${count} ${translated}s`;
    }
  }

  /**
   * Returns the string with its first letter capitalized.
   *
   * @param  {String} word
   * @return {String}
   */
  static titleize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
