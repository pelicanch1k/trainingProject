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