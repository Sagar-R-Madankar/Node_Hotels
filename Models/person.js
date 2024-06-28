const mongoose=require('mongoose');
const brcypt=require('bcrypt');

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
    },
    username:{
        type :String,
        required :true
    },
    password :{
        type : String ,
        required :true
    }


})

PersonSchema.pre('save',async function(next){
    const person=this;
    //Hash the password only if it has been modified  or is new
    if(!person.isModified('password')){
        return next();
    }
    try {
        //hash password generation
        const salt=await brcypt.genSalt(10);

        //hash password

        const hashPassword= await brcypt.hash(person.password,salt);

        //Override the plain password with hash password
        person.password=hashPassword;
        next();

    } catch (err) {
        return next(err);
        
    }
})

PersonSchema.methods.ComparePassword= async function(candidatepassword){
    try {
        
        //Use bcrypt to compare the provided password with the hashed password

        const isMatch=await brcypt.compare(candidatepassword,this.password);

        return isMatch;
    } catch (err) {
        
        throw err;
        
    }
}
// Creating a Person Model
 const Person=mongoose.model('Person',PersonSchema);
 module.exports = Person;
