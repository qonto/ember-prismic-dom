import Component from '@glimmer/component';

import PrismicRichText from '@prismicio/richtext';

export default class PrismicDomComponent extends Component {
  get tree() {
    return PrismicRichText.asTree(this.args.nodes || []);
  }

  get isString() {
    return typeof this.args.nodes === 'string';
  }

  get target() {
    return this.args.node.element.data.value?.target || '_blank';
  }
}
