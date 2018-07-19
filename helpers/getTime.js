function getCurrentTime() {
    return new Promise((resolve, reject) => {
        let Time = new Date(),
            hours = Time.getHours() % 12 || 12,
            ampm = (Time.getHours() < 12 || Time.getHours() === 24) ? "AM" : "PM",
            minutes = Time.getMinutes();

        minutes = minutes < 10 ? '0'+minutes : minutes;

        let time = `${hours}:${Time.getMinutes()} ${ampm} `
        let date = `${Time.getDate()}/${Time.getMonth()+1}/${Time.getFullYear()}`

        resolve(time + date)
    })
}

module.exports = getCurrentTime
