/* global WebImporter */
export default function parse(element, { document }) {
  // Define the table header as specified
  const cells = [['Tabs (tabs13)']];

  // Each child <a> is a tab link; its label is in a child div
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  tabLinks.forEach((tabLink) => {
    // Label extraction: if a <div> exists, use its text, otherwise fallback to tabLink text
    const labelDiv = tabLink.querySelector('div');
    let labelContent = '';
    if (labelDiv) {
      // Use the element as is for semantic preservation (allows bold, span, etc. in label)
      labelContent = labelDiv;
    } else {
      labelContent = tabLink.textContent.trim();
    }
    // Tab content: not available in this markup (menu only)
    const contentCell = '';
    cells.push([labelContent, contentCell]);
  });

  // Create and replace with the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
