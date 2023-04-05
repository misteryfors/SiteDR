const fileService = require('../services/fileService')
const config = require('config')
const fs = require('fs')
const Product = require('../models/Product')
const {json} = require("express");
const User = require("../models/User")

class AdminOnly {
    async uploadFile(req, res) {
        try {
            const file = req.files.file

            const {UID,DIR} = await req.body
            console.log(UID,DIR,'------------------')
            let path = `${config.get('filePath')+'/'+DIR}\\${UID}`
            console.log(path)
            if (!fs.existsSync(path)) {
                await fileService.createDir(path)
            }

            console.log(path)
            if (!fs.existsSync(`${path}\\${file.name}`)) {
                console.log('name : '+file.name)
            }
            else
            {
                let fileExt = file.name.split('.').pop();
                let baseName = file.name.slice(0, -fileExt.length - 1);
                let i = 1;
                while (fs.existsSync(`${path}\\${file.name}`)) {
                    file.name = `${baseName}_${i}.${fileExt}`;
                    i++;
                    console.log('fname : '+file.name)
                }
            }
            path = `${path}\\${file.name}`
            file.mv(path)
            let fname=file.name;
            return res.json({fname})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Upload error"})
        }
    }
    async deleteFile(req, res) {
        try {
            const file = await File.findOne({_id: req.query.id, user: req.user.id})
            if (!file) {
                return res.status(400).json({message: 'file not found'})
            }
            fileService.deleteFile(file)
            await file.remove()
            return res.json({message: 'File was deleted'})
        } catch (e) {
            console.log(e)
            return res.status(400).json({message: 'Dir is not empty'})
        }
    }

}

module.exports = new AdminOnly()