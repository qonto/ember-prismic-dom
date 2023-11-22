import '@glint/environment-ember-loose';
import type PrismicDomRegistry from 'ember-prismic-dom/template-registry';

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends PrismicDomRegistry {}
}
