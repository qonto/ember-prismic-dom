import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';

import { hbs } from 'ember-cli-htmlbars';

import cleanHtml from '../../../helpers/clean-html';

module('Integration | Component | prismic/element', function (hooks) {
  setupRenderingTest(hooks);

  module('single elements', function () {
    test('figure - unknown type call onUnknownTag with node', async function (assert) {
      assert.expect(2);
      this.node = {
        type: 'figure',
        element: {
          type: 'figure',
          text: 'Qonto The all-in-one business account',
          spans: [],
        },
      };
      this.onUnknownTag = (node) => {
        assert.deepEqual(node, this.node);
      };
      await render(
        hbs`<Prismic::Element @node={{this.node}} @onUnknownTag={{this.onUnknownTag}} />`
      );
      assert.equal(cleanHtml(this), '<!---->', 'not displayed');
    });

    test('em', async function (assert) {
      this.node = {
        type: 'em',
        element: {
          type: 'em',
          text: 'Qonto The all-in-one business account',
          spans: [],
        },
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(
        cleanHtml(this),
        '<em>Qonto The all-in-one business account</em>'
      );
    });

    test('heading', async function (assert) {
      this.node = {
        type: 'heading1',
        element: {
          type: 'heading1',
          text: 'Qonto The all-in-one business account',
          spans: [],
        },
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(
        cleanHtml(this),
        '<h1>Qonto The all-in-one business account</h1>'
      );
    });

    test('hyperlink', async function (assert) {
      this.node = {
        type: 'hyperlink',
        element: {
          start: 0,
          end: 7,
          type: 'hyperlink',
          data: { link_type: 'Web', url: 'https://example.org' },
        },
        children: [
          {
            type: 'span',
            element: { type: 'span', start: 0, end: 7, text: 'example' },
            children: [],
            start: 0,
            end: 7,
            text: 'example',
          },
        ],
        start: 0,
        end: 7,
        text: 'example',
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(
        cleanHtml(this),
        '<a href="https://example.org" rel="noreferrer noopener" target="_blank">example</a>'
      );
    });

    test('image', async function (assert) {
      this.node = {
        type: 'image',
        element: {
          alt: 'Qonto The all-in-one business account',
          copyright: 'qonto',
          width: '500',
          height: '400',
          type: 'image',
          spans: [],
          url: '/assets/img/connect/slack.png',
        },
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(
        cleanHtml(this),
        '<img alt="Qonto The all-in-one business account" copyright="qonto" src="/assets/img/connect/slack.png" width="500" height="400">'
      );
    });

    test('paragraph', async function (assert) {
      this.node = {
        type: 'paragraph',
        element: {
          type: 'paragraph',
          text: 'Qonto The all-in-one business account',
          spans: [],
        },
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(
        cleanHtml(this),
        '<p>Qonto The all-in-one business account</p>'
      );
    });

    test('span', async function (assert) {
      this.node = {
        type: 'span',
        element: {
          type: 'span',
          text: 'Qonto The all-in-one business account',
          spans: [],
        },
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(cleanHtml(this), 'Qonto The all-in-one business account');
    });

    test('preformatted', async function (assert) {
      this.node = {
        type: 'preformatted',
        element: {
          type: 'performatted',
          text: 'Qonto The all-in-one business account',
          spans: [],
        },
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(
        cleanHtml(this),
        '<pre>Qonto The all-in-one business account</pre>'
      );
    });

    test('strong', async function (assert) {
      this.node = {
        type: 'strong',
        element: {
          type: 'strong',
          text: 'Qonto The all-in-one business account',
          spans: [],
        },
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(
        cleanHtml(this),
        '<strong>Qonto The all-in-one business account</strong>'
      );
    });

    test('label', async function (assert) {
      this.node = {
        type: 'label',
        element: {
          type: 'label',
          text: 'Qonto The all-in-one business account',
          spans: [],
        },
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(
        cleanHtml(this),
        '<label>Qonto The all-in-one business account</label>'
      );
    });
  });

  module('complex combinations', function () {
    test('list', async function (assert) {
      this.node = {
        type: 'group-list-item',
        element: { type: 'group-list-item', spans: [], text: '' },
        children: [
          {
            type: 'list-item',
            element: {
              type: 'list-item',
              text: 'one',
              spans: [],
            },
          },
          {
            type: 'list-item',
            element: {
              type: 'list-item',
              text: 'two',
              spans: [],
            },
          },
        ],
      };
      await render(hbs`<Prismic::Element @node={{this.node}} />`);
      assert.equal(cleanHtml(this), '<ul><li>one</li><li>two</li></ul>');
    });

    test('it renders', async function (assert) {
      this.node = {
        type: 'paragraph',
        element: {
          type: 'paragraph',
          text: 'This is some text with overlappings spans and here',
          spans: [
            { start: 23, end: 31, type: 'strong' },
            { start: 29, end: 35, type: 'em' },
          ],
        },
        children: [
          {
            type: 'span',
            element: {
              type: 'span',
              start: 0,
              end: 23,
              text: 'This is some text with ',
            },
            children: [],
            start: 0,
            end: 23,
            text: 'This is some text with ',
          },
          {
            type: 'strong',
            element: { start: 23, end: 31, type: 'strong' },
            children: [
              {
                type: 'span',
                element: { type: 'span', start: 23, end: 29, text: 'overla' },
                children: [],
                start: 23,
                end: 29,
                text: 'overla',
              },
            ],
            start: 23,
            end: 29,
            text: 'overla',
          },
          {
            type: 'em',
            element: { start: 29, end: 35, type: 'em' },
            children: [
              {
                type: 'strong',
                element: { start: 23, end: 31, type: 'strong' },
                children: [
                  {
                    type: 'span',
                    element: { type: 'span', start: 29, end: 31, text: 'pp' },
                    children: [],
                    start: 29,
                    end: 31,
                    text: 'pp',
                  },
                ],
                start: 29,
                end: 31,
                text: 'pp',
              },
              {
                type: 'span',
                element: { type: 'span', start: 31, end: 35, text: 'ings' },
                children: [],
                start: 31,
                end: 35,
                text: 'ings',
              },
            ],
            start: 29,
            end: 35,
            text: 'ppings',
          },
          {
            type: 'span',
            element: {
              type: 'span',
              start: 35,
              end: 50,
              text: ' spans and here',
            },
            children: [],
            start: 35,
            end: 50,
            text: ' spans and here',
          },
        ],
      };

      await render(hbs`<Prismic::Element @node={{this.node}} />`);

      assert.equal(
        cleanHtml(this),
        '<p>This is some text with <strong>overla</strong><em><strong>pp</strong>ings</em> spans and here</p>'
      );
    });

    test('it renders links with overlapping styles', async function (assert) {
      this.node = {
        type: 'paragraph',
        element: {
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
        children: [
          {
            type: 'em',
            element: { start: 0, end: 4, type: 'em' },
            children: [
              {
                type: 'span',
                element: { type: 'span', start: 0, end: 2, text: 'A ' },
                children: [],
                start: 0,
                end: 2,
                text: 'A ',
              },
            ],
            start: 0,
            end: 2,
            text: 'A ',
          },
          {
            type: 'hyperlink',
            element: {
              start: 2,
              end: 6,
              type: 'hyperlink',
              data: { link_type: 'Web', url: 'https://example.org' },
            },
            children: [
              {
                type: 'em',
                element: { start: 0, end: 4, type: 'em' },
                children: [
                  {
                    type: 'span',
                    element: { type: 'span', start: 2, end: 4, text: 'li' },
                    children: [],
                    start: 2,
                    end: 4,
                    text: 'li',
                  },
                  {
                    type: 'strong',
                    element: { start: 4, end: 9, type: 'strong' },
                    children: [
                      {
                        type: 'span',
                        element: { type: 'span', start: 4, end: 4, text: '' },
                        children: [],
                        start: 4,
                        end: 4,
                        text: '',
                      },
                    ],
                    start: 4,
                    end: 4,
                    text: '',
                  },
                ],
                start: 2,
                end: 4,
                text: 'li',
              },
              {
                type: 'strong',
                element: { start: 4, end: 9, type: 'strong' },
                children: [
                  {
                    type: 'span',
                    element: { type: 'span', start: 4, end: 6, text: 'nk' },
                    children: [],
                    start: 4,
                    end: 6,
                    text: 'nk',
                  },
                ],
                start: 4,
                end: 6,
                text: 'nk',
              },
            ],
            start: 2,
            end: 6,
            text: 'link',
          },
          {
            type: 'strong',
            element: { start: 4, end: 9, type: 'strong' },
            children: [
              {
                type: 'span',
                element: { type: 'span', start: 6, end: 9, text: ' wi' },
                children: [],
                start: 6,
                end: 9,
                text: ' wi',
              },
            ],
            start: 6,
            end: 9,
            text: ' wi',
          },
          {
            type: 'span',
            element: { type: 'span', start: 9, end: 19, text: 'th overlap' },
            children: [],
            start: 9,
            end: 19,
            text: 'th overlap',
          },
        ],
      };

      await render(hbs`<Prismic::Element @node={{this.node}} />`);

      assert.equal(
        cleanHtml(this),
        '<p><em>A </em><a href="https://example.org" rel="noreferrer noopener" target="_blank"><em>li<strong></strong></em><strong>nk</strong></a><strong> wi</strong>th overlap</p>'
      );
    });
  });
});
