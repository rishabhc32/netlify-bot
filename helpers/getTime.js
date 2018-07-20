const moment = require('moment')

function getCurrentTime() {
    return new Promise((resolve, reject) => {
        let dateTime = moment()
        dateTime = dateTime.utcOffset("+05:30").format('DD[/]MM[/]YYYY, h:mm A')

        resolve(dateTime)
    })
}

module.exports = getCurrentTime
