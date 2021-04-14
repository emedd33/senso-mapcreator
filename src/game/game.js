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
const textures = {tiles:{}, objects:{}}
loadTextures()
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
    
    loadObjects()
    loadTiles()
    // Setup interaction button
    setupBottomBar(backgroundSprite)
    setupSidebar(backgroundSprite)
})
// Event functions

function onClick(event) {
    const pos = event.data.getLocalPosition(this.parent)
    addToGrid(pos)
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
                addToGrid(tilePosition)
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
function addToGrid(pos) {
    console.log(gameState)
    if (interactionType === "drawTile") {
        const tilePos = getTilePosition(pos)
        const index = getGameMatrixIndex(tilePos.x, tilePos.y)
        drawTile(app, gameMatrix, textures.tiles.center, tilePos.y, tilePos.x, index, CENTER)
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
            case "table_1":
                drawObject(PIXI.utils.TextureCache.table_1,0.5, pos, "table_1")
                break
            case "barrel_1":
                drawObject(PIXI.utils.TextureCache.barrel_1,0.2, pos, "barrel_l")
                break
            default:
                break
        }

    }

}
