/* global WebImporter */
export default function parse(element, { document }) {
  // Header row, matching exactly the block name
  const headerRow = ['Hero (hero18)'];

  // Second row: background image cell (none in this case)
  const backgroundRow = [''];

  // Third row: collect heading, subheading, and CTAs
  // Find the grid layout containing the two blocks
  const grid = element.querySelector('.w-layout-grid');
  let contentElements = [];
  if (grid) {
    // Get the text block (headline/subheading)
    const textDiv = grid.querySelector('div h2')?.parentElement;
    if (textDiv) {
      contentElements.push(textDiv);
    }
    // Get the button group
    const buttonDiv = grid.querySelector('.button-group');
    if (buttonDiv) {
      contentElements.push(buttonDiv);
    }
  }

  // If no content found, preserve structure
  if (contentElements.length === 0) {
    contentElements = [''];
  }

  const contentRow = [contentElements];

  // Build the block table
  const cells = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
