const axios = require('axios')
const debug = require('debug')('controller:buildController')

const {buildMessage, telegram} = require('../config')
const getCurrentTime = require('../helpers/getTime')

var baseURL = 'https://api.telegram.org';

exports.build_started = async (req, res, next) => {
    if(req.header('X-Netlify-Event') === 'deploy_building' ) {
        let dateTime = await getCurrentTime()
        sendBuildStatus(buildMessage.startMessage, dateTime)
        res.sendStatus(200)
    }
    else {
        res.locals.wrongClient = true
        next()
    }
}

exports.build_succeeded = async (req, res, next) => {
    if(req.header('X-Netlify-Event') === 'deploy_created' ) {
        let dateTime = await getCurrentTime()

        let mssg = `${buildMessage.successMessage} \nSite is live \n${req.body.url}`

        sendBuildStatus(mssg, dateTime)
        res.sendStatus(200);
    }
    else {
        res.locals.wrongClient = true
        next()
    }
}

exports.build_failed = async (req, res, next) => {
    let dateTime = await getCurrentTime()
    sendBuildStatus(buildMessage.failureMessage, dateTime)

    //remove when build_failed 'X-Netlify-Event' is known
    debug(`build_failed event: ${req.header('X-Netlify-Event')}`)

    res.sendStatus(200);
}

function sendBuildStatus(message, time) {

    axios({
        method: 'get',
        url: `${baseURL}/bot${telegram.botToken}/sendMessage`,
        params: {
            chat_id: `@${telegram.channelUsername}`,
            text: `${message}\n${time}`
        }
    })
    .then((response) => {
        response.data.ok ?
            debug('Message sent successfully') :
            debug(`Error: ${response.data}`)
        
        let debugMessage = `${baseURL} ${process.env.NODE_ENV === 'development' ? 
            response.config.url : ''} ${JSON.stringify(response.config.params)}`
            
        debug(`GET: ${debugMessage}`)
    })
    .catch((error) => {
        if (error.response) {
            debug('Axios: server responded with a error status code')

            console.error(`Error: ${error.response.status}, ${error.message}`)
            console.error(error.response.data)
        } else {
            debug('Axios: request was made but no response was received')

            console.error('Error: ', error.message);
        }
        console.error(error.config);
    })
}
