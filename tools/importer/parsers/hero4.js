/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header
  const headerRow = ['Hero (hero4)'];

  // Get all direct child divs of grid-layout (2 main columns)
  const gridLayout = element.querySelector('.w-layout-grid.grid-layout');
  let bgImg = null;
  let contentCellContent = [];
  if (gridLayout) {
    const mainDivs = gridLayout.querySelectorAll(':scope > div');
    // First main column: look for background image
    if (mainDivs[0]) {
      bgImg = mainDivs[0].querySelector('img');
    }
    // Second main column: content
    if (mainDivs[1]) {
      // There may be another grid inside
      const innerGrid = mainDivs[1].querySelector('.w-layout-grid');
      if (innerGrid) {
        // Title (h1)
        const title = innerGrid.querySelector('h1');
        if (title) contentCellContent.push(title);
        // Paragraph + button inside flex-vertical
        const flex = innerGrid.querySelector('.flex-vertical');
        if (flex) {
          // Paragraph
          const para = flex.querySelector('p');
          if (para) contentCellContent.push(para);
          // CTA button
          const button = flex.querySelector('a');
          if (button) contentCellContent.push(button);
        }
      }
    }
  }

  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCellContent]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
