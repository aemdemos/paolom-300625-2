/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab pane (or fallback to first tab pane)
  let activeTab = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activeTab) {
    activeTab = element.querySelector('.w-tab-pane') || element;
  }

  // Find the main grid layout (or fallback to activeTab directly)
  let grid = activeTab.querySelector('.w-layout-grid') || activeTab;

  // Get the image (background/decorative)
  const img = grid.querySelector('img');

  // Gather ALL non-img block-level content (headings, paragraphs, divs, lists, etc.) in order
  const textElements = [];
  Array.from(grid.children).forEach((child) => {
    if (child === img) return;
    if (/^H[1-6]$/.test(child.tagName) || child.tagName === 'P' || child.tagName === 'DIV' || child.tagName === 'UL' || child.tagName === 'OL' || child.tagName === 'SECTION') {
      // If inner content (eg. a div) has only images, skip it, otherwise add
      if (child.querySelectorAll('img').length === child.childElementCount) return;
      textElements.push(child);
    }
  });
  // Fallback: if nothing found, include any non-img child
  if (textElements.length === 0) {
    Array.from(grid.children).forEach(child => {
      if (child !== img) textElements.push(child);
    });
  }

  // Table rows: header, image, text (all in one block, preserving order and structure)
  const headerRow = ['Hero (hero19)'];
  const imageRow = [img ? img : ''];
  const textRow = [textElements.length === 1 ? textElements[0] : (textElements.length > 1 ? textElements : '')];

  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
