window.addEventListener("DOMContentLoaded", () => {
    const modules = [
        require("./modules/tabs"),
        require("./modules/modal"),
        require("./modules/timer"),
        require("./modules/cards"),
        require("./modules/calc"),
        require("./modules/forms"),
        require("./modules/slides"),
    ]
    
    for(let i = 0; i < modules.length; i++){
        modules[i]()
    }
})
