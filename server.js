const winston =require('winston');
const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');

const app=express();
app.use(bodyParser.json());

require('./Startup/db')();
require('./Startup/config')();
require("./startup/cors")(app);
//Routes
const Register=require('./routes/register');

app.use(`${config.get('API_URL')}/Register`, Register);

app.get('/',(req,res)=>{
    res.send("Welcome you can not  use it without permission")
})


const port =process.env.PORT || config.get('port');
const server =app.listen(port,()=>
    winston.info(`Listening on port ${port}`)
)

module.exports=server;