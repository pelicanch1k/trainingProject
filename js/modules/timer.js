module.exports = () => {
    // Timer

    const deadLine = require("../functions/getDeadLine")()
    console.log(deadLine)

    const getTimeRemaining = (endTime) =>{
        const t = endTime - new Date()

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