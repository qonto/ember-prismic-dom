import Component from '@glimmer/component';

import { asTree } from '@prismicio/richtext';

export default class PrismicDomComponent extends Component {
  get tree() {
    return asTree(this.args.nodes || []);
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
