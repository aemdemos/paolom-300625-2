/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches exactly as required (block name and variant)
  const headerRow = ['Cards (cards3)'];
  // Get all direct card links
  const cardLinks = element.querySelectorAll(':scope > a.card-link');
  const rows = [];

  cardLinks.forEach((card) => {
    // First cell: the image (mandatory)
    const img = card.querySelector('img.card-image');
    // Second cell: text content
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const textContent = [];
    if (textContainer) {
      // Tag (if present)
      const tag = textContainer.querySelector('.tag');
      if (tag) textContent.push(tag);
      // Title (heading, if present)
      const heading = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) textContent.push(heading);
      // Description (paragraph, if present)
      const desc = textContainer.querySelector('p');
      if (desc) textContent.push(desc);
    }
    // Both image and at least one text content must be present for a card row
    if (img && textContent.length) {
      rows.push([
        img,
        textContent.length === 1 ? textContent[0] : textContent
      ]);
    }
  });

  // Only create the table if there is at least one card
  if (rows.length) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ...rows
    ], document);
    element.replaceWith(table);
  }
}
