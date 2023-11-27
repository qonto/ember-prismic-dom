import templateOnlyComponent from '@ember/component/template-only';

interface SuperCustomSignature {
  Element: HTMLElement;
  Blocks: {
    default: [];
  };
}

const SuperCustom = templateOnlyComponent<SuperCustomSignature>();

export default SuperCustom;
