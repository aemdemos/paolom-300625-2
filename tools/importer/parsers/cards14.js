/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as per block spec
  const headerRow = ['Cards (cards14)'];

  // Get all card anchor elements in the grid
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');

  const rows = [];
  cards.forEach((card) => {
    // FIRST CELL: Image (mandatory)
    let img = card.querySelector('img');
    const imageCell = img || '';

    // SECOND CELL: Text content (mandatory)
    // Compose tag, date, and title
    const frag = document.createElement('div');

    // Try to get tag/date row
    const tagDateDiv = card.querySelector('.flex-horizontal');
    if (tagDateDiv) {
      // Use original structure for resilience and style retention
      frag.appendChild(tagDateDiv);
    }
    // Add the heading (title)
    const h3 = card.querySelector('h3');
    if (h3) {
      frag.appendChild(h3);
    }

    // Use fragment if it has content; otherwise, empty string
    rows.push([
      imageCell,
      frag.childNodes.length ? frag : ''
    ]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
