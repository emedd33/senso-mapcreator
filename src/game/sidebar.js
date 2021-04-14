function setupSidebar(backgroundSprite) {   
    document.getElementById("table-object-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw Table"
        interactionType = "drawObject"
        objectType = "table_1"
    })
    document.getElementById("barrel-object-button").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw Barrel"
        interactionType = "drawObject"
        objectType = "barrel_1"
    })
}