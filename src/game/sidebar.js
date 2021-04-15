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
        newCursorSprite.scale.set(0.2)
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
    document.getElementById("save-game-button").addEventListener("click",function(){
        if (authUser){
            const filename = document.getElementById("save-game-filename").value.toString()
            if (filename){
                let saveGameState = gameState
                console.log(JSON.stringify(saveGameState))
                document.getElementById("save-game-spinner").style.display="block"
                document.getElementById("save-game-input").style.display="none"
                backgroundSprite.interactive = false
                cursorContainer.removeChild(cursorSprite)
                try {
                    let mapCreatorJSONRef = storage.ref(`/users/${authUser.displayName}/mapcreator/${filename}.json`);
                    mapCreatorJSONRef.putString(saveGameState).then(()=>{})
                    app.renderer.extract.canvas(app.stage).toBlob(function(blob) {
                        let mapCreatorPNGRef = storage.ref(`/users/${authUser.displayName}/mapcreator/${filename}.png`);
                        mapCreatorPNGRef.put(blob).then((snapshot) => {
                            console.log('Uploaded png!');
                            document.getElementById("save-game-spinner").style.display="none"
                            document.getElementById("save-game-input").style.display="flex"
                            backgroundSprite.interactive = true
                            document.getElementById("interaction-type").innerHTML = "Move object"
                            interactionType = "moveObject"
                            newCursorSprite = new PIXI.Sprite(textures.objects.cursor);
                            newCursorSprite.scale.set(0.05)
                            newCursorSprite.parentGroup = cursorGroup
                            cursorContainer.addChild(newCursorSprite)
                            cursorContainer.removeChild(cursorSprite)
                            cursorSprite = newCursorSprite
                        });
                    })
                } catch (error) {
                    document.getElementById("save-game-spinner").style.display="none"
                    document.getElementById("save-game-input").style.display="flex"
                    backgroundSprite.interactive = true
                    document.getElementById("interaction-type").innerHTML = "Move object"
                    interactionType = "moveObject"
                    newCursorSprite = new PIXI.Sprite(textures.objects.cursor);
                    newCursorSprite.scale.set(0.05)
                    newCursorSprite.parentGroup = cursorGroup
                    cursorContainer.addChild(newCursorSprite)
                    cursorContainer.removeChild(cursorSprite)
                    cursorSprite = newCursorSprite
                    
                }
        } else {
            alert("Please enter filename")
        }
            

        }
    })
}