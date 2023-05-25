import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { setComponentTemplate } from '@ember/component';
import Component from '@glimmer/component';

import { hbs } from 'ember-cli-htmlbars';

import cleanHtml from '../../../helpers/clean-html';

module('Integration | Component | prismic/dom', function (hooks) {
  setupRenderingTest(hooks);

  module('single elements', function () {
    test('renders string', async function (assert) {
      await render(hbs`<Prismic::Dom @nodes='some text' />`);
      assert.strictEqual(cleanHtml(this), '<div>some text</div>');
    });
  });

  module('custom elements', function () {
    test('hyperlink', async function (assert) {
      class Hyperlink extends Component {}
      setComponentTemplate(
        hbs`<a href={{@node.element.data.url}}>{{yield}}</a>`,
        Hyperlink
      );

      this.hyperlink = Hyperlink;

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

      await render(
        hbs`<Prismic::Dom @nodes={{this.nodes}} @hyperlink={{this.hyperlink}} />`
      );
      assert.strictEqual(
        cleanHtml(this),
        '<div><p>A <a href="https://example.org">link</a> to somewhere</p></div>'
      );
    });

    test('handle passing a custom component as a string', async function (assert) {
      class SuperCustom extends Component {}
      setComponentTemplate(hbs`<mark>{{yield}}</mark>`, SuperCustom);

      this.nodes = [
        {
          type: 'paragraph',
          text: 'A fancy component',
          spans: [
            {
              start: 2,
              end: 7,
              type: 'super-custom',
            },
          ],
        },
      ];
      this.owner.register('component:super-custom', SuperCustom);

      await render(
        hbs`<Prismic::Dom @nodes={{this.nodes}} @super-custom="super-custom" />`
      );

      assert.strictEqual(
        cleanHtml(this),
        '<div><p>A <mark>fancy</mark> component</p></div>'
      );
    });

    test('list', async function (assert) {
      class GroupListItem extends Component {}
      class ListItem extends Component {}

      setComponentTemplate(hbs`<ul>{{~yield~}}elephant</ul>`, GroupListItem);
      setComponentTemplate(hbs`<li>{{~yield}} bananna</li>`, ListItem);

      this.nodes = [
        { type: 'list-item', text: 'one', spans: [] },
        { type: 'list-item', text: 'two', spans: [] },
      ];

      this.groupListItem = GroupListItem;
      this.listItem = '';

      await render(
        hbs`<Prismic::Dom @nodes={{this.nodes}} @group-list-item={{this.groupListItem}} @list-item={{this.listItem}}/>`
      );

      assert.strictEqual(
        cleanHtml(this),
        '<div><ul><li>one</li><li>two</li>elephant</ul></div>'
      );

      this.set('listItem', ListItem);

      assert.strictEqual(
        cleanHtml(this),
        '<div><ul><li>one bananna</li><li>two bananna</li>elephant</ul></div>'
      );
    });
  });

  module('complex combinations', function () {
    test('list', async function (assert) {
      this.nodes = [
        { type: 'o-list-item', text: 'one', spans: [] },
        { type: 'o-list-item', text: 'two', spans: [] },
      ];

      await render(hbs`<Prismic::Dom @nodes={{this.nodes}} />`);

      assert.strictEqual(
        cleanHtml(this),
        '<div><ol><li>one</li><li>two</li></ol></div>'
      );
    });

    test('it renders text with overlapping spans', async function (assert) {
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

      await render(hbs`<Prismic::Dom @nodes={{this.nodes}} />`);

      assert.strictEqual(
        cleanHtml(this),
        '<div><p>This is some text with <strong>overla</strong><em><strong>pp</strong>ings</em> spans and here</p></div>'
      );
    });

    test('it renders links with overlapping styles', async function (assert) {
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

      await render(hbs`<Prismic::Dom @nodes={{this.nodes}} />`);

      assert.strictEqual(
        cleanHtml(this),
        '<div><p><em>A </em><a href="https://example.org" rel="noreferrer noopener" target="_blank"><em>li<strong></strong></em><strong>nk</strong></a><strong> wi</strong>th overlap</p></div>'
      );
    });
  });
});
