
function setupSidebar(backgroundSprite) {   

     document.getElementById("object-scaler").oninput = function() {
        if (interactionType === "drawObject"){
            objectScale = this.value/100 + 0.5
            cursorSprite.scale.set(objectScale*cursorSprite.defaultScale)
            document.getElementById("selected-object-img").width = cursorSprite.width

        } 
    }
   
    document.getElementById("object-search-input").addEventListener("input", function(){
        const searchWord = document.getElementById("object-search-input").value.toString().toLowerCase()
        const searchContainer = document.getElementById("object-search-container")
        for (const elem of searchContainer.children){
            if (elem.id.toString().toLowerCase().includes(searchWord)){
                elem.style.display = "inline"
            } else {
                elem.style.display = "none"
            }
    }
    })
}