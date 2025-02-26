document.addEventListener('DOMContentLoaded', function() {
    // Initialize Desmos calculator
    var elt = document.getElementById('calculator');
    var calculator = Desmos.GraphingCalculator(elt, {
        expressions: true,
        keypad: true,
        settingsMenu: true,
        expressionsTopbar: true
    });

    // Add a simple expression to test
    calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });

    // Define minimum sizes for each zoom level
    const zoomLevelSizes = [
        { width: 400, height: 600 }, // L0: Default zoom
        { width: 520, height: 490 }, // L1
        { width: 590, height: 500 }, // L2
        { width: 640, height: 530 }  // L3
    ];

    // Current zoom level (0-3)
    let currentZoomLevel = 0;
    const maxZoomLevel = 3;

    // Function to get drag area boundaries
    function getDragBoundaries() {
        var dragArea = document.querySelector('.drag-area-indicator');
        var rect = dragArea.getBoundingClientRect();
        
        return {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height
        };
    }

    // Function to ensure calculator stays within boundaries
    function ensureWithinBoundaries() {
        const boundaries = getDragBoundaries();
        const container = $("#calculator-container");
        const containerPos = container.position();
        const containerWidth = container.width();
        const containerHeight = container.height();
        
        // Calculate right and bottom edges of the calculator
        const rightEdge = containerPos.left + containerWidth;
        const bottomEdge = containerPos.top + containerHeight;
        
        // Check if calculator is outside boundaries and adjust if needed
        let newLeft = containerPos.left;
        let newTop = containerPos.top;
        
        // Adjust if too far right
        if (rightEdge > boundaries.right - 10) {
            newLeft = Math.max(boundaries.left + 10, boundaries.right - containerWidth - 10);
        }
        
        // Adjust if too far down
        if (bottomEdge > boundaries.bottom - 10) {
            newTop = Math.max(boundaries.top + 10, boundaries.bottom - containerHeight - 10);
        }
        
        // Apply new position if changed
        if (newLeft !== containerPos.left || newTop !== containerPos.top) {
            container.css({
                left: newLeft,
                top: newTop
            });
        }
    }

    // Function to apply minimum size based on current zoom level
    function applyMinimumSize() {
        const minSize = zoomLevelSizes[currentZoomLevel];
        const container = $("#calculator-container");
        
        // Get current size
        const currentWidth = container.width();
        const currentHeight = container.height();
        
        // Check if current size is smaller than minimum
        let needsResize = false;
        
        if (currentWidth < minSize.width) {
            container.width(minSize.width);
            needsResize = true;
        }
        
        if (currentHeight < minSize.height) {
            container.height(minSize.height);
            needsResize = true;
        }
        
        // If resized, update the calculator
        if (needsResize) {
            calculator.resize();
        }
        
        // Update resizable min dimensions
        try {
            container.resizable("option", "minWidth", minSize.width);
            container.resizable("option", "minHeight", minSize.height);
        } catch (e) {
            console.log("Resizable not initialized yet");
        }
        
        // Update CSS min-height and min-width
        container.css({
            minWidth: minSize.width + "px",
            minHeight: minSize.height + "px"
        });
        
        // Ensure calculator stays within boundaries after resize
        ensureWithinBoundaries();
    }

    // Make the calculator container draggable
    $(function() {
        $(".draggable").draggable({
            handle: ".handle",
            scroll: false,
            containment: '.drag-area-indicator',
            start: function(event, ui) {
                $(this).addClass("dragging");
            },
            stop: function(event, ui) {
                $(this).removeClass("dragging");
            }
        });
    });

    // Custom resize functionality
    $(function() {
        const $container = $("#calculator-container");
        const $handle = $(".resize-handle");
        let isResizing = false;
        let startX, startY, startWidth, startHeight;
        
        // Set initial minimum size based on current zoom level
        const initialMinSize = zoomLevelSizes[currentZoomLevel];
        $container.css({
            minWidth: initialMinSize.width + "px",
            minHeight: initialMinSize.height + "px"
        });
        
        // Mouse down on resize handle
        $handle.on("mousedown", function(e) {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = $container.width();
            startHeight = $container.height();
            $handle.addClass("resizing");
            
            // Prevent text selection during resize
            $("body").css("user-select", "none");
            
            e.preventDefault();
        });
        
        // Mouse move for resizing
        $(document).on("mousemove", function(e) {
            if (!isResizing) return;
            
            // Calculate new width and height
            let newWidth = startWidth + (e.clientX - startX);
            let newHeight = startHeight + (e.clientY - startY);
            
            // Apply minimum size constraints
            const minSize = zoomLevelSizes[currentZoomLevel];
            newWidth = Math.max(newWidth, minSize.width);
            newHeight = Math.max(newHeight, minSize.height);
            
            // Get drag area boundaries
            const boundaries = getDragBoundaries();
            const containerPos = $container.position();
            
            // Ensure we don't resize beyond the boundaries. idk why these numbers
            const maxWidth = boundaries.right - containerPos.left - 36;
            const maxHeight = boundaries.bottom - containerPos.top - 106;
            
            newWidth = Math.min(newWidth, maxWidth);
            newHeight = Math.min(newHeight, maxHeight);
            
            // Apply new size
            $container.width(newWidth);
            $container.height(newHeight);
            
            // Resize calculator
            calculator.resize();
        });
        
        // Mouse up to stop resizing
        $(document).on("mouseup", function() {
            if (isResizing) {
                isResizing = false;
                $handle.removeClass("resizing");
                $("body").css("user-select", "");
                
                // Ensure calculator stays within boundaries
                ensureWithinBoundaries();
            }
        });
    });
    
    // Update zoom level display
    function updateZoomLevelDisplay() {
        let levelText;
        switch(currentZoomLevel) {
            case 0:
                levelText = "100% (L0)";
                break;
            case 1:
                levelText = "125% (L1)";
                break;
            case 2:
                levelText = "150% (L2)";
                break;
            case 3:
                levelText = "200% (L3)";
                break;
            default:
                levelText = "Default (L0)";
        }
        document.getElementById('zoom-level').textContent = levelText;
    }

    // Apply zoom level class to body
    function applyZoomLevel() {
        // Remove all zoom level classes
        for (let i = 0; i <= maxZoomLevel; i++) {
            document.body.classList.remove(`TDS_PS_L${i}`);
        }
        
        // Add current zoom level class
        document.body.classList.add(`TDS_PS_L${currentZoomLevel}`);
        
        // Update display
        updateZoomLevelDisplay();
        
        // Get the default size for this zoom level
        const defaultSize = zoomLevelSizes[currentZoomLevel];
        const container = $("#calculator-container");
        
        // Get drag area boundaries
        const boundaries = getDragBoundaries();
        
        // Calculate position for lower right corner
        // The padding is 32px from the right and bottom edges
        const rightEdgePosition = boundaries.width - 17; // Right edge position accounting for padding
        const bottomEdgePosition = boundaries.height - 17; // Bottom edge position accounting for padding
        
        // Calculate the upper left position by subtracting the calculator dimensions
        const newLeft = rightEdgePosition - defaultSize.width;
        const newTop = bottomEdgePosition - defaultSize.height;
        
        // Reset size and position
        container.css({
            width: defaultSize.width + "px",
            height: defaultSize.height + "px",
            left: newLeft + "px",
            top: newTop + "px",
            minWidth: defaultSize.width + "px",
            minHeight: defaultSize.height + "px"
        });
        
        // Resize calculator
        calculator.resize();
    }

    // Zoom in button
    document.getElementById('zoom-in').addEventListener('click', function() {
        if (currentZoomLevel < maxZoomLevel) {
            currentZoomLevel++;
            applyZoomLevel();
        }
    });

    // Zoom out button
    document.getElementById('zoom-out').addEventListener('click', function() {
        if (currentZoomLevel > 0) {
            currentZoomLevel--;
            applyZoomLevel();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Resize calculator and ensure minimum size
        applyMinimumSize();
        calculator.resize();
        // Ensure calculator stays within boundaries
        ensureWithinBoundaries();
    });

    // Initialize with zoom level 0 and default size
    const initialSize = zoomLevelSizes[0];
    $("#calculator-container").width(initialSize.width).height(initialSize.height);
    applyZoomLevel();
}); 
