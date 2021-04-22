class GameEvent{
    eventType;
    spriteType;
    sprite;
    constructor(eventType, spriteType, sprite){
        this.eventType = eventType
        this.spriteType = spriteType
        this.sprite = sprite
    }
    getContainer(){
        switch (this.spriteType) {
            case "object":
                return objectContainer
            default:
                break;
        }
    }
    add(){
        let container = this.getContainer()
        container.addChild(this.sprite)

    }
    remove(){
        let container = this.getContainer()
        container.removeChild(this.sprite)

    }
    reverse(){
        switch(this.eventType){
            case "add":
                this.remove()
                break
            case "remove":
                this.add()
                break
            default:
                break
        }
    }
    do(){
        switch(this.eventType){
            case "add":
                this.add()
                break
            case "remove":
                this.remove()
                break
            default:
                break
        }
    }
}
class GameHistory{
    events;
    reverseEvents;
    constructor(){
        this.events = []
        this.reverseEvents = []
    }
    addEvent(event){
        this.events.push(event)
    }
    undo(){
        if (this.events.length > 0){
            let lastEvent = this.events.pop()
            lastEvent.reverse()
            this.reverseEvents.push(lastEvent)
        }
    }
    redo(){
        if (this.reverseEvents.length > 0){
            let lastReverseEvent = this.reverseEvents.pop()
            lastReverseEvent.do()
            this.events.push(lastReverseEvent)
        }
    }
}
