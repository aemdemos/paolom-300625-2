/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single cell
  const headerRow = ['Columns (columns6)'];

  // Find the main columns grid
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  const mainGridChildren = mainGrid ? Array.from(mainGrid.children) : [];
  const leftCol = mainGridChildren[0];
  const rightCol = mainGridChildren[1];

  // Row with content columns
  const contentRow = [leftCol, rightCol];

  // Find the grid of images (next row)
  const imagesGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let images = [];
  if (imagesGrid) {
    images = Array.from(imagesGrid.querySelectorAll('img'));
  }
  // Ensure two columns even if some images are missing
  const imagesRow = [images[0] || '', images[1] || ''];

  // Compose the cells: header is a single cell, subsequent rows are two columns
  const cells = [headerRow, contentRow, imagesRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
