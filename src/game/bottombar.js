function setupBottomBar(backgroundSprite){
    document.getElementById("change-to-tiles").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw tile"
        
        document.getElementById("objects-container").style.display = "none"
        document.getElementById("tiles-container").style.display = "flex"
        interactionType = "drawTile"
    })
     document.getElementById("change-to-objects").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw object"
        document.getElementById("objects-container").style.display = "flex"
        document.getElementById("tiles-container").style.display = "none"
        interactionType = "drawObject"
    })
    document.getElementById("change-to-move").addEventListener("click", function () {
        backgroundSprite.interactive = false
        document.getElementById("interaction-type").innerHTML = "Move object"
        interactionType = "moveObject"
    })
}
