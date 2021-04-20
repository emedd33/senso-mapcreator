function setupBottomBar(backgroundSprite){
    document.getElementById("change-to-tiles").addEventListener("click", function () {
        backgroundSprite.interactive = true        
        document.getElementById("objects-container").style.display = "none"
        document.getElementById("file-container").style.display = "none"
        document.getElementById("tiles-container").style.display = "flex"
    })
     document.getElementById("change-to-objects").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("objects-container").style.display = "flex"
        document.getElementById("tiles-container").style.display = "none"
        document.getElementById("file-container").style.display = "none"
    })
    document.getElementById("change-to-move").addEventListener("click", function () {
        backgroundSprite.interactive = false
        interactionType = "moveObject"
    })
     document.getElementById("change-to-delete").addEventListener("click", function () {
        backgroundSprite.interactive = true
        interactionType = "delete"
        let newCursorSprite = new PIXI.Sprite(PIXI.utils.TextureCache.bulldozer);
        newCursorSprite.scale.set(0.05)
        newCursorSprite.anchor.set(0,0.5)
        newCursorSprite.parentGroup = cursorGroup
        cursorContainer.addChild(newCursorSprite)
        cursorContainer.removeChild(cursorSprite)
        cursorSprite = newCursorSprite
    })
    document.getElementById("large-game-button").addEventListener("click", function(){
        var r = confirm("Reset scale to large? This will clear all content");
        if (r == true) {
            globalScale = 0.5
            resetGame()
        } 
    })
    document.getElementById("medium-game-button").addEventListener("click", function(){
        var r = confirm("Reset scale to medium? This will clear all content");
        if (r == true) {
            globalScale = 1
            resetGame()
        } 
    })
    document.getElementById("small-game-button").addEventListener("click", function(){
        var r = confirm("Reset scale to medium? This will clear all content");
        if (r == true) {
            globalScale = 2
            resetGame()
        }
        resetGame()
    })
}
