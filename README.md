# DaPlayer I18n

This repository contains the different translation files (in JSON format) and
functions to manage internationalization inside DaPlayer. You can use it but
keys may not be organized as you would expect them to be.

At the moment, the supported languages are:

* English
* French

## Usage

This repository isn't published on NPM; you should rather download the tar or
reference it from your `package.json` file:

~~~json
{
  "daplayer-i18n": "https://github.com/daplayer/i18n"
}
~~~

Then you can add the following to your code:

~~~javascript
const I18n = require('daplayer-i18n');

// Make sure to load the locale that you want
I18n.load('fr');
~~~

Finally, to get a specific translation, you just need to call the `t`
function like this:

~~~javascript
I18n.t('local.sidebar.local_files');
// => "Fichiers locaux"

I18n.t('local.feedback.progress', {
  current: 10,
  total:   200
});
// => "10 fichiers traités sur 200."
~~

## License

Copyright (c) 2016, Robin Dupret

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
