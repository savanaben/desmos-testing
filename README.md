# Desmos Calculator Testing

This is a simple setup for testing the Desmos graphing calculator with zoom functionality and a draggable/resizable window.

## Features

- Draggable calculator window
- Resizable calculator window with minimum size constraints for each zoom level
- Zoom in/out functionality with 4 zoom levels (L0-L3)
- Simple test graph (y=x²)
- Automatic repositioning to prevent calculator from going out of bounds when zooming

## How to Use

1. Open `index.html` in a web browser
2. Use the "Zoom In" and "Zoom Out" buttons to change the calculator size
3. Drag the calculator window by clicking and dragging the handle at the top
4. Resize the calculator window by dragging the handle at the bottom-right corner

## Zoom Levels and Minimum Sizes

- L0: Normal size (default)
  - Default size: 400px × 500px
  - Minimum size: 400px × 500px
- L1: 1.5x zoom
  - Minimum size: 520px × 420px
- L2: 2x zoom
  - Minimum size: 590px × 438px
- L3: 2.5x zoom
  - Minimum size: 640px × 490px

## API Key

This setup uses a test API key for Desmos. For production use, you should obtain your own API key from Desmos.

## Files

- `index.html`: Main HTML file
- `styles.css`: CSS styles for the page and calculator
- `script.js`: JavaScript for calculator initialization and functionality 
