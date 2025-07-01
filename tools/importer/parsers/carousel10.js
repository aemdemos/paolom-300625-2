/* global WebImporter */
export default function parse(element, { document }) {
  // Compose the table header: block name, matching the example exactly
  const headerRow = ['Carousel (carousel10)'];
  
  // Find the grid container holding the images
  let grid = element.querySelector('.w-layout-grid');
  if (!grid) grid = element;

  // Each direct child of the grid is a slide container
  const slideDivs = Array.from(grid.children);

  // For each slide, extract the image (no text content in this example)
  const rows = slideDivs.map((slideDiv) => {
    // Find the first img in this slideDiv
    const img = slideDiv.querySelector('img');
    if (!img) return null; // skip if missing
    return [img]; // 1 column per slide, just the image
  }).filter(Boolean);

  // Build the cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
