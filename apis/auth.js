const express = require('express')
const router = express.Router()
const { google } = require('googleapis')
const credentials = require('../credentials.json')

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/calendar']
const client_id = credentials.web.client_id
const client_secret = credentials.web.client_secret
const redirect_uris = credentials.web.redirect_uris
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

router.get('/oauth', (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    return res.send(authUrl)
});

router.post('/validate', (req, res) => {
    if (req.body.code == null) return res.status(400).send('Invalid Request')
    oAuth2Client.getToken(req.body.code, (err, token) => {
        if (err) {
            console.error('Error retrieving access token', err)
            return res.status(400).send('Error retrieving access token')
        }
        res.send(token)
    })
})

module.exports = router