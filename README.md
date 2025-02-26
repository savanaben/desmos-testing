# Desmos Calculator Testing

This is a simple setup for testing the Desmos graphing calculator with zoom functionality and a draggable/resizable window.

## Features

- Draggable calculator window with header and footer bars
- Resizable calculator window with minimum size constraints for each zoom level
- Resize handle in the bottom-right corner of the footer bar
- Zoom in/out functionality with 4 zoom levels (L0-L3)
- Simple test graph (y=x²)
- Calculator resets to the lower right corner when changing zoom levels
- Flexible layout that adapts to resizing

## How to Use

1. Open `index.html` in a web browser
2. Use the "Zoom In" and "Zoom Out" buttons to change the calculator size
   - When changing zoom levels, the calculator will reset to the lower right corner with the default size for that level
3. Drag the calculator window by clicking and dragging the header bar at the top
4. Resize the calculator window by dragging the resize handle in the bottom-right corner

## Zoom Levels and Default Sizes

- L0: 100% (Default)
  - Default size: 400px × 600px
- L1: 125% zoom
  - Default size: 520px × 490px
- L2: 150% zoom
  - Default size: 590px × 500px
- L3: 200% zoom
  - Default size: 640px × 530px

## Development

### Git Repository

This project is set up as a Git repository. To work with it:

```bash
# Clone the repository
git clone [repository-url]

# Make changes and commit them
git add .
git commit -m "Description of changes"

# Push changes to remote repository (if applicable)
git push origin master
```

### Project Structure

- `index.html`: Main HTML file
- `styles.css`: CSS styles for the page and calculator
- `script.js`: JavaScript for calculator initialization and functionality
- `.gitignore`: Specifies files that Git should ignore

## API Key

This setup uses a test API key for Desmos. For production use, you should obtain your own API key from Desmos.

## Browser Compatibility

This setup has been tested and works well in modern browsers:
- Chrome
- Firefox
- Edge

## License

This project is intended for educational and testing purposes. 
