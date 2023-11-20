import type PrismicDom from './components/prismic/dom';
import type PrismicElement from './components/prismic/element';
import type PrismicImage from './components/prismic/image';

export default interface Registry {
  'Prismic::Dom': typeof PrismicDom;
  'Prismic::Element': typeof PrismicElement;
  'Prismic::Image': typeof PrismicImage;
}
