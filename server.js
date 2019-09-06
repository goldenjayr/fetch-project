const express = require('express')
const Datastore = require('nedb')

const app = express()
const database = new Datastore('database.db')
database.loadDatabase()

// these act like middleware.... the requests pass through these methods
app.use(express.static('public'))
app.use(express.json())

app.post('/api', (req, res) => {
    const data = req.body
    const timestamp = Date.now()
    data.timestamp = timestamp
    database.insert(data)
    res.json({
        status: 'success',
        latitude: req.body.latitude,
        longitude: req.body.longitude
    })
})

app.listen(3000, () => console.log('listening to port 3000'))
