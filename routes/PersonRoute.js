const express=require('express');
const router=express.Router();

const Person=require('../Models/person');

//Post route to send data

router.post('/',async(req,res) =>{

    try {
        //Creating a newperson document using Person Model

        const data= req.body
        const newPerson= new Person(data);

        //Saving the data to database
        
        const response= await newPerson.save();
        console.log("Data Saved");
        res.status(200).json(response);


    } catch (err) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'}); 
    }
})

// Get data of person 

router.get('/',async (req,res)=>{
    try {
     const data=await Person.find();
     console.log("Data Fetched");
     res.status(200).json(data);
    } catch (err) {
     console.log(err);
     res.status(500).json({error:'Internal Server Error'}); 
    }
 })
 
 
router.get('/:worktype', async (req,res)=>{
    try {
        const worktype=req.params.worktype
        if(worktype=='chef' || worktype=='manager' || worktype=='waiter'){
            const response=await Person.find({work: worktype});
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
        const personid=req.params.id;
        const updatePersondata =req.body;

        const response=await Person.findByIdAndUpdate(personid,updatePersondata,{
            new: true,
            runValidators :true,
        })

       
       if(!response){
        return res.status(404).json({error :"Person not Found"});
       }
       else{
        console.log("PersonData Updated");
        res.status(200).json(response);
       }
        
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'}); 
    }
})
router.delete('/:id',async (req,res)=>{
    try {
        const personid=req.params.id;
        const response=await Person.findByIdAndDelete(personid);
        if(!response){
            return res.status(404).json({error :"Person not Found"});

        }     
        console.log("PersonData Deleted");
        res.status(200).json(response);
           
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'Internal Server Error'}); 
    }

})
module.exports = router;
