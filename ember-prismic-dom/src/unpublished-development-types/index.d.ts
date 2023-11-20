import '@glint/environment-ember-loose';
import 'ember-source/types';
import 'ember-source/types/preview';

import type {
  RTAnyNode,
  RTImageNode,
  RichTextNodeType,
} from '@prismicio/types';
import type EmberElementHelperRegistry from 'ember-element-helper/template-registry';
import type { EmbroiderUtilRegistry } from '@embroider/util';
import type TemplatesRegistry from '../template-registry';

export interface Tree {
  key: string;
  children: TreeNode[];
}

export interface TreeNode {
  key: string;
  type: (typeof RichTextNodeType)[keyof typeof RichTextNodeType];
  text?: string;
  node: RTAnyNode;
  children: TreeNode[];
}

export interface ImageNode extends RTImageNode {
  linkUrl?: string;
  linkTarget?: string;
  width?: number;
  height?: number;
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry
    extends EmbroiderUtilRegistry,
      EmberElementHelperRegistry,
      TemplatesRegistry {
    // Add any registry entries from other addons here that your addon itself uses (in non-strict mode templates)
    // See https://typed-ember.gitbook.io/glint/using-glint/ember/using-addons
  }
}
