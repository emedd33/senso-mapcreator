class GameEvent{
    eventType;
    spriteType;
    sprite;
    constructor(eventType, spriteType, sprite){
        this.eventType = eventType
        this.spriteType = spriteType
        this.sprite = sprite
    }
    reverse(){

    }
    do(){

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
        console.log(this.events)
    }
    undo(){
        if (events.length > 0){
            let lastEvent = this.events.pop()
            lastEvent.reverse()
            reverseEvents.push(lastEvent)
        }
    }
    redo(){
        if (reverseEvents.length > 0){
            let lastReverseEvent = this.reverseEvents.pop()
            lastReverseEvent.do()
            this.events.push(lastReverseEvent)
        }
    }
}
