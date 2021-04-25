function getTilePosition(pos, offset) {
    // Returns the position to the encapsulating tile. 
    // A click on position pos = {x:20, y= 37} returns {x:0,:32}
    let newX = pos.x - pos.x % TEXTURE_WIDTH
    let newY = pos.y - pos.y % TEXTURE_HEIGHT
    if (offset) {
        switch (offset) {
            case "left":
                newX -= TEXTURE_WIDTH / 2
                break;
            case "top":
                newY -= TEXTURE_HEIGHT / 2
                break
            case "right":
                newX += TEXTURE_WIDTH / 2
                break
            case "bottom":
                newY += TEXTURE_HEIGHT / 2
            default:
                break;
        }
    }
    return { x: newX, y: newY }
}

function getGameMatrixIndex(x, y) {
    // Returns the gameMatrix index from the x-y position
    let index = x / TEXTURE_WIDTH + y / TEXTURE_HEIGHT * MATRIX_WIDTH * globalScale
    return index
}
