const express = require('express')
const router = express.Router()
const { google } = require('googleapis')
const credentials = require('../credentials.json')

const client_id = credentials.web.client_id
const client_secret = credentials.web.client_secret
const redirect_uris = credentials.web.redirect_uris
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
const oauth2 = google.oauth2({ version: 'v2', auth: oAuth2Client })

const auth = (req, res, next) => {
    if (req.body.token == null) return res.status(400).send('Token not found')
    oAuth2Client.setCredentials(req.body.token)
    next()
}

router.post('/getUserInfo', auth, (req, res) => {
    oauth2.userinfo.get((err, response) => {
        if (err) res.status(400).send(err);
        console.log(response.data)
        res.send(response.data)
    })
})

module.exports = router