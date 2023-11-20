import '@glint/environment-ember-loose';
import 'ember-source/types';
import 'ember-source/types/preview';

import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type { EmbroiderUtilRegistry } from '@embroider/util';
import type TemplatesRegistry from '../template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmbroiderUtilRegistry,
      EmberElementHelperRegistry,
      TemplatesRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}
