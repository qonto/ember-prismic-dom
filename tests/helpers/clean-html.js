export default function cleanHtml({ element }) {
  let elementHelperIds = / id="[a-zA-Z0-9]*"/g;
  let emberViewClass = / class="ember-view"/g;

  return element.innerHTML
    .replace(elementHelperIds, '')
    .replace(emberViewClass, '');
}
