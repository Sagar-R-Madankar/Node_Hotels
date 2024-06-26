const express=require('express');
const router=express.Router();


const Menu=require('../Models/menu');

// Post data to database

router.post('/',async (req,res)=>{
    try {
       const Menudata= req.body
       const Menuitems= new Menu(Menudata);
       const response= await Menuitems.save();

       console.log("Menu Saved");
       res.status(200).json(response);

    } catch (err) {
     console.log(err);
     res.status(500).json({error:'Internal Server Error'}); 
    }
})

//Get Menu from DB


router.get('/', async (req,res)=>{
    try {
        const data=await Menu.find();
        console.log("Menu Fetched");
        res.status(200).json(data);
       } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'}); 
       }
})

router.get('/:tastetype', async (req,res)=>{
    try {
        const tastetype=req.params.tastetype
        if( tastetype=='spicy' || tastetype=='sweet' || tastetype=='sour'){
            const response=await Menu.find({taste: tastetype});
            console.log("Response Fetched");
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error: 'Internal Server Error'});
        }

        
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'}); 
    }
})


router.put('/:id',async (req,res)=>{
    try {
        const menuid=req.params.id;
        const updatemenudata =req.body;

        const response=await Menu.findByIdAndUpdate(menuid,updatemenudata,{
            new: true,
            runValidators :true,
        })

       
       if(!response){
        return res.status(404).json({error :"Menu not Found"});
       }
       else{
        console.log("Menudata Updated");
        res.status(200).json(response);
       }
        
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'}); 
    }
})
router.delete('/:id',async (req,res)=>{
    try {
        const menuid=req.params.id;
        const response=await Menu.findByIdAndDelete(menuid);
        if(!response){
            return res.status(404).json({error :"Menu not Found"});

        }     
        console.log("Menudata Deleted");
        res.status(200).json(response);
           
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'}); 
    }

})
//Comment added for testing purpose
module.exports=router;