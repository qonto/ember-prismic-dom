import Component from '@glimmer/component';

import type {
  CustomComponentMap,
  CustomComponentLike,
  TreeNode,
} from '../../unpublished-development-types';
import type { FilledLinkToWebField, RTLinkNode } from '@prismicio/types';

// https://github.com/prismicio/prismic-richtext/blob/5c0a5ea33beba21adead113b9513392371e28f0c/src/types.ts#L3
// https://github.com/prismicio/javascript-kit/blob/0b9ea35c720fdf82a9d76c4472f9423906244fb7/lib/fragments.js#L1346
const TAGS = Object.freeze({
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  heading4: 'h4',
  heading5: 'h5',
  heading6: 'h6',
  paragraph: 'p',
  preformatted: 'pre',
  strong: 'strong',
  label: 'label',
  em: 'em',
  'list-item': 'li',
  'o-list-item': 'li',
  'group-list-item': 'ul',
  'group-o-list-item': 'ol',
});

export interface PrismicElementArgs {
  node: TreeNode;
  componentNames?: CustomComponentMap;
  onUnknownTag?: (node: TreeNode) => void;
}

export interface PrismicElementSignature {
  Element: HTMLElement;
  Args: PrismicElementArgs;
}

/**
 * A component that renders a rich text element from Prismic data.
 * @example
 * ```hbs
 * <Prismic::Element @componentNames={{this.componentNames}} @node={{this.node}} @onUnknownTag={{this.onUnknownTag}} />
 * ```
 */
export default class PrismicElement extends Component<PrismicElementSignature> {
  /**
   * Gets the tag name of the element.
   * @returns The tag name of the element, or `null`.
   * @type {string | null}
   */
  get tagName(): string | null {
    const { node } = this.args;

    if (node.type in TAGS) {
      const type = node.type as keyof typeof TAGS;

      return TAGS[type];
    }

    this.args.onUnknownTag?.(node);

    return null;
  }

  /**
   * Gets the target of the hyperlink.
   * @returns The target of the hyperlink, or `_blank`.
   * @type {string}
   */
  get target(): string {
    const { node } = this.args;
    const link = node.node as RTLinkNode;
    const linkData = link.data as FilledLinkToWebField;

    return linkData.target || '_blank';
  }

  /**
   * Checks if the component is a custom component.
   * @returns A boolean indicating whether the component is a custom component.
   * @type {boolean}
   */
  get isCustom(): boolean {
    return Boolean(this.componentName);
  }

  /**
   * Gets the custom component to render.
   * @returns The component or component name to render, or `undefined` if there are no custom components.
   * @type {CustomComponentLike }
   */
  get componentName(): CustomComponentLike {
    const { componentNames, node } = this.args;

    return componentNames?.[node.type] as CustomComponentLike;
  }

  /**
   * Gets the node representing the hyperlink.
   * @returns The rich text node representing the hyperlink.
   * @type {RTLinkNode}
   */
  get hyperlinkNode(): RTLinkNode {
    return this.args.node.node as RTLinkNode;
  }

  /**
   * Checks if the component is an image.
   * @returns A boolean indicating whether the component is an image.
   * @type {boolean}
   */
  get isImage(): boolean {
    return this.args.node.type === 'image';
  }

  /**
   * Checks if the component is a span.
   * @returns A boolean indicating whether the component is a span.
   * @type {boolean}
   */
  get isSpan(): boolean {
    return this.args.node.type === 'span';
  }

  /**
   * Checks if the component is a hyperlink.
   * @returns A boolean indicating whether the component is a hyperlink.
   * @type {boolean}
   */
  get isHyperlink(): boolean {
    return this.args.node.type === 'hyperlink';
  }
}
