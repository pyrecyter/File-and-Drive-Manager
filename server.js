const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('API Running'))

app.use('/auth', require('./apis/auth'))
app.use('/user', require('./apis/user'))
app.use('/drive', require('./apis/drive'))
app.use('/calendar', require('./apis/calendar'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started ${PORT}`));