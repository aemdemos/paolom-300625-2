/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid columns node
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (!columns.length) return;

  // Table header: a single cell
  const headerRow = ['Columns (columns21)'];
  // Columns row: single array with all columns as cells
  const columnsRow = columns;

  // Compose table in correct format: header, then a single row with all columns
  const tableData = [headerRow, columnsRow];

  // Create table and replace
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
