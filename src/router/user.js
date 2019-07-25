const User = require('../models/user')
const express = require('express')
const multer = require('multer')
// const sharp = require('sharp')
const router = express.Router()
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendGoodbyeEmail } = require('../emails/account')

router.post('/users', async (req, res)=>{
    const user = new User(req.body)
    try {
        const users = await user.save()
        sendWelcomeEmail(users.email, users.name)
        const token = await user.generateAuthToken()
        res.status(201).send({users, token})
    }catch(e){
    res.status(400).send(e)
    }
    })

    router.post('/users/login', async (req, res)=>{
        try{
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({ user, token })
        }catch(e){
            res.status(400).send()
        }
})

router.post('/users/logout', auth, async (req, res)=>{
    try{
    req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
    })   
    await req.user.save()
    res.send()
}catch(e){
res.status(500).send(e)
}
})

router.post('/users/logoutAll', auth, async (req, res)=>{
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

    router.get('/users/me', auth, async (req, res)=>{
        res.send(req.user)
     })
    
    router.get('/users/:id', async (req, res)=>{
        const _id = req.params.id
    
    try{
    const user = await User.findById(_id)
    if(!user){
    res.status(404).send()
    }
    res.send(user)
    }catch(e){
    res.status(500).send()
    }
    })
    
    router.patch('/users/me', auth, async (req, res)=>{
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'email', 'password', 'age']
        const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    
        if(!isValidOperation){
            return res.status('400').send({error: 'Invalid Updates!'})
        } 
    try {
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    }catch(e){
    res.status(400).send(e)
    }
        
    })
    
    router.delete('/users/me', auth, async (req, res)=>{
        try{
               await req.user.remove()
               sendGoodbyeEmail(req.user.email, req.user.name)
               res.send(req.user)
            }
            catch(e){
        res.status(400).send(e)
        }
    })



    const upload = multer({
        limits: { 
            fileSize: 1000000 
        },
        fileFilter(req, file, cb){
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                return cb(new Error('Please upload an image'))
               
            }
            cb(undefined, true)
        }
    })
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res)=>{

// const buffer = sharp(req.file.buffer).resize({width: 250, height:250}).png().toBuffer()

    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next)=>{
res.status(400).send({ Error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res)=>{
req.user.avatar = undefined
await req.user.save()
res.send()
})

router.get('/users/:id/avatar', async (req, res)=>{
const _id = req.params.id
    try{
          const user = await User.findById(_id)

          if(!user || !user.avatar){
           throw new Error()
          }
          res.set('Content-Type','image/jpg')
          res.send(user.avatar)
        } catch(e) {
            res.sendStatus(400).send(e)
        }
})


    module.exports = router