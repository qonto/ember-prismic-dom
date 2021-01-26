
ember-prismic-dom
==============================================================================

![CI](https://github.com/qonto/ember-prismic-dom/workflows/CI/badge.svg)
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-prismic-dom.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-prismic-dom

More idiomatic ember rendering of data from [Prismic](https://prismic.io/), generating HTML in templates. This allows you to avoid using of [triple curlies](https://handlebarsjs.com/guide/#html-escaping) to output [Prismic](https://prismic.io/) content.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-prismic-dom
```


Usage
------------------------------------------------------------------------------

`<Primcic::Dom/>` replaces [`prismic-dom`](https://github.com/prismicio/prismic-dom)

In place of:
```js
import Component from '@glimmer/component';
import PrismicDOM from 'prismic-dom';

export default class MyComponent extends Component {
  get html() {
    return PrismicDOM.RichText.asHtml(this.args.myPrismicDoc.data.myRichText)
  }
}
```

```hbs
{{{this.html}}}
```

Use this:
```hbs
<Prismic::Dom @nodes={{@myPrismicDoc.data.myRichText}} />
```

Additionaly you can pass an `onUnknownTag` action to handle recieving data of a type `Prismic::Dom` can't render.

```hbs
<Prismic::Dom @nodes={{@myPrismicDoc.data.myRichText}} @onUnknownTag={{this.onUnknownTag}} />
```

```js
import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MyComponent extends Component {
  @action
  onUnknownTag (node) {
    console.error(`Could not render ${node.type}`);
  }
}
```


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
