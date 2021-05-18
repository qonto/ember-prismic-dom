
ember-prismic-dom
==============================================================================

![CI](https://github.com/qonto/ember-prismic-dom/workflows/CI/badge.svg)
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-prismic-dom.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-prismic-dom

Easy [Prismic](https://prismic.io/) rendering in [Ember.js](https://emberjs.com).

```hbs
<Prismic::Dom @nodes={{@prismicData}} />
```

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```sh
ember install ember-prismic-dom
```


Usage
------------------------------------------------------------------------------

```hbs
<Prismic::Dom @nodes={{@myPrismicDoc.data.myRichText}} />
```

### onUnknonwnTag

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

### Custom Rendering

Pass a custom component name to be used to render a prismic type. For example to custom render the `group-list-item` and `hyperlink` types

```hbs
<Prismic::Dom
  @group-list-item='my-list'
  @hyperlink='my-hyperlink'
  @nodes={{@myPrismicDoc.data.myRichText}}
/>
```

_my-list.hbs_
```hbs
<h1>My List</h2>
<ul>{{yield}}<ul>
```

_my-hyperlink.hbs_
```hbs
<a href={{@node.element.data.url}}>{{yield}}</a>
```

### Use existing addons

For example you want to use [`ember-async-image`](https://github.com/html-next/ember-async-image)

```hbs
<Prismic::Dom @nodes={{@nodes}} @image='image'>
```

_image.hbs_
```hbs
<AsyncImage src={{@node.element.url}}/>
```

### Migrating from prismic-dom

`<Primcic::Dom/>` replaces [`prismic-dom`](https://github.com/prismicio/prismic-dom) , please [see the blog post for more information.](https://medium.com/qonto-way/introducing-ember-prismic-dom-c362647037d7)

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

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
