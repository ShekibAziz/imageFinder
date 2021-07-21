const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')
const serveIndex = require('serve-index')
const cors = require('cors')

const app = express()

app.use(cors())

const port = 8000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Handling uploading
const upload = multer({ dest: path.join(__dirname, './public') })
app.post('/upload', upload.single('file'), (req, res) => {
  const tempPath = req.file.path
  const randomNum = Math.floor(Math.random() * 1000)
  const targetPath = path.join(
    __dirname,
    `./public/${req.file.originalname + randomNum}`
  )

  fs.rename(tempPath, targetPath, (err) => {
    res.status(200).contentType('text/plain').end('File uploaded!')
  })
})

app.use(express.static(path.join(__dirname, 'public')))
app.use('/', serveIndex(path.join(__dirname, 'public')))
