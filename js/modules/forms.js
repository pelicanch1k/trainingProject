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