module.exports = () => {    
    let now = new Date();
    dayNow = now.getDate()

    now.setDate(dayNow + 1)

    return now
}