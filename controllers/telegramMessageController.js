const axios = require('axios')

const debug = require('debug')('telegramWebhook')
const axiosDebug = require('debug')('axiosBuildTrigger')

const {telegram, triggerBuildMessage} = require('../config')
const {netlifyBuildToken} = require('../config')

axios.defaults.baseURL = 'https://api.netlify.com/build_hooks';

exports.handle_webhook = (req, res, next) => {
    processTelegramMessage(req.body)
    
    res.sendStatus(200)
}

function processTelegramMessage(message) {
    let result = (message.channel_post.chat.username === telegram.channelUsername) ?
       message.channel_post.text === triggerBuildMessage :
        false
    
    if(result)
        triggerBuild()
    else   
        debug(JSON.stringify(message.channel_post))
}

function triggerBuild() {
    axios({
        method: 'post',
        url: `/${netlifyBuildToken}`
    })
    .then((response) => {
        axiosDebug('Netlify build triggered')
    }) 
    .catch((error) => {
        if (error.response) {
            axiosDebug('Axios: server responded with a error status code')

            console.error(`Error: ${error.response.status}, ${error.message}`)
            console.error(error.response.data)
        } else {
            axiosDebug('Axios: request was made but no response was received')

            console.error('Error: ', error.message);
        }
        console.error(error.config);
    })
}