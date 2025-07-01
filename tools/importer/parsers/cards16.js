/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example, single column, exact text
  const headerRow = ['Cards (cards16)'];
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [headerRow];

  cards.forEach(card => {
    // The card structure is: <a><div><img/><div>Content</div></div></a>
    const grid = card.querySelector('div');
    if (!grid) return;
    const gridChildren = Array.from(grid.children);
    // Find the first image and first div after it
    let img = null;
    let textDiv = null;
    for (let i = 0; i < gridChildren.length; i++) {
      if (!img && gridChildren[i].tagName === 'IMG') {
        img = gridChildren[i];
        // textDiv is the next sibling that's a DIV
        for (let j = i + 1; j < gridChildren.length; j++) {
          if (gridChildren[j].tagName === 'DIV') {
            textDiv = gridChildren[j];
            break;
          }
        }
        break;
      }
    }
    if (!img || !textDiv) return;

    // Reference the entire textDiv for the text cell, to preserve all content & formatting
    rows.push([img, textDiv]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
