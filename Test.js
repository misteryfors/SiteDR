var http =require("http");
var fs =require("fs");
var path =require("path");

//const test = require("TestModel.js");
//const { MongoClient } =require('mongodb');
//const uri ='mongodb+srv://mistfors:yjdbrjd9271@cluster0.lemukar.mongodb.net/?retryWrites=true&w=majority';
//const client=new MongoClient(uri);
//client.connect();
//var html=require("node:test.html")
//let fileContent = fs.readFileSync("test.html", "utf8");
    //<button name="send">Отправить</button>
http.createServer(function (request,response)
{
    if (request.url==='/autorizetion')
    {
        autorization(request,response,"users");

    }
    else
    //response.setHeader("Content-Type", "text/html");
    if (request.url==='/')
    {
         sendRes('html\\test.html','text/html',response);

    }
    else
    if(request.url == "/add"){
        //add();
        add(request,response,"test");
        //add(request,response,"test");
        //save(request,response,test)
    }
    else
    if(request.url == "/take"){
        //add();
        take(request,response,"test");
        //save(request,response,test)
    }
    else
    if(request.url == "/delet"){
        //add();
        delet(request,response,"test");
        //add(request,response,"test");
        //save(request,response,test)
    }
    else
    if(request.url == "/update"){
        //add();
        update(request,response,"test");
        //add(request,response,"test");
        //save(request,response,test)
    }

    else if(/\/uploads\/[^\/]+$/.test(request.url)&& request.method==='POST') {
        {
            //sendRes('mega.css','text/css',response);
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString();
            });
            request.on('end', () => {
                console.log(body);
                let params = parse(body);
                console.log(params);
                console.log(params.hi);

            });
        }
    }
    else
        sendRes(request.url,getcontentType(request.url),response);
    //response.write(fileContent);



    //response.end('hell world?');
}).listen(3000);


//send
function sendRes(url,contentType,res){
    let file=path.join(__dirname,url);
    fs.readFile(file,(err,cotent)=>{
        if (err){
            res.writeHead(404);
            res.write('file not found');
            res.end();
            console.log(`error 404 ${file}`);
        }
        else
        {
            res.writeHead(200,{'Content-Type':contentType});
            res.write(cotent);
            res.end();
            console.log(`error 200 ${file}`);
        }
    })
}
function getcontentType(url)
{
    switch (path.extname(url)){
        case ".html":
            return "text/html";
        case ".css":
            return "text/css";
        case ".js":
            return "text/javascript";
        case ".json":
            return "application/json";
        default :
            return "application/octate-stream";

    }
}
async function wait(request,response){
        const buffers = [];
        for await (const chunk of request) {
            buffers.push(chunk);
        }

        const data = Buffer.concat(buffers).toString();
        const user = JSON.parse(data); // парсим строку в json

        // изменяем данные полученного объекта

        const db = client.db("usersdb");
        const collection = db.collection("users1");
        collection.insertOne(user, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(user);


    });
        // отправляем измененый объект обратно клиенту
        response.end(JSON.stringify(user));
}

async function save(request,response,todo){
    await todo.save()
}
async function wait(request,response){
    const buffers = [];
    for await (const chunk of request) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    const user = JSON.parse(data); // парсим строку в json

    // изменяем данные полученного объекта

    const db = client.db("usersdb");
    const collection = db.collection("users1");
    collection.insertOne(user, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(user);


    });
    // отправляем измененый объект обратно клиенту
    response.end(JSON.stringify(user));
}
async function add(request,response, colletion){

    const buffers = [];
    for await (const chunk of request) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    const user = JSON.parse(data); // парсим строку в json

    // изменяем данные полученного объекта

    const db = client.db("usersdb");
    const collection = db.collection(colletion);
    console.log("----------------------------")
    console.log(user);
    collection.insertOne(user, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(user);


    });
    // отправляем измененый объект обратно клиенту
    response.end(JSON.stringify(user));
}
async function take(request,response, colletion){

    const buffers = [];
    for await (const chunk of request) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    const user = JSON.parse(data); // парсим строку в json

    // изменяем данные полученного объекта

    const db = client.db("usersdb");
    const collection = db.collection(colletion);
    console.log(user);
    let cursor=collection.find(user.id ==''?'': {id:user.id});
    cursor.toArray(function(err, result){

        if(err){
            return console.log(err);
        }



        response.end(JSON.stringify(result));
    });
    // отправляем измененый объект обратно клиенту

}
async function delet(request,response, colletion){

    const buffers = [];
    for await (const chunk of request) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    const user = JSON.parse(data); // парсим строку в json

    // изменяем данные полученного объекта

    const db = client.db("usersdb");
    const collection = db.collection(colletion);
    collection.deleteOne({id:user.id}, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(user);


    });
    // отправляем измененый объект обратно клиенту
    response.end(JSON.stringify(user));
}
async function update(request,response, colletion){

    const buffers = [];
    for await (const chunk of request) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    const user = JSON.parse(data); // парсим строку в json

    // изменяем данные полученного объекта

    const db = client.db("usersdb");
    const collection = db.collection(colletion);
    console.log("----------------------------")
    console.log(user);


    collection.findOneAndUpdate({id:user.id}, {$set:{colum:user.colum}}, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(user);


    });
    // отправляем измененый объект обратно клиенту
    response.end(JSON.stringify(user));
}
async function autorization(request,response, colletion){

    const buffers = [];
    for await (const chunk of request) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    const user = JSON.parse(data); // парсим строку в json

    // изменяем данные полученного объекта

    const db = client.db("usersdb");
    const collection = db.collection(colletion);
    console.log("----------------------------")
    console.log(user);


    collection.findOne({name:user.name,password:user.password}, function(err, result){

        if(err){
            return console.log(err);
        }
        console.log(result);
        console.log(user);
        if (result)
        {
            response.end(JSON.stringify(true));
        }

    });
    response.end(JSON.stringify(false));
    // отправляем измененый объект обратно клиенту
}


