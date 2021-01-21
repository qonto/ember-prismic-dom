import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';

import cleanHtml from '../../../helpers/clean-html';

module('Integration | Component | prismic/dom', function (hooks) {
  setupRenderingTest(hooks);

  module('single elements', function () {
    test('renders string', async function (assert) {
      await render(hbs`<Prismic::Dom @nodes='some text' />`);
      assert.equal(cleanHtml(this), '<div>some text</div>');
    });
  });

  module('complex combinations', function () {
    test('list', async function (assert) {
      this.nodes = [
        { type: 'o-list-item', text: 'one', spans: [] },
        { type: 'o-list-item', text: 'two', spans: [] },
      ];

      await render(hbs`<Prismic::Dom @nodes={{this.nodes}} />`);

      assert.equal(
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

      assert.equal(
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

      assert.equal(
        cleanHtml(this),
        '<div><p><em>A </em><a href="https://example.org" rel="noreferrer noopener" target="_blank"><em>li<strong></strong></em><strong>nk</strong></a><strong> wi</strong>th overlap</p></div>'
      );
    });
  });
});
