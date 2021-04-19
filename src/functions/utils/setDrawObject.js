function setDrawObject(button, scaler){
    backgroundSprite.interactive = true
    interactionType = "drawObject"
    objectType = button.id
    objectScale=1
    document.getElementById("object-scaler").value = 50
    let newCursorSprite = createSprite(textures.objects[button.id], textures.objects[button.id].scaler,0.5)
    newCursorSprite.parentGroup = cursorGroup
    cursorContainer.addChild(newCursorSprite)
    cursorContainer.removeChild(cursorSprite)
    cursorSprite = newCursorSprite
}