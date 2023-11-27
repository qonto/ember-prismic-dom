import templateOnlyComponent from '@ember/component/template-only';

export interface ListItemSignature {
  Element: HTMLUListElement;
  Blocks: {
    default: [];
  };
}

const ListItem = templateOnlyComponent<ListItemSignature>();

export default ListItem;
