let globalScale = 1;
let gameWidth;
let gameHeight;
let app = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT
})
const history = []
let newGameMatrix;
let interactionType;
let autodrawSurroundingTiles;
let objectType;
let tileType;
let cursorSprite;
let backgroundSprite;
let objectScale;

let gameState;

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
const cursorGroup = new PIXI.display.Group(2, true)
objectGroup.on("sort", ((sprite) => {
    sprite.zOrder = 2;
}));

app.stage.sortableChildren = true;
app.stage.addChild(new PIXI.display.Layer(backgroundGroup));
app.stage.addChild(new PIXI.display.Layer(tileGroup));
app.stage.addChild(new PIXI.display.Layer(objectGroup));
app.stage.addChild(new PIXI.display.Layer(cursorGroup));

const backgroundContainer = new PIXI.Container({ width: WIDTH, height: HEIGHT });
const tileContainer = new PIXI.Container({ width: WIDTH, height: HEIGHT });
const objectContainer = new PIXI.Container({ width: WIDTH, height: HEIGHT });
const cursorContainer = new PIXI.Container({ width: WIDTH, height: HEIGHT });
app.stage.addChild(backgroundContainer)
app.stage.addChild(tileContainer)
app.stage.addChild(objectContainer)
app.stage.addChild(cursorContainer)

// Load textures 
const loader = new PIXI.Loader(); // you can also create your own if you want
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const textures = { tiles: {}, objects: {} }
// Event functions
loadTextures(loader)
loader.load((loader, resources) => {
    
    loadObjects()
    loadTiles()
    app.renderer.plugins.interaction.cursorStyles.default = "none";
    app.renderer.plugins.interaction.cursorStyles.pointer = "none";
    setUpKeyInputs()

})

function onPointerDown(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    const pos = event.data.getLocalPosition(this.parent)
    this.dragging = true;
    if (interactionType === "drawObject" || interactionType === "drawTile") {
        this.data = event.data;
        addToGame(pos)
        return
    }
    
    if (interactionType === "delete") {
        this.data = event.data;
        if (this.type === "object") {
            objectContainer.removeChild(this)
            delete gameState.objects[this.id]
            history.push({ action: "remove", sprites: [this], type: "object" })
            return
        }
        if (this.type === "tile") {
            const tilePos = getTilePosition(pos)
            const index = getGameMatrixIndex(tilePos.x, tilePos.y)
            tileContainer.removeChild(this)
            newGameMatrix.cleanIndex(index)
            delete gameState.tiles[index]
            history.push({ action: "remove", sprites: [this], type: "tile", previousIndexValue: index })
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
        cursorSprite.x = position.x
        cursorSprite.y = position.y
    }
    if (this.dragging && position) {
        if (interactionType === "drawTile") {
            let position = event.data.getLocalPosition(this.parent)
            const tilePosition = getTilePosition(position)
            if (tilePosition.x !== this.data.x || tilePosition.y !== this.data.y) {
                this.data = tilePosition
                addToGame(tilePosition)
            }
        } else if (interactionType === "moveObject") {
            if (this.type === "object") {
                let position = event.data.getLocalPosition(this.parent)
                this.x = position.x;
                this.y = position.y;
            }
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
function addToGame(pos) {
    let newEvent;
    if (interactionType === "drawTile") {
        tileSprites = []
        const tilePos = getTilePosition(pos)

        const index = newGameMatrix.getIndexByPosition(tilePos.x, tilePos.y)
        tileSprites.push(drawTile(app, textures.tiles.center, tilePos.y, tilePos.x, index, CENTER))
        if (autodrawSurroundingTiles) {

            tileSprites.push(drawTopLeftTile(app, index, textures, tilePos.x, tilePos.y))
            tileSprites.push(drawTopTile(app, index, textures, tilePos.x, tilePos.y))
            tileSprites.push(drawTopRightTile(app, index, textures, tilePos.x, tilePos.y))
            tileSprites.push(drawLeftTile(app, index, textures, tilePos.x, tilePos.y))
            tileSprites.push(drawRightTile(app, index, textures, tilePos.x, tilePos.y))
            tileSprites.push(drawBottomLeftTile(app, index, textures, tilePos.x, tilePos.y))
            tileSprites.push(drawBottomTile(app, index, textures, tilePos.x, tilePos.y))
            tileSprites.push(drawBottomRightTile(app, index, textures, tilePos.x, tilePos.y))
        }
        newEvent = { action: "add", sprites: tileSprites, type: "tile" }

    } else if (interactionType === "drawObject") {
        let objectSprite
        objectSprite = drawObject(textures.objects[objectType], textures.objects[objectType].scaler * objectScale, pos, objectType)
        if (objectSprite) {
            newEvent = { action: "add", sprites: [objectSprite], type: "object" }
        }

    }
    if (newEvent) {
        history.push(newEvent)
    }

}

document.getElementById("create-game-button").addEventListener("click", function(){
    document.getElementById("game-container").removeChild(document.getElementById("select-environment-container"))
    document.getElementById("right-sidebar").style.display = "flex"
    document.getElementById("bottom-bar").style.display = "flex"
    document.getElementById("game-container").appendChild(app.view)
    resetGame()
    changeBackgroundTexture("gray")    
    setupBottomBar(backgroundSprite)
    setupSidebar(backgroundSprite)
})
document.getElementById("select-small-environment").addEventListener("click", function(){
    globalScale = 2
})
document.getElementById("select-medium-environment").addEventListener("click", function(){
    globalScale = 1
})
document.getElementById("select-large-environment").addEventListener("click", function(){
    globalScale = 0.5
})