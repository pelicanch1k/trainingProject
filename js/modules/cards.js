module.exports = () => {
    // классы для карточек
    
    class MenuCard{
        constructor(src, alt, title, description, price){
            this.src = src
            this.alt = alt
            this.title = title
            this.description = description
            this.price = price
            this.transfer = 27;
            this.changeUSDToUAH()
        }

        changeUSDToUAH(){
            this.price = this.price * this.transfer  
        }

        render(){
            const element = document.createElement("div")
            element.innerHTML = `
                <div class="menu__item">
                <img src="${this.src}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            </div>
        `

        const container = document.querySelector(".menu__field .container")
        container.append(element)
        }
    }

    function createCard(data){
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price).render()
        })
    }
}