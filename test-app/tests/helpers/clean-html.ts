export default function cleanHtml({
  element,
}: {
  element: HTMLElement;
}): string {
  const elementHelperIds = / id="[a-zA-Z0-9]*"/g;
  const emberViewClass = / class="ember-view"/g;
  const extraWhiteSpace = /\s{2,}/g;
  const spaceBetweenTags = />(\s+)</g;
  const spaceAroundContent = />(\s+)([^<]+)(\s+)</g;

  return element.innerHTML
    .replace(elementHelperIds, '')
    .replace(emberViewClass, '')
    .replace(extraWhiteSpace, ' ')
    .replace(spaceBetweenTags, '><')
    .replace(spaceAroundContent, '>$2<');
}
