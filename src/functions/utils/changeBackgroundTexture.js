function changeBackgroundTexture(type) {
    let backgroundTexture;
    if (type === "dungeon-tile") {
        backgroundTexture = PIXI.utils.TextureCache.gray_background
        gameState.background.texture = "gray_background"
    }
    else if (type === "grass-tile") {
        backgroundTexture = PIXI.utils.TextureCache.water_background
        gameState.background.texture = "water_background"
    } else if (type === "ocean-tile") {
        backgroundTexture = PIXI.utils.TextureCache.ocean_background
        gameState.background.texture = "ocean_background"
    }
    backgroundTexture.frame = new PIXI.Rectangle(0, 0, app.view.width / globalScale, app.view.height / globalScale)
    newBackgroundSprite = new PIXI.Sprite(backgroundTexture);
    newBackgroundSprite.x = 0
    newBackgroundSprite.y = 0
    newBackgroundSprite.interactive = true
    newBackgroundSprite.buttonMode = true;
    newBackgroundSprite
        .on('pointerdown', onPointerDown)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove)
    backgroundContainer.addChild(newBackgroundSprite)
    if (backgroundSprite) {
        backgroundContainer.removeChild(backgroundSprite)
    }
    backgroundSprite = newBackgroundSprite
}