/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header row as per the block name
  const headerRow = ['Cards (cards5)'];
  const rows = [];

  // Get all direct children (card containers)
  const cards = element.querySelectorAll(':scope > .utility-aspect-1x1');

  cards.forEach(card => {
    // For each card, get the <img> element
    const img = card.querySelector('img');
    // Place the existing image element in the first cell, second cell empty string (no text)
    rows.push([img, '']);
  });

  // Compose the final table structure
  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
