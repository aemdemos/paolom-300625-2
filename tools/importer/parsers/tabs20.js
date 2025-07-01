/* global WebImporter */
export default function parse(element, { document }) {
  // Find all tab links (direct children)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Prepare rows array: first row is a single cell header
  const rows = [['Tabs (tabs20)']];

  // For each tab: get its label text
  tabLinks.forEach((tabLink) => {
    let label = '';
    // Look for a div or span inside
    const labelEl = tabLink.querySelector('div,span');
    if (labelEl) {
      label = labelEl.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Tab content is not present in this element; leave second cell empty
    rows.push([label, '']);
  });

  // Fix: ensure the first header row has only one cell, but subsequent rows have two columns
  // This is supported by createTable: first row = header, rest = 2-column
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
