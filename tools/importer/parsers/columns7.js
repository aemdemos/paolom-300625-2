/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Set up the header row precisely as in the example
  const headerRow = ['Columns (columns7)'];

  // 2. Locate the main grid of images (should be a grid with 9 images)
  const grid = element.querySelector('.grid-layout.desktop-3-column.utility-min-height-100dvh');
  let imageDivs = [];
  if (grid) {
    imageDivs = Array.from(grid.querySelectorAll(':scope > .utility-position-relative'));
  }
  // The images themselves
  const images = imageDivs.map(div => {
    const img = div.querySelector('img');
    return img ? img : null;
  }).filter(Boolean);

  // 3. Find the overlay content: headline, subheading, buttons
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  // Defensive: if not found, leave empty string so column exists
  const contentCell = contentContainer ? contentContainer : '';

  // 4. Compose the columns row (images in one cell, content in the other)
  //    Group the images as an array, so they appear as a grid (not as a string)
  //    Place the content cell (headline, subheading, buttons) in the second cell
  const secondRow = [images, contentCell];

  // 5. The block table (2 columns, 2 rows)
  const cells = [
    headerRow,
    secondRow
  ];

  // 6. Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
