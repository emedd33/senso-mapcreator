const app = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT
})
document.getElementById("game-container").appendChild(app.view)
const gameMatrix = new Array(MATRIX_WIDTH * MATRIX_HEIGHT).fill(0);
app.renderer.backgroundColor = 0xFAEBD7
app.stage.backgroundColor = 0xFAEBD7

let interactionType = "moveObject";
let objectType;
let tileType;
let cursorSprite;
let backgroundSprite;
let objectScale = 1;
let history = []

const gameState = {
    background: {},
    tiles: {},
    objects: {},
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
const cursorGroup = new PIXI.display.Group(2, true)
objectGroup.on("sort", ((sprite) => {
    sprite.zOrder = 2;
}));

app.stage.sortableChildren = true;
app.stage.addChild(new PIXI.display.Layer(backgroundGroup));
app.stage.addChild(new PIXI.display.Layer(tileGroup));
app.stage.addChild(new PIXI.display.Layer(objectGroup));
app.stage.addChild(new PIXI.display.Layer(cursorGroup));

const backgroundContainer = new PIXI.Container({width:WIDTH,height:HEIGHT});
const tileContainer = new PIXI.Container({width:WIDTH,height:HEIGHT});
const objectContainer = new PIXI.Container({width:WIDTH,height:HEIGHT});
const cursorContainer = new PIXI.Container({width:WIDTH,height:HEIGHT});
app.stage.addChild(backgroundContainer)
app.stage.addChild(tileContainer)
app.stage.addChild(objectContainer)
app.stage.addChild(cursorContainer)

// Load textures 
const loader = new PIXI.Loader(); // you can also create your own if you want
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
const textures = {tiles:{}, objects:{}}
loadTextures()
app.stage.scale.x = X_SCALE
app.stage.scale.y = Y_SCALE

loader.load((loader, resources) => {
    // Setup background Container
    const backgroundTexture = PIXI.utils.TextureCache.gray_background
    backgroundTexture.frame = new PIXI.Rectangle(0, 0, WIDTH, HEIGHT)
    if (gameState.background.texture) {
        if (gameState.background.texture === "gray_background") {
            backgroundSprite = new PIXI.Sprite(backgroundTexture);
        }
        backgroundSprite.anchor.set(gameState.background.anchor)
        backgroundSprite.x = gameState.background.x
        backgroundSprite.y = gameState.background.y
    } else {
        backgroundSprite = new PIXI.Sprite(backgroundTexture);
        backgroundSprite.x = 0
        backgroundSprite.y = 0
        gameState.background.texture = "gray_background"
        gameState.background.anchor = 0.5
        gameState.background.x = 0
        gameState.background.y = 0
    }
    backgroundSprite.interactive = true;
    backgroundSprite.buttonMode = true;
    backgroundContainer.addChild(backgroundSprite);

    // console.log(document.getElementById("game-container"))
    // document.getElementById("game-container").childNodes[0].addEventListener("pointerdown", onClick)
    backgroundSprite
    .on('pointerdown', onPointerDown)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
    

    loadObjects()
    loadTiles()
    // Setup interaction button
    // console.log(textures.objects)
    cursorSprite = new PIXI.Sprite(textures.objects.cursor);
    cursorSprite.scale.set(0.05)
    cursorSprite.parentGroup = cursorGroup
    cursorContainer.addChild(cursorSprite)
    app.renderer.plugins.interaction.cursorStyles.default = "none";
    app.renderer.plugins.interaction.cursorStyles.pointer = "none";
    setupBottomBar(backgroundSprite)
    setupSidebar(backgroundSprite)
    setUpKeyInputs()
    

})
// Event functions

function onPointerDown(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    const pos = event.data.getLocalPosition(this.parent)
    this.dragging = true;
    if (interactionType==="drawObject" || interactionType === "drawTile"){
        this.data = event.data;
        addToGame(pos)
        return
    }
 
    if(interactionType === "delete"){
        this.data = event.data;
        if(this.type==="object"){
            objectContainer.removeChild(this)
            delete gameState.objects[this.id]
            console.log(gameState)
            return
        } 
        if (this.type==="tile"){
            const tilePos = getTilePosition(pos)
            const index = getGameMatrixIndex(tilePos.x, tilePos.y)
            tileContainer.removeChild(this)
            gameMatrix[index] = 0
            delete gameState.tiles[index]
        }
    }
}

function onDragEnd() {
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
}


function onDragMove(event) {
    
    if (cursorSprite){
        let position = event.data.getLocalPosition(this.parent)
        cursorSprite.x = position.x
        cursorSprite.y = position.y
    }
    if (this.dragging) {
        if (interactionType === "drawTile") {
            let position = event.data.getLocalPosition(this.parent)
            const tilePosition = getTilePosition(position)
            if (tilePosition.x !== this.data.x || tilePosition.y !== this.data.y) {
                this.data = tilePosition
                addToGame(tilePosition)
            }
        } else if (interactionType === "moveObject") {
            if(this.type=== "object"){
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
        const index = getGameMatrixIndex(tilePos.x, tilePos.y)
        tileSprites.push(drawTile(app, gameMatrix, textures.tiles.center, tilePos.y, tilePos.x, index, CENTER))
        tileSprites.push(drawTopLeftTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y))
        tileSprites.push(drawTopTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y))
        tileSprites.push(drawTopRightTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y))
        tileSprites.push(drawLeftTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y))
        tileSprites.push(drawRightTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y))
        tileSprites.push(drawBottomLeftTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y))
        tileSprites.push(drawBottomTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y))
        tileSprites.push(drawBottomRightTile(app, gameMatrix, index, textures, tilePos.x, tilePos.y))
        newEvent = {action: "add", sprites:tileSprites, type:"tile"}
       
    } else if (interactionType === "drawObject") {
        let objectSprite
        switch (objectType) {
            case "table_1":
                objectSprite = drawObject(PIXI.utils.TextureCache.table_1,TABLE_1_SCALE*objectScale, pos, "table_1")
                break
            case "barrel_1":
                objectSprite = drawObject(PIXI.utils.TextureCache.barrel_1,BARREL_1_SCALE*objectScale, pos, "barrel_l")
                break
            default:
                break
        }
        if(objectSprite){
            newEvent = {action: "add", sprites:[objectSprite], type:"object"}
        }

    }
    if (newEvent){
        history.push(newEvent)
    }

}
