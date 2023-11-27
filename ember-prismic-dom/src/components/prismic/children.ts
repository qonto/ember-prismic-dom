import Component from '@glimmer/component';

import type { RTTextNodeBase } from '@prismicio/types';
import type {
  CustomComponentMap,
  TreeNode,
} from '../../unpublished-development-types';

interface PrismicChildrenArgs {
  node: TreeNode;
  componentNames?: CustomComponentMap;
  onUnknownTag?: (node: TreeNode) => void;
}

interface PrismicChildrenSignature {
  Element: HTMLDivElement;
  Args: PrismicChildrenArgs;
}

/**
 * A component that renders descendants in a tree of rich text nodes.
 * @example
 * ```hbs
 * <Prismic::Children @componentNames={{this.componentNames}} @node={{this.node}} @onUnknownTag={{this.onUnknownTag}} />
 * ```
 */
export default class PrismicChildren extends Component<PrismicChildrenSignature> {
  /**
   * Gets the node to render.
   * @returns The node to render.
   * @type {RTTextNodeBase}
   */
  get node(): RTTextNodeBase {
    return this.args.node.node as RTTextNodeBase;
  }
}
