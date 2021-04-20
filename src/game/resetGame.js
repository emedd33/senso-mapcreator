function resetGame(){
    app.view.width = WIDTH*globalScale
    app.view.height = HEIGHT*globalScale
    newGameMatrix = new GameMatrix(MATRIX_WIDTH*globalScale, MATRIX_HEIGHT*globalScale)
    newGameMatrix.printMatrix()
    interactionType = "moveObject";
    objectScale = 1;
    autodrawSurroundingTiles = true;
    gameState = {
        background: {},
        tiles: {},
        objects: {},
        gameMatrix: newGameMatrix
    }
    interactionType = "delete"
    
    let newCursorSprite = new PIXI.Sprite(PIXI.utils.TextureCache.cursor);
    newCursorSprite.scale.set(0.05)
    newCursorSprite.anchor.set(0,0.5)
    newCursorSprite.parentGroup = cursorGroup
    cursorContainer.addChild(newCursorSprite)
    cursorContainer.removeChild(cursorSprite)
    objectContainer.removeChildren()
    tileContainer.removeChildren()
    cursorSprite = newCursorSprite
    backgroundContainer.removeChildren()
    changeBackgroundTexture("gray")
   
}