function createSprite(texture,scale,anchor){
    let sprite = new PIXI.Sprite(texture);
    sprite.defaultScale = scale
    if (scale){
        sprite.scale.set(scale)
    }
    if (anchor){
        sprite.anchor.set(anchor)
    }
    return sprite
}