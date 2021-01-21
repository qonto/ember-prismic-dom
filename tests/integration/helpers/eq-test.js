import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | eq', function (hooks) {
  setupRenderingTest(hooks);

  test('it equals', async function (assert) {
    this.set('bankName', 'qonto');

    await render(hbs`{{#if (eq this.bankName 'qonto')}}Good{{else}}Bad{{/if}}`);

    assert.equal(this.element.textContent.trim(), 'Good');

    this.set('bankName', 'other bank');

    assert.equal(this.element.textContent.trim(), 'Bad');
  });
});
