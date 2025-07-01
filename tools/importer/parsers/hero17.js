/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Get the background image ---
  // Find the first descendant <img> that looks like a background image
  let backgroundImg = null;
  const imgContainers = element.querySelectorAll('img');
  for (const img of imgContainers) {
    // Heuristic: background image has 'cover-image' class or is inside parallax/hero wrapper
    if (
      img.classList.contains('cover-image') ||
      img.closest('.ix-parallax-scale-out-hero')
    ) {
      backgroundImg = img;
      break;
    }
  }

  // --- 2. Get the heading, subheading, and CTA(s) ---
  let contentCell = [];
  // The text content is typically within the .container
  const contentContainer = element.querySelector('.container');
  if (contentContainer) {
    // Get all headings (h1–h6) in order
    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length) {
      contentCell.push(...headings);
    }
    // Find any button groups or CTAs
    const buttonGroups = contentContainer.querySelectorAll('.button-group');
    for (const btnGroup of buttonGroups) {
      contentCell.push(btnGroup);
    }
    // Add any loose links/buttons that are not inside a .button-group
    const looseButtons = Array.from(contentContainer.querySelectorAll('a.button')).filter(
      a => !a.closest('.button-group')
    );
    if (looseButtons.length) {
      contentCell.push(...looseButtons);
    }
  }

  // Handle empty cases
  if (!backgroundImg) backgroundImg = '';
  if (contentCell.length === 0) contentCell = [''];

  // --- Build block table ---
  const headerRow = ['Hero (hero17)'];
  const rows = [
    headerRow,
    [backgroundImg],
    [contentCell]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
