import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import type { TestContext as TestContextBase } from '@ember/test-helpers';
import type { PrismicDomArgs } from 'ember-prismic-dom/components/prismic/dom';
import { hbs } from 'ember-cli-htmlbars';

import GroupListItem, {
  type GroupListItemSignature,
} from 'test-app/components/group-list-item';
import Hyperlink, {
  type HyperlinkSignature,
} from 'test-app/components/hyperlink';
import ListItem, {
  type ListItemSignature,
} from 'test-app/components/list-item';
import SuperCustom from 'test-app/components/super-custom';

import cleanHtml from 'test-app/tests/helpers/clean-html';
import type { TemplateOnlyComponent } from '@ember/component/template-only';

interface TestContext extends TestContextBase {
  element: HTMLElement;
  nodes: PrismicDomArgs['nodes'];
  groupListItem: TemplateOnlyComponent<GroupListItemSignature>;
  hyperlink: TemplateOnlyComponent<HyperlinkSignature>;
  listItem: TemplateOnlyComponent<ListItemSignature> | undefined;
}

module('Integration | Component | prismic/dom', function (hooks) {
  setupRenderingTest(hooks);

  module('single elements', function () {
    test('renders string', async function (this: TestContext, assert) {
      await render<TestContext>(hbs`<Prismic::Dom @nodes='some text' />`);
      assert.strictEqual(cleanHtml(this), '<div>some text</div>');
    });
  });

  module('custom elements', function () {
    test('hyperlink', async function (this: TestContext, assert) {
      this.nodes = [
        {
          type: 'paragraph',
          text: 'A link to somewhere',
          spans: [
            {
              start: 2,
              end: 6,
              type: 'hyperlink',
              data: { link_type: 'Web', url: 'https://example.org' },
            },
          ],
        },
      ];

      this.hyperlink = Hyperlink;

      await render<TestContext>(
        hbs`<Prismic::Dom @nodes={{this.nodes}} @hyperlink={{this.hyperlink}} />`,
      );

      assert.strictEqual(
        cleanHtml(this),
        '<div><p>A <a href="https://example.org">link</a> to somewhere</p></div>',
      );
    });

    test('handle passing a custom component as a string', async function (this: TestContext, assert) {
      this.owner.register('component:super-custom', SuperCustom);
      this.nodes = [
        {
          type: 'paragraph',
          text: 'A fancy component',
          spans: [
            {
              start: 2,
              end: 7,
              type: 'strong',
            },
          ],
        },
      ];

      await render<TestContext>(
        hbs`<Prismic::Dom @nodes={{this.nodes}} @strong="super-custom" />`,
      );

      assert.strictEqual(
        cleanHtml(this),
        '<div><p>A <mark>fancy</mark> component</p></div>',
      );
    });

    test('list', async function (this: TestContext, assert) {
      this.nodes = [
        { type: 'list-item', text: 'one', spans: [] },
        { type: 'list-item', text: 'two', spans: [] },
      ];

      this.groupListItem = GroupListItem;
      this.listItem = undefined;

      await render<TestContext>(
        hbs`<Prismic::Dom @nodes={{this.nodes}} @group-list-item={{this.groupListItem}} @list-item={{this.listItem}}/>`,
      );

      assert.strictEqual(
        cleanHtml(this),
        '<div><ul><li>one</li><li>two</li> elephant</ul></div>',
      );

      this.set('listItem', ListItem);

      assert.strictEqual(
        cleanHtml(this),
        '<div><ul><li> one banana</li><li> two banana</li> elephant</ul></div>',
      );
    });
  });

  module('complex combinations', function () {
    test('list', async function (this: TestContext, assert) {
      this.nodes = [
        { type: 'o-list-item', text: 'one', spans: [] },
        { type: 'o-list-item', text: 'two', spans: [] },
      ];

      await render<TestContext>(hbs`<Prismic::Dom @nodes={{this.nodes}} />`);

      assert.strictEqual(
        cleanHtml(this),
        '<div><ol><li>one</li><li>two</li></ol></div>',
      );
    });

    test('it renders text with overlapping spans', async function (this: TestContext, assert) {
      this.nodes = [
        {
          type: 'paragraph',
          text: 'This is some text with overlappings spans and here',
          spans: [
            { start: 23, end: 31, type: 'strong' },
            { start: 29, end: 35, type: 'em' },
          ],
        },
      ];

      await render<TestContext>(hbs`<Prismic::Dom @nodes={{this.nodes}} />`);

      assert.strictEqual(
        cleanHtml(this),
        '<div><p>This is some text with <strong>overla<em>pp</em></strong><em>ings</em> spans and here</p></div>',
      );
    });

    test('it renders links with overlapping styles', async function (this: TestContext, assert) {
      this.nodes = [
        {
          type: 'paragraph',
          text: 'A link with overlap',
          spans: [
            { start: 0, end: 4, type: 'em' },
            {
              start: 2,
              end: 6,
              type: 'hyperlink',
              data: { link_type: 'Web', url: 'https://example.org' },
            },
            { start: 4, end: 9, type: 'strong' },
          ],
        },
      ];

      await render<TestContext>(hbs`<Prismic::Dom @nodes={{this.nodes}} />`);

      assert.strictEqual(
        cleanHtml(this),
        '<div><p><em>A <a href="https://example.org" rel="noreferrer noopener" target="_blank">li</a></em><a href="https://example.org" rel="noreferrer noopener" target="_blank"><strong>nk</strong></a><strong> wi</strong>th overlap</p></div>',
      );
    });
  });
});
