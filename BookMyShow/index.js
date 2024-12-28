const express = require('express');
const port = 8001;
const path = require('path')
const db = require('./config/db')
const app =  express()

app.use(express.urlencoded())

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join('assets')));
app.use('/uploads',express.static(path.join('uploads')));

app.use('/',require('./routes/movieRoutes'))

app.listen(port,err=>console.log(err?err:"server ruyning on http://localhost:"+port))