import '@glint/environment-ember-loose';
import type PrismicDomRegistry from 'ember-prismic-dom/template-registry';

import type GroupListItem from 'test-app/components/group-list-item';
import type Hyperlink from 'test-app/components/hyperlink';
import type ListItem from 'test-app/components/list-item';
import type SuperCustom from 'test-app/components/super-custom';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends PrismicDomRegistry {
    GroupListItem: typeof GroupListItem;
    Hyperlink: typeof Hyperlink;
    ListItem: typeof ListItem;
    SuperCustom: typeof SuperCustom;
  }
}
