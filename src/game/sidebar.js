
function setupSidebar(backgroundSprite) {   
    document.getElementById("table_1-object-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        interactionType = "drawObject"
        objectType = "table_1"
        objectScale=1
        document.getElementById("object-scaler").value = 50
        let newCursorSprite = createSprite(textures.objects.table_1, TABLE_1_SCALE,0.5)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
    })
    document.getElementById("barrel_1-object-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        interactionType = "drawObject"
        objectType = "barrel_1"
         objectScale=1
        document.getElementById("object-scaler").value = 50
        let newCursorSprite = createSprite(textures.objects.barrel_1, BARREL_1_SCALE,0.5)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite

    })
    document.getElementById("dungeon-tile-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        interactionType = "drawTile"
        tileType = "dungeonTile"
        objectScale=1
        document.getElementById("object-scaler").value = 50
        newCursorSprite = createSprite(textures.tiles.center, 1,0);
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
        
    })
    document.getElementById("autodraw-input").addEventListener("click",function (event) {
        autodrawSurroundingTiles = event.target.checked
    
    })
     document.getElementById("change-to-move").addEventListener("click", function () {
        backgroundSprite.interactive = true
        interactionType = "moveObject"
        newCursorSprite = new PIXI.Sprite(textures.objects.cursor);
        newCursorSprite.scale.set(0.05)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
    })
    // document.getElementById("save-game-button").addEventListener("click",function(){
    //     if (authUser){
    //         const filename = document.getElementById("save-game-filename").value.toString()
    //         if (filename){
    //             let saveGameState = gameState
    //             document.getElementById("save-game-spinner").style.display="block"
    //             document.getElementById("save-game-input").style.display="none"
    //             backgroundSprite.interactive = false
    //             cursorContainer.removeChild(cursorSprite)
    //             try {
    //                 let mapCreatorJSONRef = storage.ref(`/users/${authUser.displayName}/mapcreator/${filename}/gameState.json`);
    //                 mapCreatorJSONRef.putString(saveGameState).then(()=>{})
    //                 app.renderer.extract.canvas(app.stage).toBlob(function(blob) {
    //                     let mapCreatorPNGRef = storage.ref(`/users/${authUser.displayName}/mapcreator/${filename}/image.png`);
    //                     mapCreatorPNGRef.put(blob).then((snapshot) => {
    //                         console.log('Uploaded png!');
    //                         document.getElementById("save-game-spinner").style.display="none"
    //                         document.getElementById("save-game-input").style.display="flex"
    //                         backgroundSprite.interactive = true
    //                         interactionType = "moveObject"
    //                         newCursorSprite = createSprite(textures.objects.cursor,0.05,0)
    //                         newCursorSprite.parentGroup = cursorGroup
    //                         cursorContainer.addChild(newCursorSprite)
    //                         cursorContainer.removeChild(cursorSprite)
    //                         cursorSprite = newCursorSprite
    //                     });
    //                 })
    //             } catch (error) {
    //                 document.getElementById("save-game-spinner").style.display="none"
    //                 document.getElementById("save-game-input").style.display="flex"
    //                 backgroundSprite.interactive = true
    //                 interactionType = "moveObject"
    //                 newCursorSprite = createSprite(textures.objects.cursor,0.05,0)
    //                 newCursorSprite.parentGroup = cursorGroup
    //                 cursorContainer.addChild(newCursorSprite)
    //                 cursorContainer.removeChild(cursorSprite)
    //                 cursorSprite = newCursorSprite
                    
    //             }
    //     } else {
    //         alert("Please enter filename")
    //     }
            

    //     }
    // })
     document.getElementById("download-game-button").addEventListener("click", function () {
         cursorContainer.removeChild(cursorSprite)
         app.renderer.extract.canvas(app.stage).toBlob(function(blob) {
             var a = document.createElement('a');
            document.body.append(a);
            a.download = "new map";
            a.href = URL.createObjectURL(blob);
            a.click();
            a.remove();
            document.getElementById("save-game-spinner").style.display="none"
            document.getElementById("save-game-input").style.display="flex"
            backgroundSprite.interactive = true
            interactionType = "moveObject"
            newCursorSprite = createSprite(textures.objects.cursor, 0.05,0);
            newCursorSprite.parentGroup = cursorGroup
            cursorContainer.addChild(newCursorSprite)
            cursorContainer.removeChild(cursorSprite)
            cursorSprite = newCursorSprite
        }, 'image/png');
    })
    document.getElementById("object-scaler").oninput = function() {
        if (interactionType === "drawObject"){
            objectScale = this.value/100 + 0.5
            cursorSprite.scale.set(objectScale*cursorSprite.defaultScale)
        } 
    }
    document.getElementById("gray-background-button").addEventListener("click", function() {
        changeBackgroundTexture("gray")
    })
    document.getElementById("lightgray-background-button").addEventListener("click", function() {
        changeBackgroundTexture("lightgray")
    })
    document.getElementById("darkgray-background-button").addEventListener("click", function() {
        changeBackgroundTexture("darkgray")
    })
    document.getElementById("black-background-button").addEventListener("click", function() {
        changeBackgroundTexture("black")
    })
}