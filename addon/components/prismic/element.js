import Component from '@glimmer/component';

// https://github.com/prismicio/prismic-richtext/blob/5c0a5ea33beba21adead113b9513392371e28f0c/src/types.ts#L3
// https://github.com/prismicio/javascript-kit/blob/0b9ea35c720fdf82a9d76c4472f9423906244fb7/lib/fragments.js#L1346

const TAGS = Object.freeze({
  em: 'em',
  'group-list-item': 'ul',
  'group-o-list-item': 'ol',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
  'list-item': 'li',
  'o-list-item': 'li',
  paragraph: 'p',
  preformatted: 'pre',
  strong: 'strong',
});

export default class PrismicElementComponent extends Component {
  get tagName() {
    if (TAGS[this.args.node.type]) {
      return TAGS[this.args.node.type];
    }
    this.args.onUnknownTag?.(this.args.node);
    return null;
  }

  get target() {
    return this.args.node.element.data.value?.target || '_blank';
  }

  get isCustom() {
    return Boolean(this.componentName);
  }

  get componentName() {
    return this.args.componentNames?.[this.args.node.type];
  }
}
