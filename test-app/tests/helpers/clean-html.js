export default function cleanHtml({ element }) {
  let elementHelperIds = / id="[a-zA-Z0-9]*"/g;
  let emberViewClass = / class="ember-view"/g;
  let extraWhiteSpace = /\s{2,}/g;
  let spaceBetweenTags = />(\s+)</g;
  let spaceAroundContent = />(\s+)([^<]+)(\s+)</g;

  return element.innerHTML
    .replace(elementHelperIds, '')
    .replace(emberViewClass, '')
    .replace(extraWhiteSpace, ' ')
    .replace(spaceBetweenTags, '><')
    .replace(spaceAroundContent, '>$2<');
}
