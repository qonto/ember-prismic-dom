import type PrismicDom from './components/prismic/dom';
import type PrismicElement from './components/prismic/element';

export default interface Registry {
  'Prismic::Dom': typeof PrismicDom;
  'Prismic::Element': typeof PrismicElement;
}
