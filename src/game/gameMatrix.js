class GameMatrix{
    width;
    height;
    matrix;
    size;
    maxXPos;
    constructor(width, height){
        if (width % 1 !== 0 || height % 1 !==0){
            width = Math.floor(width)
            height = Math.floor(height)
        }
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
    getIndexByPosition(x,y){
        return Math.floor(x / TEXTURE_WIDTH) + Math.floor(y/TEXTURE_HEIGHT)*this.width
    }
    getPositionByIndex(index){
        let x= (index%this.width)*TEXTURE_WIDTH
        let y = Math.floor(index/this.width)*TEXTURE_HEIGHT
        return {x:x, y:y}
        
    }
    
    updateByIndex(index, sprite, value){
        this.matrix[index] = {value:value, sprite:sprite}
    }
    cleanIndex(index){
        this.matrix[index] = {value:0, sprite:null}
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
        if(index !== undefined){
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
        if(index !== undefined){
            return index + this.width
        }
    }
    getBottomRightIndex(index){
        if ((index + 1) % this.width !== 0) {
            return index + this.width + 1
        }
    }
}