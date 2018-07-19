module.exports = {
    buildMessage: {
        startMessage: 'Build Started',
        successMessage: 'Build Succeeded',
        failureMessage: 'Build Failed'
    },
    telegram: {
        botToken: '472274872:AAGmoXpD2mTdQpwGCCzdgKzyun7O8OzNkKI' || throwErr(),
        channelUsername: 'netlify_zapcircle'
    }
}

function throwErr() {
    throw new Error('BOT_TOKEN not defined in config.js')
}
