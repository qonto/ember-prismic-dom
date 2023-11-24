import templateOnlyComponent from '@ember/component/template-only';

export interface GroupListItemSignature {
  Element: HTMLUListElement;
  Blocks: {
    default: [];
  };
}

const GroupListItem = templateOnlyComponent<GroupListItemSignature>();

export default GroupListItem;
