const express = require('express')
const multer = require('multer')
const path =  require('path')
const cors = require('cors')

const PORT = 5000
const app = express()

app.use(cors())

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage: fileStorageEngine})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"))
})

app.post('/single', upload.single('image'), (req, res) => {
    console.log(req.file)
    res.send('Single File upload success')
})

app.post('/multiple', upload.array('images', 3), (req, res) => {
    console.log(req.files)
    res.send('Multiple File upload success')
})

app.listen(PORT, () => {
    console.log("server running on PORT: " + PORT)
})