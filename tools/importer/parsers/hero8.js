/* global WebImporter */
export default function parse(element, { document }) {
  // Find the first active tab pane, otherwise fallback to first tab-pane
  const tabPane = element.querySelector('.w-tab-pane.w--tab-active') || element.querySelector('.w-tab-pane');
  if (!tabPane) return;
  // Find the grid that contains both heading and image
  const grid = tabPane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the image element (if present)
  const image = grid.querySelector('img');
  // Collect all grid children except images
  const textEls = Array.from(grid.children).filter(el => !el.matches('img'));
  // If there are no non-image elements, fallback to empty string
  const textCell = textEls.length ? textEls : [''];

  // Compose table rows as per required structure
  const headerRow = ['Hero (hero8)'];
  const imageRow = [image || ''];
  const textRow = [textCell];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow
  ], document);

  element.replaceWith(table);
}
