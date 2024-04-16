window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelector(".tabheader__items"),
    tabsParent = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent")

    const className = "tabheader__item_active"

    function hideTabContents(){
        tabsContent.forEach(item => {
            item.style.display = "none"
        })

        tabs.querySelector("."+className).classList.remove(className)
    }

    function openTabContent(index){
        tabsContent[index].style.display = "block";
        tabsParent[index].classList.add(className);
    }

    hideTabContents()
    openTabContent(0)

    tabs.addEventListener("click", (event) => {
        const target = event.target

        if (!(target.classList.contains(className))){
            tabsParent.forEach((item, index) => {
                if(item == target){
                    hideTabContents()
                    openTabContent(index)
                }
            })
        }
    })

    // timer

    const deadLine = "2024-04-08"

    const getTimeRemaining = (endTime) =>{
        const t = Date.parse(endTime) - Date.parse(new Date())
        if (t <= 0){
            return null
        }

        const days = Math.floor(t / (1000 * 60 * 60 * 24)),
        hours = Math.floor((t / (1000 * 60 * 60) & 24)),
        minutes = Math.floor((t / 1000 / 60) % 60),
        seconds = Math.floor((t / 1000) % 60);
        
        return {
            "total": t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`
        } else {
            return num;
        }
    }
    
    const setClock = (endTime) => {
        const timer = document.querySelector(".timer"),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const objTime = getTimeRemaining(endTime);
            if (objTime != null){
                days.innerHTML = getZero(objTime["days"])
                hours.innerHTML = getZero(objTime["hours"])
                minutes.innerHTML = getZero(objTime["minutes"])
                seconds.innerHTML = getZero(objTime["seconds"])

                if (objTime["t"] <= 0){
                    clearInterval(timeInterval)
                }
        } else {
            console.log("Дата прошла")
            clearInterval(timeInterval)

            const promotion__timer = document.querySelector(".promotion")
            promotion__timer.textContent = ""
        }
        }
    }

    setClock(deadLine)

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

    new MenuCard(
        src="img/tabs/vegy.jpg",
        alt="vegy",
        title='Меню "Фитнес"',
        description='Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        price=9
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container"
    ).render();

    // Формы

    const forms = document.querySelectorAll("form");
    const message = {
        loading: "Загрузка",
        success: "Спасибо",
        failure: "Что-то пошло не так"
    }

    forms.forEach(form => {
        responceData(form);
    })

    function responceData(form){
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const status = document.querySelectorAll(".status")

            if (status.length){
                status.forEach(elem => {
                    form.reset()
                    elem.textContent = "Вы уже отправили запрос"
                })
                return
            } else {

                const statusMessage = document.createElement("div");
                statusMessage.classList.add("status");
                statusMessage.textContent = message.loading;

                form.append(statusMessage);

                const request = new XMLHttpRequest();
                request.open("GET", "https://api.agify.io/?name=ilya")
                request.send()

                request.addEventListener("load", () => {
                    if (200 >= request.status <= 205){
                        console.log(JSON.parse(request.response))
                        statusMessage.textContent = message.success

                        form.reset()
                    } else {
                        console.log(request.status)
                    }
                })
            }
        })
    }
    function showThanksModal(){
     const prevModalDialog = document.querySelector(".modal__dialog");
     console.log(prevModalDialog)   
    }

    
}
);