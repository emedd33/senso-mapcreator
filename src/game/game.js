let globalScale = 1;
let gameWidth;
let gameHeight;
let app = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT
})
var graphics = new PIXI.Graphics();
let newGameMatrix;
let gameHistory;
let displayGrid = false;
let gridSprite;
let interactionType;
let selectedTile = "dungeon-tile";
let autodrawSurroundingTiles;
let objectType;
let tileType;
let fixObjectToGrid = false;
let cursorSprite;
let backgroundSprite;
let selectedObject;
let objectScale;
let gameState;
let objectAngle = 0
let centerTileVersions


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
const gridGroup = new PIXI.display.Group(2, true)
const cursorGroup = new PIXI.display.Group(3, true)
objectGroup.on("sort", ((sprite) => {
    sprite.zOrder = 3;
}));

app.stage.sortableChildren = true;
app.stage.addChild(new PIXI.display.Layer(backgroundGroup));
app.stage.addChild(new PIXI.display.Layer(tileGroup));
app.stage.addChild(new PIXI.display.Layer(objectGroup));
app.stage.addChild(new PIXI.display.Layer(gridGroup));
app.stage.addChild(new PIXI.display.Layer(cursorGroup));

const backgroundContainer = new PIXI.Container({ width: WIDTH, height: HEIGHT });
const tileContainer = new PIXI.Container({ width: WIDTH, height: HEIGHT });
const objectContainer = new PIXI.Container({ width: WIDTH, height: HEIGHT });
const gridContainer = new PIXI.Container({ width: WIDTH, height: HEIGHT });
const cursorContainer = new PIXI.Container({ width: WIDTH, height: HEIGHT });
app.stage.addChild(backgroundContainer)
app.stage.addChild(tileContainer)
app.stage.addChild(objectContainer)
app.stage.addChild(cursorContainer)
app.stage.addChild(gridContainer)

// Load textures 
let loader = new PIXI.Loader(); // you can also create your own if you want
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const textures = { tiles: {}, objects: {} }
// Event functions
loadTextures(loader)
loader.load((loader, resources) => {
    loadObjects()
    loadGrid()
    app.renderer.plugins.interaction.cursorStyles.default = "none";
    app.renderer.plugins.interaction.cursorStyles.pointer = "none";
    setUpKeyInputs()

})

function onPointerDown(event) {

    if (event.data.originalEvent.button === 0) { // left click on the mouse

        const pos = event.data.getLocalPosition(this.parent)
        this.dragging = true;
        this.data = event.data;
        if (
            interactionType === "drawObject"
            || interactionType === "drawTile"
        ) {
            addToGame(pos)
            return
        }
        if (interactionType === "moveObject") {
            // draw a rounded rectangle
            graphics.clear()
            if (this.type === "object") {
                if (selectedObject !== this) {
                    selectedObject = this
                }
            } else {
                selectedObject = undefined
            }
            return

        }
        if (interactionType === "deleteObject") {
            this.data = event.data;
            if (this.type === "object") {
                objectContainer.removeChild(this)
                delete gameState.objects[this.id]
            }
            return

        }
        if (interactionType === "removeTile") {
            let position = event.data.getLocalPosition(tileContainer)
            let centerIndex = newGameMatrix.getIndexByPosition(position.x, position.y)
            let centerTile = newGameMatrix.getIndex(centerIndex)
            if (centerTile && centerTile.sprite) {
                removeTilesFromGame(centerTile, centerIndex)
            }
        }

    }
}

function onDragEnd() {
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}


function onDragMove(event) {
    let position;
    if (this.parent) {
        position = event.data.getLocalPosition(this.parent)
    }
    if (cursorSprite && position) {
        if (fixObjectToGrid && interactionType === "drawObject") {
            position = getTilePosition(position)
        }
        cursorSprite.x = position.x
        cursorSprite.y = position.y
    }
    if (this.dragging && position) {
        if (interactionType === "drawTile") {
            let position = event.data.getLocalPosition(this.parent)
            let tilePosition = getTilePosition(position)
            if (tilePosition.x !== this.data.x || tilePosition.y !== this.data.y) {
                this.data = tilePosition
                addToGame(tilePosition)
            }
        } else if (interactionType === "moveObject") {
            if (this.type === "object") {
                position = event.data.getLocalPosition(this.parent)
                if (this.x !== position.x || this.y !== position.y) {
                    selectedObject = undefined
                    graphics.clear()
                    this.x = position.x;
                    this.y = position.y;
                }
            }
        } else if (interactionType === "deleteObject") {
            let hoveredObject = Object.values(gameState.objects).filter(obj => {
                return (
                    (position.x - obj.pos.x) < 0 &&
                    (position.x - obj.pos.x + obj.width) > 0 &&
                    (position.y - obj.pos.y) < 0 &&
                    (position.y - obj.pos.y + obj.height) > 0
                )
            }
            )
            if (hoveredObject.length > 0) {
                hoveredObject.forEach(obj => {
                    objectContainer.removeChild(obj.sprite)
                    delete gameState.objects[obj.sprite.id]
                })
            }
        } else if (interactionType === "removeTile") {
            let position = event.data.getLocalPosition(tileContainer)
            let index = newGameMatrix.getIndexByPosition(position.x, position.y)
            let tile = newGameMatrix.getIndex(index)
            if (tile && tile.sprite) {
                removeTilesFromGame(tile, index)
            }

        }
    }
}

function addTilesToGame(index, tilePos, addCenter) {
    if (addCenter) {
        let centerTileVersionNumber = Math.floor(Math.random() * 4);
        console.log(centerTileVersionNumber);
        drawTile(app, centerTileVersions[centerTileVersionNumber], tilePos.y, tilePos.x, index, CENTER)
    }
    drawTopLeftTile(app, index, textures, tilePos.x, tilePos.y)
    drawTopTile(app, index, textures, tilePos.x, tilePos.y)
    drawTopRightTile(app, index, textures, tilePos.x, tilePos.y)
    drawLeftTile(app, index, textures, tilePos.x, tilePos.y)
    drawRightTile(app, index, textures, tilePos.x, tilePos.y)
    drawBottomLeftTile(app, index, textures, tilePos.x, tilePos.y)
    drawBottomTile(app, index, textures, tilePos.x, tilePos.y)
    drawBottomRightTile(app, index, textures, tilePos.x, tilePos.y)
}
function addToGame(pos) {
    if (interactionType === "drawTile") {
        const tilePos = getTilePosition(pos)
        const index = newGameMatrix.getIndexByPosition(tilePos.x, tilePos.y)
        addTilesToGame(index, tilePos, true)
    } else if (interactionType === "drawObject") {
        drawObject(textures.objects[objectType], textures.objects[objectType].scaler * objectScale, pos, objectType)
    }
}
function removeTilesFromGame(centerTile, centerIndex) {
    tileContainer.removeChild(centerTile.sprite)
    newGameMatrix.cleanIndex(centerIndex)
}

document.getElementById("create-game-button").addEventListener("click", function () {
    loadTiles()
    document.getElementById("game-container").removeChild(document.getElementById("select-environment-container"))
    document.getElementById("right-sidebar").style.display = "flex"
    document.getElementById("bottom-bar").style.display = "flex"
    document.getElementById("game-container").appendChild(app.view)
    resetGame()
    changeBackgroundTexture(selectedTile)
    setupBottomBar(backgroundSprite)
    setupSidebar(backgroundSprite)
    app.stage.addChild(graphics);
})
document.getElementById("select-small-environment").addEventListener("click", function () {
    globalScale = 1.2
})
document.getElementById("select-medium-environment").addEventListener("click", function () {
    globalScale = 1
})
document.getElementById("select-large-environment").addEventListener("click", function () {
    globalScale = 0.8
})
document.getElementById("select-dungeon-map-tile").addEventListener("click", function () {
    selectedTile = "dungeon-tile";
})

document.getElementById("select-ocean-map-tile").addEventListener("click", function () {
    selectedTile = "ocean-tile";
}
)
document.getElementById("select-grass-map-tile").addEventListener("click", function () {
    selectedTile = "grass-tile";
})