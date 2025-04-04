# Etch-a-Sketch Digital

This project recreates the classic Etch-a-Sketch drawing toy in a web browser.

## Features
- Grid-based drawing interface.
- Multiple drawing modes: Black, Random Color, and Darken.
- Adjustable grid size.
- Clear grid functionality.

## How to Use
1. Select a drawing mode by clicking one of the mode buttons.
2. Hover over the grid cells to draw.
3. Change the grid size with the "Grid Size" button.
4. Reset the grid using the "Clear" button.

## Technical Details
The application dynamically creates a grid of div elements that act as drawing cells. Each cell uses a custom data attribute (dataset) called "data-darkness" to track how many times it has been hovered over. This value is used in the "darken" mode to incrementally darken the cell. Event listeners on these cells handle the drawing logic based on the selected mode (Black, Random Color, or Darken).

For example, using the dataset property (i.e., cell.dataset.darkness) allows the script to easily read and update custom values without interfering with standard HTML attributes.
