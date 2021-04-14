function setupSidebar(backgroundSprite) {   
    document.getElementById("table_1-object-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw Table"
        interactionType = "drawObject"
        objectType = "table_1"
        let newCursorSprite = new PIXI.Sprite(textures.objects.table_1);
        newCursorSprite.scale.set(0.1)
        newCursorSprite.anchor.set(0.5)
        newCursorSprite.parentGroup = cursorGroup
       cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
    })
    document.getElementById("barrel_1-object-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw Barrel"
        interactionType = "drawObject"
        objectType = "barrel_1"
        let newCursorSprite = new PIXI.Sprite(textures.objects.barrel_1);
        newCursorSprite.scale.set(0.1)
        newCursorSprite.anchor.set(0.5)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite

    })
    document.getElementById("dungeon-tile-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw dungeon tile"
        interactionType = "drawTile"
        tileType = "dungeonTile"
        newCursorSprite = new PIXI.Sprite(textures.tiles.center);
        newCursorSprite.anchor.set(0.5)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
        
    })
     document.getElementById("change-to-move").addEventListener("click", function () {
         console.log("hei")
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Move object"
        interactionType = "moveObject"
        newCursorSprite = new PIXI.Sprite(textures.objects.cursor);
        newCursorSprite.scale.set(0.05)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
    })
}