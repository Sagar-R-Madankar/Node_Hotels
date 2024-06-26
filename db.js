const mongoose=require('mongoose');

//Define the Mongodb Connection Url
const mongoURL="mongodb://localhost:27017/hotels";

mongoose.connect(mongoURL,{
    // useNewUrlParser: true,
    // useUnifiedTopology : true
})

const db=mongoose.connection;

db.on('connected',()=>{
    console.log("Connected to MongoDB Server");
})
db.on('error',(err)=>{
    console.log("MongoDB Connection Error..");
})
db.on('disconnected',()=>{
    console.log("Disconnected from MongoDB Server");
})

module.exports=db;