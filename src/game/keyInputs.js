function setUpKeyInputs(){
    
    document.addEventListener('keydown', onKeyDown);
    function onKeyDown(event) {
        if(event.ctrlKey && event.shiftKey && event.code === "KeyZ"){
           gameHistory.redo()
           return
        }
        if(event.ctrlKey && event.code === "KeyZ"){
           gameHistory.undo()
           return
        }
        return
    }
}