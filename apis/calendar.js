const express = require('express')
const router = express.Router()
const { google } = require('googleapis')
const credentials = require('../credentials.json')

const client_id = credentials.web.client_id
const client_secret = credentials.web.client_secret
const redirect_uris = credentials.web.redirect_uris
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

const auth = (req, res, next) => {
    if (req.body.token == null) return res.status(400).send('Token not found')
    oAuth2Client.setCredentials(req.body.token)
    next()
}

router.post('/events', auth, (req, res) => {
    var oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1)
    calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        timeMax: oneYearFromNow.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, response) => {
        if (err) return console.log('The API returned an error: ' + err)
        const events = response.data.items
        if (events.length) {
            console.log('Upcoming events:')
            events.map((event, i) => {
                const start = event.start.dateTime || event.start.date
                console.log(`${start} - ${event.summary}`)
            })
        } else {
            console.log('No upcoming events found.')
        }
        res.send(events)
    })
})

router.post('/insert', auth, (req, res) => {
    if (req.body.event == null) return res.status(400).send('Event not found.')
    calendar.events.insert({
        calendarId: 'primary',
        resource: req.body.event,
    }, function (err, event) {
        if (err) {
            console.log('There was an error contacting the Calendar service: ' + err)
            return res.status(500).send('Error')
        }
        console.log('Event created: %s', event.htmlLink)
        res.send('Success');
    });
})

router.post('/delete/:id', auth, (req, res) => {
    calendar.events.delete({ 'calendarId': 'primary', 'eventId': req.params.id }).then((response) => res.send(response.data)).catch((error) => res.send(error.message))
})

module.exports = router