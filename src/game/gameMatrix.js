class GameMatrix{
    width;
    height;
    matrix;
    size;
    lastAddedIndex; 
    constructor(width, height){
        this.width = width
        this.height = height
        this.size = width*height
        this.matrix = new Array(width * height).fill({value:0, sprite:null});
    }
    getIndex(index){
        return this.matrix[index]
    }
    getValue(index){
        if(index>= 0 && index < this.size){
            return this.matrix[index].value
        }
    }
    updateByIndex(index, sprite, value){
        if (this.matrix[index].sprite){
            tileContainer.addChild(sprite)
            tileContainer.removeChild(this.matrix[index].sprite)
        }
        this.matrix[index] = {value:value, sprite:sprite}
    }
    cleanIndex(index){
        this.matrix[index] = {value:0, sprite:0}
    }
    printMatrix(){
        
        console.log("GAME MATRIX");
        let columnCounter = 0
        let rows = []
        let currentRow = []
     
        for (var i = 0; i < this.matrix.length; i++) { 
            currentRow.push(this.matrix[i].value)
            columnCounter++
            if (columnCounter >= this.width){
                rows.push(currentRow)
                currentRow = []
                columnCounter = 0
            }
            
        }
        console.table(rows)
    }
    getTopRightIndex(index){
        if ((index + 1) % this.width !== 0) {
            return index - this.width + 1
        }
    }
    getTopIndex(index){
        if(index){
            return index - this.width
        }
    }
    getTopLeftIndex(index){
        if (index % this.width !== 0) {
            return index - this.width - 1
        }
    }
    getLeftIndex(index){
        if (index % this.width !== 0) {
            return index - 1
        }
    }
    getRightIndex(index){
        let rightIndex;
        if ((index + 1) % this.width !== 0) {
            rightIndex = index + 1
        }
        return rightIndex
    }
    getBottomLeftIndex(index){
        if (index % this.width !== 0) {
            return index + this.width - 1
        }
    }
    getBottomIndex(index){
        if(index){
            return index + this.width
        }
    }
    getBottomRightIndex(index){
        if ((index + 1) % this.width !== 0) {
            return index + this.width + 1
        }
    }
}