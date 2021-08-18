const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.listen(3000)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.post('/', async (req, res) => {
    try{
        if (req.is('text/*')) {
            req.body = JSON.parse(req.body)
            if (req.body.SubscribeURL) {
              await got(req.body.SubscribeURL)
              return res.end()
            }
        }

        const body = JSON.parse(req.body.Message)

        if (!body.eventType) { return res.end() }

        const event = body.eventType.toLowerCase()
        const eventData = body
        console.log(JSON.stringify(eventData, null,2))

        const domain = event_data.mail.tags['ses:from-domain'][0]
        const messageId = event_data.mail.messageId
        const date = new Date(eventData.mail.timestamp)
        const email = event_data.mail.destination[0]
        const subject = eventData.mail.commonHeaders.subject

        if (event == 'delivery'){
            const ua = eventData.delivery.userAgent
        } else if (event == 'reject') {
            const ua = eventData.complaint.userAgent
            const reason = eventData.reject.reason
            // do stuff here
        } else if (event == 'bounce') {
            const description = eventData.bounce.bouncedRecipients[0].diagnosticCode
            // do stuff here
        } else {
            console.log('nothing')
        }

        return res.end()
    } catch (err) {
        console.log(err)
        res.end()
    }
})