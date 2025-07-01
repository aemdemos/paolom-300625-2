/* global WebImporter */
export default function parse(element, { document }) {
  // Table header, must match exactly
  const headerRow = ['Cards (cards11)'];
  const rows = [];

  // Get all card elements (direct children)
  const cardElements = element.querySelectorAll(':scope > div');

  cardElements.forEach(cardEl => {
    // First cell: The icon (svg inside .icon)
    const iconDiv = cardEl.querySelector(':scope > div .icon');
    let cell1 = '';
    if (iconDiv) {
      cell1 = iconDiv;
    }

    // Second cell: The paragraph
    const p = cardEl.querySelector(':scope > p');
    let cell2 = '';
    if (p) {
      cell2 = p;
    }

    rows.push([cell1, cell2]);
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}