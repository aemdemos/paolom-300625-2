/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as in the example
  const headerRow = ['Carousel (carousel9)'];

  // Each slide is a direct child .utility-aspect-1x1 of the element
  const slides = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));

  const rows = slides.map(slide => {
    // Expecting an <img> inside each .utility-aspect-1x1
    const img = slide.querySelector('img');
    // If for some reason no image, insert empty string
    return [img || '', '']; // image in first cell, second cell is empty (no text in source)
  });

  // Compose the block table
  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  // Replace the original element
  element.replaceWith(block);
}
