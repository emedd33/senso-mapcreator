function drawTile(app, gameMatrix, texture, x, y, index, indexValue) {
    const tileSprite = new PIXI.Sprite(texture);
    let previousIndexValue = gameMatrix[index]
    tileSprite.id = index
    tileSprite.type = "tile"
    tileSprite.y = x
    tileSprite.x = y;
    tileSprite.parentGroup = tileGroup
    tileSprite.interactive = true
    tileSprite
    .on('pointerdown', onPointerDown)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);
    tileContainer.addChild(tileSprite)
    gameMatrix[index] = indexValue
    gameState.tiles[index.toString()] = { texture: texture, type: indexValue.toString(), x: x, y: y, displayOrder: tileSprite.displayOrder }
    return {sprite: tileSprite, index: index, previousIndexValue: previousIndexValue}
}
function drawObject(objectTexture, scale, pos, type) {
    let objectSprite = createSprite(objectTexture,scale,0.5)
    objectSprite.type="object"
    objectSprite.id = createId()
    objectSprite.y = pos.y
    objectSprite.x = pos.x;
    objectSprite.parentGroup = objectGroup
    objectSprite.interactive = true
    objectSprite
    .on('pointerdown', onPointerDown)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);
    gameState.objects[objectSprite.id] ={displayOrder:objectSprite.displayOrder, scale:scale, type:type,pos:pos}
    objectContainer.addChild(objectSprite)
    return objectSprite
}
function drawTopRightTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let topRightIndex;
    if ((index + 1) % MATRIX_WIDTH !== 0) {
        topRightIndex = index - MATRIX_WIDTH + 1
    }
    const topRightTile = gameMatrix[topRightIndex]
    if (topRightTile === NO_TILE) {
        return drawTile(app, gameMatrix, textures.tiles.bottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, BOTTOMLEFT)
    }
    if (topRightTile === BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.bottomLeftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topRightTile === RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.rightBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, RIGHT_BOTTOMLEFT)
    }
    else if (topRightTile === TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.toprightBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPRIGHT_BOTTOMLEFT)

    } else if (topRightTile === TOP) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOP_BOTTOMLEFT)
    }
    else if (topRightTile === TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPLEFT_BOTTOMLEFT)
    }
    else if (topRightTile === SWING_RIGHT_DOWN) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightDownBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, SWING_RIGHT_DOWN_BOTTOMLEFT)
    }
    else if (topRightTile === TOP_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOP_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topRightTile === RIGHT_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.rightTopleftBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, RIGHT_BOTTOMLEFT_TOPLEFT)
    }
    else if (topRightTile === TOPLEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomleft, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT)
    }
    else if (topRightTile === TOPRIGHT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.toprightBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topRightTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }

    else if (topRightTile === TOPLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, topRightIndex, TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT)
    }
}

function drawTopTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    const topIndex = index - MATRIX_WIDTH
    const topTile = gameMatrix[topIndex]
    if (topTile === CENTER) {
        return
    }
    if ([NO_TILE, BOTTOMRIGHT, BOTTOMLEFT, BOTTOMLEFT_BOTTOMRIGHT].includes(topTile)) {
        return drawTile(app, gameMatrix, textures.tiles.bottom, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM)
    }
    else if (topTile === LEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingDownRight, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_DOWN_RIGHT)
    }
    else if (topTile === RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightUp, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_RIGHT_UP)
    }
    else if (topTile === RIGHT_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightUpTopleft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (topTile === TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.bottomTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPRIGHT)
    } else if (topTile === TOP) {
        return drawTile(app, gameMatrix, textures.tiles.topBottom, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, TOP_BOTTOM)
    } else if (topTile === TOPLEFT || topTile === TOPLEFT_BOTTOMLEFT || topTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT || topTile === TOPLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.bottomTopleft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPLEFT)
    } else if (topTile === SWING_UP_RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromRight, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_RIGHT)
    } else if (topTile === SWING_RIGHT_DOWN) {
        return drawTile(app, gameMatrix, textures.tiles.UFromLeft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_LEFT)
    }
    else if (topTile === U_FROM_BOTTOM) {
        return drawTile(app, gameMatrix, textures.tiles.circle, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, CIRCLE)
    }
    else if (topTile === SWING_UP_RIGHT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromRight, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_RIGHT)
    }
    else if (topTile === SWING_RIGHT_DOWN_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromLeft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_LEFT)
    }
    else if (topTile === LEFT_RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromTop, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, U_FROM_TOP)
    }
    else if (topTile === LEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingDownRightTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_DOWN_RIGHT_TOPRIGHT)
    }
    else if (topTile === LEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingDownRight, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_DOWN_RIGHT)
    }
    else if (topTile === TOP_BOTTOMLEFT || topTile === TOP_BOTTOMRIGHT || topTile === TOP_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottom, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, TOP_BOTTOM)
    }
    else if (topTile === RIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightUp, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_RIGHT_UP)
    }
    else if (topTile === LEFT_TOPRIGHT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingDownRightTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_DOWN_RIGHT_TOPRIGHT)
    }
    else if (topTile === RIGHT_BOTTOMLEFT_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightUpTopleft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (topTile === TOPLEFT_TOPRIGHT || topTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT || topTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT || topTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.bottomTopleftTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPLEFT_TOPRIGHT)
    }
    else if (topTile === TOPLEFT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.bottomTopleft, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPLEFT)
    }
    else if (topTile === TOPRIGHT_BOTTOMRIGHT || topTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT || topTile === TOPRIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.bottomTopright, rowPx - TEXTURE_HEIGHT, columnPx, topIndex, BOTTOM_TOPRIGHT)
    }
}

function drawTopLeftTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let topLeftIndex;
    if (index % MATRIX_WIDTH !== 0) {
        topLeftIndex = index - MATRIX_WIDTH - 1
    }
    const topLeftTile = gameMatrix[topLeftIndex]
    if (topLeftTile === CENTER) {
        return
    }
    if (topLeftTile === NO_TILE) {
        return drawTile(app, gameMatrix, textures.tiles.bottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, BOTTOMRIGHT)
    }
    if (topLeftTile === BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.bottomLeftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === LEFT) {
        return drawTile(app, gameMatrix, textures.tiles.leftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, LEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.toprightBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPRIGHT_BOTTOMRIGHT)

    } else if (topLeftTile === TOP) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOP_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === SWING_UP_RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingUpRightBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, SWING_UP_RIGHT_BOTTOMRIGHT)
    }
    else if (topLeftTile === LEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.LeftToprightBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, LEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOP_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOP_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomleft, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (topLeftTile === TOPRIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.toprightBottomleftBottomright, rowPx - TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, topLeftIndex, TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
}
function drawLeftTile(app, gameMatrix, index, textures, columnPx, rowPx) {

    let leftIndex;
    if (index % MATRIX_WIDTH !== 0) {
        leftIndex = index - 1
    }
    const leftTile = gameMatrix[leftIndex]
    if (leftTile === CENTER) {
        return
    }
    if ([NO_TILE, BOTTOMRIGHT, TOPRIGHT, TOPRIGHT_BOTTOMRIGHT].includes(leftTile)) {
        return drawTile(app, gameMatrix, textures.tiles.right, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT)
    }
    else if (leftTile === BOTTOM) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightUp, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_UP)
    }
    else if (leftTile === LEFT) {
        return drawTile(app, gameMatrix, textures.tiles.leftRight, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, LEFT_RIGHT)
    }
    else if (leftTile === BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOP) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightDown, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN)
    }
    else if (leftTile === TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.rightTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_TOPLEFT)
    }
    else if (leftTile === SWING_UP_RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromBottom, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_BOTTOM)
    }
    else if (leftTile === SWING_DOWN_RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromTop, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_TOP)
    }
    else if (leftTile === U_FROM_RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.circle, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, CIRCLE)
    }
    else if (leftTile === SWING_UP_RIGHT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromBottom, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_BOTTOM)
    }
    else if (leftTile === SWING_DOWN_RIGHT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromTop, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_TOP)
    }
    else if (leftTile === TOP_BOTTOM) {
        return drawTile(app, gameMatrix, textures.tiles.UFromLeft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, U_FROM_LEFT)
    }
    else if (leftTile === LEFT_TOPRIGHT || leftTile === LEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.leftRight, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, LEFT_RIGHT)
    }
    else if (leftTile === TOP_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightDownBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN_BOTTOMLEFT)
    }
    else if (leftTile === TOP_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightDown, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN)
    }
    else if (leftTile === BOTTOM_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightUp, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_UP)
    }
    else if (leftTile === BOTTOM_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightUpTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (leftTile === LEFT_TOPRIGHT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.leftRight, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, LEFT_RIGHT)
    }
    else if (leftTile === TOP_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightDownBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN_BOTTOMLEFT)
    }
    else if (leftTile === BOTTOM_TOPLEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightUpTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.rightTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightDown, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, SWING_RIGHT_DOWN)
    }
    else if (leftTile === BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.rightTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.rightTopleftBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOPRIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.rightBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT)
    }
    else if (leftTile === TOPLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.rightTopleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_TOPLEFT)
    }
    else if (leftTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.rightTopleftBottomleft, rowPx, columnPx - TEXTURE_WIDTH, leftIndex, RIGHT_BOTTOMLEFT_TOPLEFT)
    }
}
function drawRightTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let rightIndex;
    if ((index + 1) % MATRIX_WIDTH !== 0) {
        rightIndex = index + 1
    }
    const rightTile = gameMatrix[rightIndex]
    if (rightTile === CENTER) {
        return
    }
    if ([NO_TILE, TOPLEFT, TOPLEFT_BOTTOMLEFT, BOTTOMLEFT].includes(rightTile)) {
        return drawTile(app, gameMatrix, textures.tiles.left, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT)
    }
    else if (rightTile === BOTTOM || rightTile === BOTTOM_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingDownRight, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, SWING_DOWN_RIGHT)
    }
    else if (rightTile === RIGHT || rightTile === RIGHT_TOPLEFT || rightTile === RIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.leftRight, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT_RIGHT)
    }
    else if (rightTile === BOTTOMRIGHT || rightTile === BOTTOMLEFT_BOTTOMRIGHT || rightTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT || rightTile === TOPLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.leftBottomright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT_BOTTOMRIGHT)
    }
    else if (rightTile === TOP || rightTile === TOP_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingUpRight, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, SWING_UP_RIGHT)
    }
    else if (rightTile === SWING_RIGHT_DOWN || rightTile === SWING_RIGHT_DOWN_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromBottom, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, U_FROM_BOTTOM)
    }
    else if (rightTile === SWING_RIGHT_UP || rightTile === SWING_RIGHT_UP_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromTop, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, U_FROM_TOP)
    }
    else if (rightTile === U_FROM_LEFT) {
        return drawTile(app, gameMatrix, textures.tiles.circle, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, CIRCLE)
    }

    else if (rightTile === TOP_BOTTOM) {
        return drawTile(app, gameMatrix, textures.tiles.UFromRight, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, U_FROM_RIGHT)
    }
    else if (rightTile === TOP_BOTTOMRIGHT || rightTile === TOP_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingUpRightBottomright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, SWING_UP_RIGHT_BOTTOMRIGHT)
    }
    else if (rightTile === BOTTOM_TOPRIGHT || rightTile === LEFT_TOPRIGHT_BOTTOMRIGHT || rightTile === BOTTOM_TOPLEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingDownRightTopright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, SWING_DOWN_RIGHT_TOPRIGHT)
    }
    else if (rightTile === TOPLEFT_TOPRIGHT || rightTile === TOPRIGHT || rightTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT || rightTile === TOPRIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.leftTopright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT_TOPRIGHT)
    }
    else if (rightTile === TOPRIGHT_BOTTOMRIGHT || rightTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT || rightTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT || rightTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.LeftToprightBottomright, rowPx, columnPx + TEXTURE_WIDTH, rightIndex, LEFT_TOPRIGHT_BOTTOMRIGHT)
    }

}
function drawBottomLeftTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let bottomLeftIndex;
    if (index % MATRIX_WIDTH !== 0) {
        bottomLeftIndex = index + MATRIX_WIDTH - 1
    }
    const bottomLeftTile = gameMatrix[bottomLeftIndex]
    if (bottomLeftTile === CENTER) {
        return
    }
    if (bottomLeftTile === NO_TILE) {
        return drawTile(app, gameMatrix, textures.tiles.topright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPRIGHT)
    }
    else if (bottomLeftTile === TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPLEFT_TOPRIGHT)
    }
    else if (bottomLeftTile === LEFT) {
        return drawTile(app, gameMatrix, textures.tiles.leftTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, LEFT_TOPRIGHT)
    }
    else if (bottomLeftTile === BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.toprightBottomleft, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPRIGHT_BOTTOMLEFT)

    } else if (bottomLeftTile === BOTTOM) {
        return drawTile(app, gameMatrix, textures.tiles.bottomTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, BOTTOM_TOPRIGHT)
    }
    else if (bottomLeftTile === BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.toprightBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPRIGHT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === SWING_DOWN_RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingDownRightTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, SWING_DOWN_RIGHT_TOPRIGHT)
    }
    else if (bottomLeftTile === BOTTOM_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.bottomTopleftTopright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, BOTTOM_TOPLEFT_TOPRIGHT)
    }
    else if (bottomLeftTile === LEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.LeftToprightBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, LEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.toprightBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === TOPLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomLeftTile === TOPLEFT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomleft, rowPx + TEXTURE_HEIGHT, columnPx - TEXTURE_WIDTH, bottomLeftIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT)
    }

}
function drawBottomTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    const bottomIndex = index + MATRIX_WIDTH
    const bottomTile = gameMatrix[bottomIndex]
    if (bottomTile === CENTER) {
        return
    }
    if ([NO_TILE, TOPRIGHT, TOPLEFT, TOPLEFT_TOPRIGHT].includes(bottomTile)) {
        return drawTile(app, gameMatrix, textures.tiles.top, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP)
    }
    else if (bottomTile === LEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingUpRight, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_UP_RIGHT)
    }
    else if (bottomTile === RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightDown, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_RIGHT_DOWN)
    }
    else if (bottomTile === BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMRIGHT)
    } else if (bottomTile === BOTTOM) {
        return drawTile(app, gameMatrix, textures.tiles.topBottom, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOM)
    } else if (bottomTile === BOTTOMLEFT || bottomTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT || bottomTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomleft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMLEFT)
    } else if (bottomTile === SWING_DOWN_RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromRight, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_RIGHT)
    } else if (bottomTile === SWING_RIGHT_UP) {
        return drawTile(app, gameMatrix, textures.tiles.UFromLeft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_LEFT)
    }
    else if (bottomTile === U_FROM_TOP) {
        return drawTile(app, gameMatrix, textures.tiles.circle, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, CIRCLE)
    }
    else if (bottomTile === SWING_DOWN_RIGHT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromRight, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_RIGHT)
    }
    else if (bottomTile === SWING_RIGHT_UP_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromLeft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_LEFT)
    }
    else if (bottomTile === LEFT_RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.UFromBottom, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, U_FROM_BOTTOM)
    }
    else if (bottomTile === LEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingUpRightBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_UP_RIGHT_BOTTOMRIGHT)
    }
    else if (bottomTile === LEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingUpRight, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_UP_RIGHT)
    }
    else if (bottomTile === BOTTOM_TOPLEFT || bottomTile === BOTTOM_TOPRIGHT || bottomTile === BOTTOM_TOPLEFT_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottom, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOM)
    }
    else if (bottomTile === RIGHT_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightDown, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_RIGHT_DOWN)
    }
    else if (bottomTile === LEFT_TOPRIGHT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.swingUpRightBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_UP_RIGHT_BOTTOMRIGHT)
    }
    else if (bottomTile === RIGHT_BOTTOMLEFT_TOPLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightDownBottomleft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, SWING_RIGHT_DOWN_BOTTOMLEFT)
    }
    else if (bottomTile === BOTTOMLEFT_BOTTOMRIGHT || bottomTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT || bottomTile === TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT || bottomTile === TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomTile === TOPLEFT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomleft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMLEFT)
    }
    else if (bottomTile === TOPRIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomleft, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMLEFT)
    }
    else if (bottomTile === TOPRIGHT_BOTTOMRIGHT || bottomTile === TOPLEFT_TOPRIGHT_BOTTOMRIGHT || bottomTile === TOPLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topBottomright, rowPx + TEXTURE_HEIGHT, columnPx, bottomIndex, TOP_BOTTOMRIGHT)
    }

} function drawBottomRightTile(app, gameMatrix, index, textures, columnPx, rowPx) {
    let bottomRightIndex;
    if ((index + 1) % MATRIX_WIDTH !== 0) {
        bottomRightIndex = index + MATRIX_WIDTH + 1
    }
    const bottomRightTile = gameMatrix[bottomRightIndex]
    if (bottomRightTile === CENTER) {
        return
    }
    if (bottomRightTile === NO_TILE) {
        return drawTile(app, gameMatrix, textures.tiles.topleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT)
    }
    if (bottomRightTile === TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftTopright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT)
    }
    else if (bottomRightTile === RIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.rightTopleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, RIGHT_TOPLEFT)
    }
    else if (bottomRightTile === BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_BOTTOMRIGHT)

    } else if (bottomRightTile === BOTTOM) {
        return drawTile(app, gameMatrix, textures.tiles.bottomTopleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, BOTTOM_TOPLEFT)
    }
    else if (bottomRightTile === BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftBottomleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_BOTTOMLEFT)
    }
    else if (bottomRightTile === SWING_RIGHT_UP) {
        return drawTile(app, gameMatrix, textures.tiles.swingRightUpTopleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, SWING_RIGHT_UP_TOPLEFT)
    }
    else if (bottomRightTile === BOTTOM_TOPRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.bottomTopleftTopright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, BOTTOM_TOPLEFT_TOPRIGHT)
    }
    else if (bottomRightTile === RIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.rightTopleftBottomleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, RIGHT_BOTTOMLEFT_TOPLEFT)
    }
    else if (bottomRightTile === BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomRightTile === TOPRIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT)
    }
    else if (bottomRightTile === TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomleftBottomright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT_BOTTOMRIGHT)
    }
    else if (bottomRightTile === TOPRIGHT_BOTTOMLEFT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomleft, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT_BOTTOMLEFT)
    }
    else if (bottomRightTile === TOPRIGHT_BOTTOMRIGHT) {
        return drawTile(app, gameMatrix, textures.tiles.topleftToprightBottomright, rowPx + TEXTURE_HEIGHT, columnPx + TEXTURE_WIDTH, bottomRightIndex, TOPLEFT_TOPRIGHT_BOTTOMRIGHT)
    }
}