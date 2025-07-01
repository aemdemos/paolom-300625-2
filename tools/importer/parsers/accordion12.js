/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the table rows
  const cells = [['Accordion']]; // Header row, matches exactly the block name

  // Get all accordion items (children with class 'accordion')
  const accordionItems = element.querySelectorAll(':scope > .accordion');

  accordionItems.forEach((item) => {
    // Title: Find the first .w-dropdown-toggle > .paragraph-lg
    const toggle = item.querySelector('.w-dropdown-toggle');
    let titleCell = '';
    if (toggle) {
      const titleEl = toggle.querySelector('.paragraph-lg');
      if (titleEl) {
        titleCell = titleEl;
      }
    }
    // Content: Find nav.accordion-content and its .w-richtext (or fallback to nav)
    let contentCell = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      const rich = nav.querySelector('.w-richtext');
      if (rich) {
        contentCell = rich;
      } else {
        contentCell = nav;
      }
    }
    cells.push([titleCell, contentCell]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
