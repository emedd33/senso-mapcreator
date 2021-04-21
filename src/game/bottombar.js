function setupBottomBar(backgroundSprite){

    document.getElementById("move-object-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        interactionType = "moveObject"
        newCursorSprite = new PIXI.Sprite(textures.objects.cursor);
        newCursorSprite.scale.set(0.05)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
    })
    document.getElementById("draw-tile-button").addEventListener("click", function () {
        graphics.clear()
        selectedObject = undefined
        backgroundSprite.interactive = true
        interactionType = "drawTile"
        tileType = "dungeonTile"
        objectScale=1
        document.getElementById("object-scaler").value = 50
        newCursorSprite = createSprite(textures.objects.shovel, 0.05,0.5);
        console.log(textures.tiles.shovel)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
        
    })
     document.getElementById("remove-tile-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        interactionType = "removeTile"
        let newCursorSprite = new PIXI.Sprite(PIXI.utils.TextureCache.bulldozer);
        newCursorSprite.scale.set(0.05)
        newCursorSprite.anchor.set(0,0.5)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
    })
     document.getElementById("delete-object-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        interactionType = "deleteObject"
        let newCursorSprite = new PIXI.Sprite(PIXI.utils.TextureCache.delete);
        newCursorSprite.scale.set(0.05)
        newCursorSprite.anchor.set(0,0.5)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
    })
    
    
    document.getElementById("download-game-button").addEventListener("click", function () {
        cursorContainer.removeChild(cursorSprite)
        app.renderer.extract.canvas(app.stage).toBlob(function(blob) {
            var a = document.createElement('a');
           document.body.append(a);
           a.download = "new map";
           a.href = URL.createObjectURL(blob);
           a.click();
           a.remove();
           backgroundSprite.interactive = true
           interactionType = "moveObject"
           newCursorSprite = createSprite(textures.objects.cursor, 0.05,0);
           newCursorSprite.parentGroup = cursorGroup
           cursorContainer.addChild(newCursorSprite)
           cursorContainer.removeChild(cursorSprite)
           cursorSprite = newCursorSprite
       }, 'image/png');
   })
}
