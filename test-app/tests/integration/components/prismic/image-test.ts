import { render } from '@ember/test-helpers';
import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import type { TestContext as TestContextBase } from '@ember/test-helpers';
import type { PrismicImageArgs } from 'ember-prismic-dom/components/prismic/image';

import cleanHtml from 'test-app/tests/helpers/clean-html';

interface TestContext extends PrismicImageArgs, TestContextBase {
  element: HTMLElement;
}

module('Integration | Component | prismic/image', function (hooks) {
  setupRenderingTest(hooks);

  test('image', async function (this: TestContext, assert) {
    this.node = {
      type: 'image',
      node: {
        alt: 'Qonto The all-in-one business account',
        copyright: 'qonto',
        width: '500',
        height: '400',
        type: 'image',
        spans: [],
        url: '/assets/img/connect/slack.png',
      },
    };

    await render<TestContext>(hbs`<Prismic::Image @node={{this.node}} />`);

    assert.strictEqual(
      cleanHtml(this),
      '<img alt="Qonto The all-in-one business account" copyright="qonto" src="/assets/img/connect/slack.png" width="500" height="400">',
    );
  });

  test('image with linkUrl', async function (this: TestContext, assert) {
    this.node = {
      type: 'image',
      node: {
        alt: 'Qonto The all-in-one business account',
        copyright: 'qonto',
        width: '500',
        height: '400',
        linkUrl: 'https://example.org',
        type: 'image',
        spans: [],
        url: '/assets/img/connect/slack.png',
      },
    };

    await render<TestContext>(hbs`<Prismic::Image @node={{this.node}} />`);

    assert.strictEqual(
      cleanHtml(this),
      '<a href="https://example.org" target="_blank" rel="noreferrer noopener"><img alt="Qonto The all-in-one business account" copyright="qonto" src="/assets/img/connect/slack.png" width="500" height="400"></a>',
    );
  });

  test('image with linkUrl and linkTarget', async function (this: TestContext, assert) {
    this.node = {
      type: 'image',
      node: {
        alt: 'Qonto The all-in-one business account',
        copyright: 'qonto',
        width: '500',
        height: '400',
        linkUrl: 'https://example.org',
        linkTarget: '_top',
        type: 'image',
        spans: [],
        url: '/assets/img/connect/slack.png',
      },
    };

    await render<TestContext>(hbs`<Prismic::Image @node={{this.node}} />`);

    assert.strictEqual(
      cleanHtml(this),
      '<a href="https://example.org" target="_top" rel="noreferrer noopener"><img alt="Qonto The all-in-one business account" copyright="qonto" src="/assets/img/connect/slack.png" width="500" height="400"></a>',
    );
  });
});
