import type PrismicDom from './components/prismic/dom';

export default interface Registry {
  'Prismic::Dom': typeof PrismicDom;
}
