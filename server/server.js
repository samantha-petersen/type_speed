const express = require('express')
const app = express()
const Paragraphs = require('./model/paragraphs_model')
const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' && 3000) || 3001
const path = require('path')
app.use(express.json())

app.use('/api/paragraphs/:amount', (req, res) => {
  const num = req.params
  Paragraphs.limit(num.amount)
    .then(paragraphs => res.json(paragraphs))
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`*** Listening on port ${PORT} ***`)
})