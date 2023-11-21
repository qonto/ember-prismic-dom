![ember-prismic-dom-illustration](https://user-images.githubusercontent.com/12345/189907218-ff8a7d4e-e5bf-4d6f-af87-972ceb98195e.svg)

# ember-prismic-dom

![CI](https://github.com/qonto/ember-prismic-dom/workflows/CI/badge.svg)
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/ember-prismic-dom.svg
[npm-badge-url]: https://www.npmjs.com/package/ember-prismic-dom

Easy [Prismic](https://prismic.io/) rendering in [Ember.js](https://emberjs.com).

```hbs
<Prismic::Dom @nodes={{@prismicData}} />
```

## Compatibility

- Ember.js v4.4 or above
- Ember CLI v4.4 or above
- Node.js v18 or above
- TypeScript v5 or above

## Installation

```sh
ember install ember-prismic-dom
```

## Usage

```hbs
<Prismic::Dom @nodes={{@myPrismicDoc.data.myRichText}} />
```

### onUnknownTag

Additionally you can pass an `onUnknownTag` action to handle receiving data of a type `Prismic::Dom` can't render.

```hbs
<Prismic::Dom
  @nodes={{@myPrismicDoc.data.myRichText}}
  @onUnknownTag={{this.onUnknownTag}}
/>
```

```js
import Component from "@glimmer/component";
import { action } from "@ember/object";

export default class MyComponent extends Component {
  @action
  onUnknownTag(node) {
    console.error(`Could not render ${node.type}`);
  }
}
```

### Custom Rendering

Pass a custom component name to be used to render a prismic type. For example to custom render the `group-list-item` and `hyperlink` types

```hbs
<Prismic::Dom
  @group-list-item="my-list"
  @hyperlink="my-hyperlink"
  @nodes={{@myPrismicDoc.data.myRichText}}
/>
```

_my-list.hbs_

```hbs
<h1>My List</h1>
<ul>{{yield}}</ul>
```

_my-hyperlink.hbs_

```hbs
<a href={{@node.node.data.url}}>{{yield}}</a>
```

### Use existing addons

For example you want to use [`ember-async-image`](https://github.com/html-next/ember-async-image)

```hbs
<Prismic::Dom @nodes={{@nodes}} @image='image'>
```

_image.hbs_

```hbs
<AsyncImage src={{@node.node.url}} />
```

### Migrating from prismic-dom

`<Prismic::Dom/>` replaces [`prismic-dom`](https://github.com/prismicio/prismic-dom) , please see [this blog post](https://medium.com/qonto-way/introducing-ember-prismic-dom-c362647037d7) for more information.

In place of:

```js
import Component from "@glimmer/component";
import PrismicDOM from "prismic-dom";

export default class MyComponent extends Component {
  get html() {
    return PrismicDOM.RichText.asHtml(this.args.myPrismicDoc.data.myRichText);
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

## TypeScript usage

Each component has proper [Glint](https://github.com/typed-ember/glint) types, which allow you to get strict type checking in your templates when using TypeScript.

Unless you are using [strict mode](http://emberjs.github.io/rfcs/0496-handlebars-strict-mode.html) templates (via [first class component templates](http://emberjs.github.io/rfcs/0779-first-class-component-templates.html)),
you need to import the addon's Glint template registry entries as described in the [Using Addons](https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons#using-glint-enabled-addons) documentation:

```ts
// e.g. types/glint.d.ts
import "@glint/environment-ember-loose";
import type PrismicDomRegistry from "ember-prismic-dom/template-registry";

declare module "@glint/environment-ember-loose/registry" {
  export default interface Registry
    extends PrismicDomRegistry /* other addon registries */ {
    // local entries
  }
}
```

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
