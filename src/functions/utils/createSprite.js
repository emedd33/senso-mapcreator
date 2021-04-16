function createSprite(texture,scale,anchor){
    let sprite = new PIXI.Sprite(texture);
    sprite.defaultScale = scale
    console.log()
    sprite.scale.set(scale)
    sprite.anchor.set(anchor)
    return sprite
}