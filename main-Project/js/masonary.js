class MasonryGrid {
    constructor(containerSelector) {
      this.container = document.querySelector(containerSelector);
      this.items = this.container.querySelectorAll('.grid-item');
    }

    init() {
        window.addEventListener('load', () => this.setGridStyles());
        window.addEventListener('resize', () => this.setGridStyles());
    }

    setGridStyles() {
        const screenWidth = window.innerWidth;
        let columns = 1;
        let gridWidth = '90%';
    
        if (screenWidth > 600) {
          columns = 2;
        }
    
        if (screenWidth > 700) {
          columns = 3;
          gridWidth = '80%';
        }
    
        if (screenWidth > 900) {
          gridWidth = '70%';
        }
    
        this.container.style.width = gridWidth;
        this.container.style.position = 'relative';
        this.layoutItems(columns);
    }

    layoutItems(columns) {
        const spaceBetweenColumns = 35;
        const spaceBetweenRows = 16;
        const columnWidth = (this.container.clientWidth - (columns - 1) * spaceBetweenColumns) / columns; // Subtract margins between columns
        console.log(this.container.clientWidth);
        const columnHeights = new Array(columns).fill(0);
    
        this.items.forEach((item) => {
            const minHeight = Math.min(...columnHeights);
            const column = columnHeights.indexOf(minHeight);

            item.style.position = 'absolute';
            item.style.top = `${minHeight}px`;
            item.style.left = `${column * (columnWidth + spaceBetweenColumns)}px`; // Account for margins between columns
            item.style.width = `${columnWidth}px`;

            columnHeights[column] += item.offsetHeight + spaceBetweenRows; // Account for margins between items
            console.log(minHeight);

            if(minHeight == 0) {
                item.style.borderTop = 'none'; // To remove the border-top from the top first element in each column
            }

        });
    
        this.container.style.position = 'relative';
        this.container.style.height = `${Math.max(...columnHeights)}px`;
        this.container.style.width = `${columns * columnWidth + (columns - 1) * spaceBetweenColumns}px`; // Set the explicit width of the container
        this.container.style.opacity = 1;

    }
    
}