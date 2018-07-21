module.exports = {
    buildMessage: {
        startMessage: 'Build Started',
        successMessage: 'Build Succeeded',
        failureMessage: 'Build Failed'
    },
    telegram: {
        botToken: process.env.BOT_TOKEN || throwErr('NETLIFY_BUILD_TOKEN'),
        channelUsername: 'netlify_zapcircle'
    },
    triggerBuildMessage: '/start_build',
    netlifyBuildToken: process.env.NETLIFY_BUILD_TOKEN || throwErr('NETLIFY_BUILD_TOKEN')
}

function throwErr(envVar) {
    throw new Error(`${envVar} not defined in config.js`)
}
