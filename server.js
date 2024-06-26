const express=require('express');
const app=express();
const db=require('./db');

const bodyParser= require('body-parser');
app.use(bodyParser.json());
const PersonRoutes=require('./routes/PersonRoute');
const MenuitemsRoutes=require('./routes/menuitemsroutes');

app.get('/',function(req,res){
    res.send("Welcome to my hotel , how can i help you?..");
})


app.use('/person', PersonRoutes);


app.use('/menu', MenuitemsRoutes);


app.listen(3000,()=>{
    console.log("Listening on Port 3000");
})

