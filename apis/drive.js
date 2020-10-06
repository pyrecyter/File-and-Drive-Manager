const express = require('express')
const router = express.Router()
const { google } = require('googleapis')
const credentials = require('../credentials.json')
const fs = require("fs")
const formidable = require('formidable')

const client_id = credentials.web.client_id
const client_secret = credentials.web.client_secret
const redirect_uris = credentials.web.redirect_uris
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])
const drive = google.drive({ version: 'v3', auth: oAuth2Client })

const auth = (req, res, next) => {
    if (req.body.token == null) return res.status(400).send('Token not found')
    oAuth2Client.setCredentials(req.body.token)
    next()
}

router.post('/getFiles', auth, (req, res) => {
    drive.files.list({
    }, (err, response) => {
        if (err) {
            console.log('The API returned an error: ' + err)
            return res.status(400).send(err)
        }
        const files = response.data.files
        if (files.length) {
            console.log('Files:')
            files.map((file) => {
                console.log(`${file.name} (${file.id})`)
            })
        } else {
            console.log('No files found.')
        }
        res.send(files)
    })
})

router.post('/download/:id', auth, (req, res) => {
    var fileId = req.params.id
    drive.files.get({ fileId: fileId, alt: 'media' }, { responseType: 'stream' },
        function (err, response) {
            if (err) { console.log(err); return res.status(400).send(err) }
            response.data
                .on('end', () => {
                    console.log('Done')
                })
                .on('error', err => {
                    console.log('Error', err)
                })
                .pipe(res)
        })

})

router.post('/delete/:id', auth, (req, res) => {
    var fileId = req.params.id
    drive.files.delete({ 'fileId': fileId }).then((response) => { res.send(response.data) }).catch((error) => res.send(error))
})

router.post('/upload', (req, res) => {
    var form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        if (err) return res.status(400).send(err)
        const token = JSON.parse(fields.token)
        console.log(token)
        if (token == null) return res.status(400).send('Token not found')
        oAuth2Client.setCredentials(token)
        console.log(files.file)
        const drive = google.drive({ version: "v3", auth: oAuth2Client })
        const fileMetadata = {
            name: "file_" + Date.now() + "_" + files.file.name,
        }
        const media = {
            mimeType: files.file.type,
            body: fs.createReadStream(files.file.path),
        }
        drive.files.create(
            {
                resource: fileMetadata,
                media: media,
                fields: "id",
            },
            (err, file) => {
                if (err) {
                    console.error(err)
                    res.status(400).send(err)
                } else {
                    res.send('Successful')
                }
            }
        )
    })
})

module.exports = router