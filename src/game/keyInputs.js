function setUpKeyInputs(){
    
    document.addEventListener('keydown', onKeyDown);
    function onKeyDown(event) {
        if(event.ctrlKey && event.code === "KeyZ"){
            if (history.length > 0){

                lastEvent = history.pop()
                if (lastEvent.action === "add"){
                    lastEvent.sprites.forEach(element => {
                        if (element){
                            switch (lastEvent.type){
                                case "object":
                            objectContainer.removeChild(element)
                            break
                        case "tile":
                            tileContainer.removeChild(element.sprite)
                            gameMatrix[element.index] = element.previousIndexValue
                            break
                        default:
                            return
                        }
                    }
                })
                return
            }
            if (lastEvent.action === "remove"){
                lastEvent.sprites.forEach(element => {
                        if (element){
                            switch (lastEvent.type){
                                case "object":
                            objectContainer.addChild(element)
                            break
                        case "tile":
    
                            tileContainer.addChild(element)
                            gameMatrix[element.index] = element.previousIndexValue
                            break
                        default:
                            return
                        }
                    }
                })
            }
        }
        return
    }
}
}