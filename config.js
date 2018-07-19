module.exports = {
    buildMessage: {
        startMessage: 'Build Started',
        successMessage: 'Build Succeeded',
        failureMessage: 'Build Failed'
    },
    telegram: {
        botToken: process.env.BOT_TOKEN || throwErr(),
        channelUsername: 'netlify_zapcircle'
    }
}

function throwErr() {
    throw new Error('BOT_TOKEN not defined in config.js')
}
