import Component from '@glimmer/component';

import { asTree } from '@prismicio/richtext';

import type { ComponentLike } from '@glint/template';
import type { RTNode } from '@prismicio/types';
import type { Tree, TreeNode } from '../../unpublished-development-types';

export interface PrismicDomArgs {
  [key: string]:
    | ComponentLike
    | RTNode[]
    | string
    | ((node: TreeNode) => void)
    | undefined;
  nodes?: RTNode[] | string;
  onUnknownTag?: (node: TreeNode) => void;
}

export interface PrismicDomSignature {
  Element: HTMLDivElement;
  Args: PrismicDomArgs;
}

/**
 * A component that renders a rich text document from Prismic data.
 * @example
 * ```hbs
 * <Prismic::Dom @nodes={{@myPrismicDoc.data.myRichText}} />
 * ```
 */
export default class PrismicDom extends Component<PrismicDomSignature> {
  /**
   * Gets the tree representation of the rich text data.
   * @returns The tree representation of the rich text data.
   * @type {Tree}
   */
  get tree(): Tree {
    const nodes = (this.args.nodes || []) as RTNode[];

    return asTree(nodes);
  }

  /**
   * Checks if `nodes` is a string.
   * @returns A boolean indicating whether `nodes` is of type string.
   * @type {boolean}
   */
  get isString(): boolean {
    return typeof this.args.nodes === 'string';
  }

  /**
   * Gets the custom component mappings.
   * @returns An object that maps custom component names to their component definitions.
   * @type {Record<string, ComponentLike>}
   */
  get componentNames(): Record<string, ComponentLike> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { nodes, onUnknownTag, ...names } = this.args;

    return names as Record<string, ComponentLike>;
  }

  /**
   * Gets the string value of the `nodes` argument.
   * @returns The string value of the `nodes` argument.
   * @type {string}
   */
  get stringValue(): string {
    return this.args.nodes as string;
  }
}