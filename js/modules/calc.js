module.exports = () => {
    // Calc

    const result = document.querySelector(".calculating__result span");
    let sex = "female", height, weight, age, ratio=1.375;

    function calcTotal(){
        if(!sex || !height || !weight || !age || !ratio){
            result.textContent = "___"
            return;
        } else {
            if (sex === "female"){
                result.textContent = Math.round((447.6 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
            } else if (sex === "male"){
                result.textContent = Math.round((88.36 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)
            }
        }
    }

    calcTotal()

    function getStaticInfo(parentSelector, activeClass){
        const elements = document.querySelectorAll(`${parentSelector} div`)

        elements.forEach(elem => elem.addEventListener("click", e => {
            if (e.target.getAttribute("data-ratio")){
                ratio = +e.target.getAttribute("data-ratio");
            } else{
                sex = e.target.getAttribute("id")
            }

            console.log(ratio, sex)

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            })

            e.target.classList.add(activeClass)
            calcTotal()
        }))
    }

    getStaticInfo("#gender", "calculating__choose-item_active");
    getStaticInfo(".calculating__choose_big", "calculating__choose-item_active");

    function getDynamicInfo(selector){
        const input = document.querySelector(selector);

        input.addEventListener("input", event => {
            const value = +event.target.value
            switch(event.target.id){
                case "height":
                    height = value
                    break;
                case "age":
                    age = value
                    break;
                case "weight":
                    weight = value
                    break;
            }

            calcTotal()
        })
    }

    getDynamicInfo(".calculating__choose_medium")
}