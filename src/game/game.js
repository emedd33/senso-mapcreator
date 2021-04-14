const app = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT
})
document.getElementById("game-container").appendChild(app.view)
const gameMatrix = new Array(MATRIX_WIDTH * MATRIX_HEIGHT).fill(0);
app.renderer.backgroundColor = 0xFAEBD7

let interactionType = "drawTile";
let objectType;
const gameState = {
    background: {},
    tiles: {},
    objecs: [],
    gameMatrix: gameMatrix
}
// Set up layers
const backgroundGroup = new PIXI.display.Group(-1, true)
backgroundGroup.on('sort', ((sprite) => {
    sprite.zOrder = -1;
}));
const tileGroup = new PIXI.display.Group(0, true)
tileGroup.on('sort', ((sprite) => {
    sprite.zOrder = 0;
}));
const objectGroup = new PIXI.display.Group(1, true)
objectGroup.on("sort", ((sprite) => {
    sprite.zOrder = 1;
}));

app.stage.sortableChildren = true;
app.stage.addChild(new PIXI.display.Layer(backgroundGroup));
app.stage.addChild(new PIXI.display.Layer(tileGroup));
app.stage.addChild(new PIXI.display.Layer(objectGroup));

const backgroundContainer = new PIXI.Container();
const tileContainer = new PIXI.Container();
const objectContainer = new PIXI.Container();
app.stage.addChild(backgroundContainer)
app.stage.addChild(tileContainer)
app.stage.addChild(objectContainer)

// Load textures 
const loader = new PIXI.Loader(); // you can also create your own if you want
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const textures = {}
loader.add("dungeonTiles", "assets/textures/dungeon-tile.png")
loader.add("grid_32_32", "assets/textures/32-32-grid.png")
loader.add("table_1", "assets/textures/Table-1.png")
loader.add("TC_Basics", "assets/textures/TC_Basics.png")
app.stage.scale.x = X_SCALE
app.stage.scale.y = Y_SCALE

loader.load((loader, resources) => {
    // Setup background Container
    let backgroundSprite;
    if (gameState.background.texture) {
        if (gameState.background.texture === "grid_32_32") {
            backgroundSprite = new PIXI.Sprite(PIXI.utils.TextureCache.grid_32_32);
        }
        backgroundSprite.anchor.set(gameState.background.anchor)
        backgroundSprite.x = gameState.background.x
        backgroundSprite.y = gameState.background.y
    } else {
        backgroundSprite = new PIXI.Sprite(PIXI.utils.TextureCache.grid_32_32);
        backgroundSprite.anchor.set(0.5);
        backgroundSprite.x = 0
        backgroundSprite.y = 0
        gameState.background.texture = "grid_32_32"
        gameState.background.anchor = 0.5
        gameState.background.x = 0
        gameState.background.y = 0
    }
    backgroundSprite.interactive = true;
    backgroundSprite.buttonMode = true;
    backgroundContainer.addChild(backgroundSprite);

    backgroundSprite.on('pointerdown', onClick)
        .on('pointerdown', onDragStart)
        .on('pointerup', onDragEnd)
        .on('pointerupoutside', onDragEnd)
        .on('pointermove', onDragMove)

    // Setup interaction button
    document.getElementById("change-to-table").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw Table"
        interactionType = "drawObject"
        objectType = "table"
    })
    document.getElementById("change-to-barrel").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw Barrel"
        interactionType = "drawObject"
        objectType = "barrel"
    })

    document.getElementById("change-to-tiles").addEventListener("click", function () {
        backgroundSprite.interactive = true
        document.getElementById("interaction-type").innerHTML = "Draw tile"
        interactionType = "drawTile"
    })
    document.getElementById("change-to-move").addEventListener("click", function () {
        backgroundSprite.interactive = false
        document.getElementById("interaction-type").innerHTML = "Move object"
        interactionType = "moveObject"
    })

    // Loads Texture
    // Row 1
    textures.bottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.bottomright.frame = new PIXI.Rectangle(0, 0, 32, 32)
    textures.bottom = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.bottom.frame = new PIXI.Rectangle(32, 0, 32, 32)
    textures.bottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.bottomleft.frame = new PIXI.Rectangle(32 * 2, 0, 32, 32)
    textures.right = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.right.frame = new PIXI.Rectangle(32 * 3, 0, 32, 32)
    textures.center = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.center.frame = new PIXI.Rectangle(32 * 4, 0, 32, 32)
    textures.left = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.left.frame = new PIXI.Rectangle(32 * 5, 0, 32, 32)
    textures.topright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topright.frame = new PIXI.Rectangle(32 * 6, 0, 32, 32)
    // Row 2
    textures.top = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.top.frame = new PIXI.Rectangle(0, 32, 32, 32)
    textures.topleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topleft.frame = new PIXI.Rectangle(32, 32, 32, 32)
    textures.swingUpRight = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.swingUpRight.frame = new PIXI.Rectangle(32 * 2, 32, 32, 32)
    textures.swingRightDown = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.swingRightDown.frame = new PIXI.Rectangle(32 * 3, 32, 32, 32)
    textures.swingRightUp = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.swingRightUp.frame = new PIXI.Rectangle(32 * 4, 32, 32, 32)
    textures.swingDownRight = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.swingDownRight.frame = new PIXI.Rectangle(32 * 5, 32, 32, 32)
    textures.UFromLeft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.UFromLeft.frame = new PIXI.Rectangle(32 * 6, 32, 32, 32)
    // Row 3
    textures.UFromTop = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.UFromTop.frame = new PIXI.Rectangle(0, 32 * 2, 32, 32)
    textures.UFromRight = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.UFromRight.frame = new PIXI.Rectangle(32, 32 * 2, 32, 32)
    textures.UFromBottom = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.UFromBottom.frame = new PIXI.Rectangle(32 * 2, 32 * 2, 32, 32)
    textures.circle = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.circle.frame = new PIXI.Rectangle(32 * 3, 32 * 2, 32, 32)
    textures.swingUpRightBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.swingUpRightBottomright.frame = new PIXI.Rectangle(32 * 4, 32 * 2, 32, 32)
    textures.swingRightDownBottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.swingRightDownBottomleft.frame = new PIXI.Rectangle(32 * 5, 32 * 2, 32, 32)
    textures.swingRightUpTopleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.swingRightUpTopleft.frame = new PIXI.Rectangle(32 * 6, 32 * 2, 32, 32)
    // Row 4
    textures.swingDownRightTopright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.swingDownRightTopright.frame = new PIXI.Rectangle(0, 32 * 3, 32, 32)
    textures.leftRight = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.leftRight.frame = new PIXI.Rectangle(32, 32 * 3, 32, 32)
    textures.topBottom = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topBottom.frame = new PIXI.Rectangle(32 * 2, 32 * 3, 32, 32)
    textures.leftTopright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.leftTopright.frame = new PIXI.Rectangle(32 * 3, 32 * 3, 32, 32)
    textures.leftBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.leftBottomright.frame = new PIXI.Rectangle(32 * 4, 32 * 3, 32, 32)
    textures.topBottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topBottomleft.frame = new PIXI.Rectangle(32 * 5, 32 * 3, 32, 32)
    textures.topBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topBottomright.frame = new PIXI.Rectangle(32 * 6, 32 * 3, 32, 32)
    // Row 5
    textures.rightTopleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.rightTopleft.frame = new PIXI.Rectangle(32 * 0, 32 * 4, 32, 32)
    textures.rightBottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.rightBottomleft.frame = new PIXI.Rectangle(32 * 1, 32 * 4, 32, 32)
    textures.bottomTopright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.bottomTopright.frame = new PIXI.Rectangle(32 * 2, 32 * 4, 32, 32)
    textures.bottomTopleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.bottomTopleft.frame = new PIXI.Rectangle(32 * 3, 32 * 4, 32, 32)
    textures.LeftToprightBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.LeftToprightBottomright.frame = new PIXI.Rectangle(32 * 4, 32 * 4, 32, 32)
    textures.topBottomleftBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topBottomleftBottomright.frame = new PIXI.Rectangle(32 * 5, 32 * 4, 32, 32)
    textures.rightTopleftBottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.rightTopleftBottomleft.frame = new PIXI.Rectangle(32 * 6, 32 * 4, 32, 32)
    // Row 6
    textures.bottomTopleftTopright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.bottomTopleftTopright.frame = new PIXI.Rectangle(32 * 0, 32 * 5, 32, 32)
    textures.topleftTopright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topleftTopright.frame = new PIXI.Rectangle(32 * 1, 32 * 5, 32, 32)
    textures.topleftBottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topleftBottomleft.frame = new PIXI.Rectangle(32 * 2, 32 * 5, 32, 32)
    textures.bottomLeftBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.bottomLeftBottomright.frame = new PIXI.Rectangle(32 * 3, 32 * 5, 32, 32)
    textures.toprightBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.toprightBottomright.frame = new PIXI.Rectangle(32 * 4, 32 * 5, 32, 32)
    textures.topleftToprightBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topleftToprightBottomright.frame = new PIXI.Rectangle(32 * 5, 32 * 5, 32, 32)
    textures.topleftToprightBottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topleftToprightBottomleft.frame = new PIXI.Rectangle(32 * 6, 32 * 5, 32, 32)
    textures.topleftBottomleftBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    // Row 7
    textures.topleftBottomleftBottomright.frame = new PIXI.Rectangle(32 * 0, 32 * 6, 32, 32)
    textures.toprightBottomleftBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.toprightBottomleftBottomright.frame = new PIXI.Rectangle(32 * 1, 32 * 6, 32, 32)
    textures.toprightBottomleft = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.toprightBottomleft.frame = new PIXI.Rectangle(32 * 2, 32 * 6, 32, 32)
    textures.topleftBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topleftBottomright.frame = new PIXI.Rectangle(32 * 3, 32 * 6, 32, 32)
    textures.topleftToprightBottomleftBottomright = PIXI.utils.TextureCache.dungeonTiles.clone()
    textures.topleftToprightBottomleftBottomright.frame = new PIXI.Rectangle(32 * 4, 32 * 6, 32, 32)

})
// Event functions

function onClick(event) {
    const pos = event.data.getLocalPosition(this.parent)
    addToGrid(pos, textures)
}
function onDragStart(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    if (interactionType === "drawTile") {
        this.data = getTilePosition(event.data);
    } else if (interactionType === "moveObject") {
        this.data = event.data;
    }
    this.dragging = true;
}

function onDragEnd() {
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}


function onDragMove(event) {
    if (this.dragging) {
        const position = event.data.getLocalPosition(this.parent)
        if (interactionType === "drawTile") {
            const tilePosition = getTilePosition(position)
            if (tilePosition.x !== this.data.x || tilePosition.y !== this.data.y) {
                this.data = tilePosition
                addToGrid(tilePosition, textures)
            }
        } else if (interactionType === "moveObject") {

            this.x = position.x;
            this.y = position.y;

        }
    }
}
// eslint-disable-next-line
function onScroll(event) {
    // no implemented yet
    // TODO make zooming work
    let wDelta = event.wheelDelta < 0 ? 'down' : 'up';
    // Initial scale is set to 1.5, so user can zoom out to 1.05 and zoom in to 1.95 
    if (wDelta === "down") {
        if (app.stage.width >= 3800) {
            app.stage.scale.x -= .05
            app.stage.scale.y -= .05
        }
    } else if (wDelta === "up") {
        if (app.stage.scale.y <= 1) {

            app.stage.scale.x += .05
            app.stage.scale.y += .05
        }
    }

    event.preventDefault()

}
function addToGrid(pos, tileTextures) {
    console.log(gameState)
    if (interactionType === "drawTile") {
        const tilePos = getTilePosition(pos)
        const index = getGameMatrixIndex(tilePos.x, tilePos.y)
        drawTile(app, gameMatrix, textures.center, tilePos.y, tilePos.x, index, CENTER)
        drawTopLeftTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y)
        drawTopTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y)
        drawTopRightTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y)
        drawLeftTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y)
        drawRightTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y)
        drawBottomLeftTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y)
        drawBottomTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y)
        drawBottomRightTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y)
    } else if (interactionType === "drawObject") {
        let objectSprite
        switch (objectType) {
            case "table":
                objectSprite = drawObject("TC_Basics", 2450, 2000, 350, 350, 0.2, pos, "table")
                break
            case "barrel":
                objectSprite = drawObject("TC_Basics", 100, 1400, 150, 170, 0.2, pos,"barrel")
                break
            default:
                break
        }

    }

}
