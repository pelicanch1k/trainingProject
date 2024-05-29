/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

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

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

module.exports = () => {
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

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });
    
        return await res.json();
    };

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

                const formData = new FormData(form);

                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    statusMessage.textContent = message.success
                }).catch(() => {
                    statusMessage.textContent = message.failure
                }).finally(() => {
                    form.reset();
                });
            }
        })
    }
}

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 300000);
    // Изменил значение, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slides.js":
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
/***/ ((module) => {

module.exports = () => {
    const slides = document.querySelectorAll(".offer__slide"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    counter = document.querySelector(".offer__slider-counter"),
    total = counter.querySelector("#total"),
    current = counter.querySelector("#current")

    let slideIndex = 1;

    showSlides(slideIndex);

    if (slides.length < 10){
    total.textContent = "0"+slides.length;
    } else{
    total.textContent = slides.length;
    }

    function showSlides(n){
    if (n > slides.length){
        slideIndex = 1;
    } else if (n < 1){
        slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = "none");
    slides[slideIndex - 1].style.display = "block";

    if (slideIndex < 10){
        current.textContent = "0"+slideIndex
    } else{
        current.textContent = slideIndex
    }
    }

    function plusSlides(n){
        showSlides(slideIndex += n)
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    })

    next.addEventListener("click", () => {
        plusSlides(1);
    })
}

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

module.exports = () => {
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
}

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

module.exports = () => {
    // Timer

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
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener("DOMContentLoaded", () => {
    const modules = [
        __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
        __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        __webpack_require__(/*! ./modules/slides */ "./js/modules/slides.js"),
    ]
    
    for(let i = 0; i < modules.length; i++){
        modules[i]()
    }
})

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map