const Router = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const config = require("config")
const jwt = require("jsonwebtoken")
const {check,validationResult} =require('express-validator')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const Chat = require("../models/chat");
const fileService = require("../services/fileService");


router.post('/registration',
    [
        check('email','Uncorrect email').isEmail(),
        check('password','Password must be longer than 3 and shorter than 12').isLength({min:3,max:12})
    ],
    async (req,res)=>{
    try {
        console.log(req.body)
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message:'Uncorrect request', errors})
        }

        const {email, password} =req.body
        console.log(email,password)
        const candidate = await User.findOne({email})

        if(candidate) {
            return res.status(400).json({message: 'User with email '+email+' already exist'})
        }
        const hashPassword =await bcrypt.hash(password, 15)
        const newUser = new User({email,password: hashPassword,role:"client",name:email,notice:'Вы успешно зарегистрированны'})
        await newUser.save()
        const token = jwt.sign({id: newUser.id}, config.get("secretKey"), {expiresIn: "1h"})
        const fUser = await User.findOne({_id:newUser.id})
        const sUser = await User.findOne({_id:'641336ac79efeb6dad283d86'})
        const chat = new Chat({firstUser:newUser.id,secondUser:'641336ac79efeb6dad283d86',firstUserName:fUser.name,secondUserName:sUser.name,messages:[],notice:'Поздравляем вы зарегестрированны'})
        await chat.save()
        await fileService.createDir(`${req.filepath+'/'+'orders'}\\${newUser.id}`)
        console.log(newUser)
        console.log(token)
        return res.json({
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                avatar: newUser.avatar
            }
        })
    }catch (e){
        console.log(e)
    }
})

router.post('/login',
    async (req,res)=>{
        try {

            const {email, password} = req.body
            console.log(email,password)
            const user = await User.findOne({email})
            if (!user) {
                console.log("Пользователь не зарегестрирован")
                return res.status(404).json({message: "Пользователь не зарегестрирован"})
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                console.log("Не верный пароль")
                return res.status(400).json({message: "Не верный пароль"})
            }
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            console.log(token, user.id, user.email, user.role, user.avatar)
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    phone: user.phone,
                    name: user.name
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            console.log(req.user)
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    phone: user.phone,
                    name: user.name
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })

router.get('/getNotice', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            let notice=user.notice
            if (notice!='')
            {
            console.log(req.user)
            setTimeout(async () => {
                await User.updateOne({_id: req.user.id},{notice:''})
            }, 4000);
            return res.json({
                    notice
            })
            }
            else
                return res.json({
                    notice:''
                })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })


router.post('/ChangeAcc',
    async (req, res) => {
        try {
            console.log(req.body.password)
            if (req.body.password=="******" || req.body.password=="*****" || req.body.password=="****" || req.body.password=="***" || req.body.password=="**" || req.body.password=="*" || req.body.password=="")
            {console.log(1)
                await User.updateOne({_id: jwt.decode(req.body.Firsttoken).id},{$set: {email : req.body.email, phone:req.body.phone, name: req.body.name}})}
            else
            {
                console.log(2)
                await User.updateOne({_id: jwt.decode(req.body.Firsttoken).id},{$set: {email : req.body.email,password: await bcrypt.hash(req.body.password, 15), phone:req.body.phone, name: req.body.name}})
            }
            const user = await User.findOne({_id: jwt.decode(req.body.Firsttoken).id})
            console.log(user,jwt.decode(req.body.Firsttoken).id)
            const token = jwt.sign({id: user.id}, config.get("secretKey"), {expiresIn: "1h"})
            console.log(token, user.id, user.email, user.role, user.avatar)
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                    phone: user.phone,
                    name: user.name
                }
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    })
module.exports = router