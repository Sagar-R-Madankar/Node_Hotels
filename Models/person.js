const mongoose=require('mongoose');

//Define the Person Schema
const PersonSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type : String ,
        enum :['chef','manager','waiter'],
        required: true
    },
    mobile:{
        type :String ,
        required :true
    },
    email :{
        type : String ,
        required :true,
        unique :true
    },
    address :{
        type : String 
    },
    salary :{
        type: Number,
        required :true
    }


})

// Creating a Person Model
 const Person=mongoose.model('Person',PersonSchema);
 module.exports = Person;
