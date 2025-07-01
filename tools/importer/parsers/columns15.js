/* global WebImporter */
export default function parse(element, { document }) {
  // The header row is a single column with the exact block name
  const headerRow = ['Columns (columns15)'];

  // Get all immediate children columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // The second row will have as many columns as there are children
  const contentRow = columns;

  // Build table: header is a single cell, next row is n columns
  const tableData = [
    headerRow,    // [ 'Columns (columns15)' ] (one cell)
    contentRow,   // [col1, col2, ...] (as many cells as columns)
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(table);
}
