/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container with all columns
  const grid = element.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;
  
  // First column: logo + social
  const leftCol = columns[0];
  // Next columns: three menu lists grouped together in one div
  const rightCol = document.createElement('div');
  for (let i = 1; i < columns.length; i++) {
    rightCol.appendChild(columns[i]);
  }

  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCol, rightCol];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}