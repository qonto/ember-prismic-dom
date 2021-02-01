export default function cleanHtml({ element }) {
  let elementHelperIds = / id="[a-zA-Z0-9]*"/g;
  let emberViewClass = / class="ember-view"/g;
  let emptyComponent = '<!---->';

  return element.innerHTML
    .replace(elementHelperIds, '')
    .replace(emberViewClass, '')
    .replace(emptyComponent, '');
}
