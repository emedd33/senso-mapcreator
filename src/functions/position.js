function getTilePosition(pos) {
    // Returns the position to the encapsulating tile. 
    // A click on position pos = {x:20, y= 37} returns {x:0,:32}
    const newX = pos.x - pos.x % 32
    const newY = pos.y - pos.y % 32
    return { x: newX, y: newY } 
}

function getGameMatrixIndex(x, y) {
    // Returns the gameMatrix index from the x-y position
    let index = x / TEXTURE_WIDTH + y/TEXTURE_HEIGHT*MATRIX_WIDTH
    return index
}
