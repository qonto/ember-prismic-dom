import Component from '@glimmer/component';

import type { ImageNode, TreeNode } from '../../unpublished-development-types';

export interface PrismicImageArgs {
  node: TreeNode;
}

export interface PrismicImageSignature {
  Element: HTMLElement;
  Args: PrismicImageArgs;
}

/**
 * A component that renders an image from Prismic data.
 * @example
 * ```hbs
 * <Prismic::Image @node={{this.node}} />
 * ```
 */
export default class PrismicImage extends Component<PrismicImageSignature> {
  /**
   * Gets the image node.
   * @returns The image node.
   * @type {ImageNode}
   */
  get node(): ImageNode {
    return this.args.node.node as ImageNode;
  }

  /**
   * A boolean indicating whether the image has a link.
   * @returns A boolean indicating whether the image has a link.
   * @type {boolean}
   */
  get hasLink(): boolean {
    return 'linkUrl' in this.node;
  }

  /**
   * Gets the target of the image link.
   * @returns The target of the image link, or `_blank`.
   */
  get linkTarget(): string {
    return this.node.linkTarget || '_blank';
  }
}
