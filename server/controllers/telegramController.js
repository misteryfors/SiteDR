const fileService = require('../services/fileService')
const config = require('config')
const fs = require('fs')
const Product = require('../models/product.js')
const {json} = require("express");
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot('6009601494:AAFoudTNxnP2L5FATc8pB13QoumU_Ep5pkg', { polling: false});
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;

    // Ваш код для обработки сообщений

    // Пример отправки ответного сообщения
    bot.sendMessage(chatId, 'Привет, я получил твое сообщение! '+chatId);
});
class TelegramController {

    send(chatId,msg){
        try {
            bot.sendMessage(msg)
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new TelegramController()