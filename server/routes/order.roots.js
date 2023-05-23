const Router = require('express')
const Product = require('../models/product.js')
const Order = require('../models/order')
const {check,validationResult} =require('express-validator')
const User = require("../models/user")
const fileService = require('../services/fileService')
const fileController = require('../controllers/fileController')
const authMiddleware = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = new Router()
const tgController = require('../controllers/telegramController.js')
router.post('/upload', fileController.uploadFile)
router.post('/createOrder',
    [
        //check('name','Uncorrect name').isLength({min:3,max:100}),
        //check('type','Uncorrect type').isLength({min:3,max:100}),
        //check('mark','Uncorrect mark').isLength({min:3,max:100}),
        //check('price','Uncorrect price').isFloat,
    ],
    async (req,res)=>{
        try {

            const {adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs} =req.body
            let user =req.body.user ? req.body.user: null
            console.log(adress, fio, phone, type, mark, timeInUse, comment, urgency, time, imgs, user)
            const order = new Order({adress, phone, fio, type, mark, timeInUse, comment, urgency, time, imgs, user,chek:false})
            console.log(order)
            await order.save()
            await User.updateOne({_id: '641336ac79efeb6dad283d86'},{notice:'Новый заказ'})
            tgController.send(1759163276, 'Новый заказ! \nАдресс: '+adress+'\nФио: '+ fio+'\nТелефон: '+ phone+'\nТип: '+ type+'\nМарка: '+ mark+'\nВремя в использовании: '+ timeInUse+'\nКомментарий: '+ comment+'\nСрочная: '+ urgency +'\nЖелательное время: '+ time);
            return res.json({order})
        }catch (e){
            console.log(e)
            console.log("aeaeazzz")
        }
    })
router.post('/redactOrder',
    [
        //check('name','Uncorrect name').isLength({min:3,max:100}),
        //check('type','Uncorrect type').isLength({min:3,max:100}),
        //check('mark','Uncorrect mark').isLength({min:3,max:100}),
        //check('price','Uncorrect price').isFloat,
    ],
    async (req,res)=>{
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message:'Uncorrect request', errors})
            }
            console.log(req.body.imgs)
            console.log(req.body)
            const newOrder = await Order.updateOne({_id: req.body.id},{$set:{adress:req.body.adress, fio:req.body.fio, phone:req.body.phone, type:req.body.type, mark:req.body.mark, timeInUse:req.body.timeInUse, comment:req.body.comment, urgency:req.body.urgency, time:req.body.time, imgs:req.body.imgs,chek:false}})
            console.log(newOrder)

            return res.json({message:"Product was redacted"})
        }catch (e){
            console.log(e)
        }
    })

const ItemsPerPage=12
router.get('/getOrders',
    async (req, res) => {
        const page=req.query.currentPage || 1
        console.log('-------------------------------------------------')
        console.log(req.query)
        try {

            const count = await Order.find().count()
            const pageCount = Math.ceil(count / ItemsPerPage)

            let skip;
            console.log(pageCount,page)
            if(req.query.revers==='true')
            {
                skip =((pageCount-page) * ItemsPerPage)-(ItemsPerPage-(count-((pageCount-1) * ItemsPerPage)))
            }
            else
            {skip =(page-1) * ItemsPerPage}
            let products = await Order.find().skip(skip>=0?skip:0).limit(skip>=0?ItemsPerPage:ItemsPerPage+skip)

            return res.json({pagination:{count,pageCount},products})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.get('/getOrder',
    async (req, res) => {
        try {
            console.log(req.query.orderId);
            await Order.updateOne({_id:req.query.orderId},{chek:true})
            const order = await Order.findOne({_id:req.query.orderId})
            return res.json({order})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })
router.get('/deleteOrder',authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({_id: req.user.id})
            if(user.role=='admin') {
                fileService.deleteFile(req.filepath+'/orders/'+req.query.UID)
            const order = await Order.findOneAndDelete({_id:req.query.UID})
            return res.json({order})
            }
            else
            {
                return res.status(500).json({message: "No authorizated req"})
            }
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Can not get files"})
        }
    })


module.exports = router