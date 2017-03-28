const dotenv = require('dotenv')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Datastore = require('@google-cloud/datastore')

dotenv.load()

const app = express()
const datastore = Datastore({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_KEY_FILE
})

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
 res.send('healthy')
})
app.post('/signup', (req, res) => {
  const key = datastore.key('Signups')
  const data = req.body

  datastore.save({key, data}, (err) => {
    if (!err) {
      res.send(data)
    } else {
      console.error(err)
      res.status(500).send(err)
    }
  })
})

app.listen(process.env.PORT, () => {
  console.log('API started')
})
