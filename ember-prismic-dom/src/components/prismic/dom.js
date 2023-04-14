import Component from '@glimmer/component';

import PrismicRichText from '@prismicio/richtext';

export default class PrismicDomComponent extends Component {
  get tree() {
    return PrismicRichText.asTree(this.args.nodes || []);
  }

  get isString() {
    return typeof this.args.nodes === 'string';
  }

  get componentNames() {
    let names = { ...this.args };
    delete names.nodes;
    delete names.onUnknownTag;
    return names;
  }
}
