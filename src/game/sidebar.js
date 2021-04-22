
function setupSidebar(backgroundSprite) {   

     document.getElementById("object-scaler").oninput = function() {
        if (interactionType === "drawObject"){
            objectScale = this.value/100 + 0.5
            cursorSprite.scale.set(objectScale*cursorSprite.defaultScale)
            document.getElementById("selected-object-img").width = cursorSprite.width

        } 
    }
   
    document.getElementById("object-search-input").addEventListener("input", function(){
        const searchWord = document.getElementById("object-search-input").value.toString().toLowerCase().replace(/ /g,'')
        const searchContainer = document.getElementById("all-object-container")
        for (const elem of searchContainer.children){
            if (elem.id.toString().toLowerCase().replace(/ /g,'').replace("_", "").includes(searchWord)){
                elem.style.display = "inline"
            } else {
                elem.style.display = "none"
            }
    }
    })
    document.getElementById("fix-to-tile-checkbox").addEventListener("change", function(event){
        fixObjectToGrid = !fixObjectToGrid;
    })
    document.getElementById("rotate-left-object-button").addEventListener("click", function(){
        selectedObjectImg = document.getElementById("selected-object-img");
        objectAngle -=90
        selectedObjectImg.style.transform = `rotate(${objectAngle}deg)`;
        cursorSprite.angle =objectAngle 
    })
     document.getElementById("rotate-right-object-button").addEventListener("click", function(){
        selectedObjectImg = document.getElementById("selected-object-img");
        objectAngle +=90
        selectedObjectImg.style.transform = `rotate(${objectAngle}deg)`;
        cursorSprite.angle = objectAngle 
    })
}