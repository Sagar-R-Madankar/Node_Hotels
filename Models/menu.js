const mongoose=require('mongoose');

//Define the Menu Schema

const MenuSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required:true
    },
    taste :{
        type : String,
        enum :["sweet","spicy","sour"],
        required :true
    },
    is_drink :{
        type : Boolean,
        default: false
    },
    ingredients :{
        type: [String],
        default :[]
    },
    nums_sales :{
        type :Number,
        default:0
        
    }


})


// Creating a Menu Model
 const Menu =mongoose.model('Menu',MenuSchema);
 module.exports = Menu;
