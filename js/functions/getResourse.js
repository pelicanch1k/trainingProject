module.exports = (createCard) => {
    axios.get("http://localhost:3000/menu")
    .then(answer => {
        console.log(answer.data)
        createCard(answer.data)
    })
}