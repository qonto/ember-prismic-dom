import templateOnlyComponent from '@ember/component/template-only';

export interface HyperlinkSignature {
  Element: HTMLAnchorElement;
  // The `node` argument should be a TreeNode, but that type is not exported
  // from the package.
  // https://github.com/prismicio/prismic-richtext/blob/495456d843ef79153ab9de87cc76b1cc940f6aec/src/types.ts#L136
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Args: { node: any };
  Blocks: {
    default: [];
  };
}

const Hyperlink = templateOnlyComponent<HyperlinkSignature>();

export default Hyperlink;
