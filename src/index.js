const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const userRouter = require('./router/user')
const taskRouter = require('./router/task')

const app = express();

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log("Server is up and running on port " + port);
})


// const multer = require('multer')
// const upload = multer({
//     dest: 'images'
// })

// app.post('/upload', upload.single('upload'), (req, res)=>{
// res.send()
// })