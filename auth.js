const passport=require('passport');
const LocalStrategy =require('passport-local').Strategy;
const Person=require('./Models/person');

passport.use(new LocalStrategy(async (USERNAME,PASSWORD,done)=>{
    //Authentication Logic Here  !!!

    try {
        // console.log("Received Credintials ::",USERNAME,PASSWORD);
        const user = await Person.findOne({username: USERNAME});
        if(!user){
            return done(null,false,{message:"Incorrect Username."});
        }
        const isPasswordMatch= await user.ComparePassword(PASSWORD);
        if(isPasswordMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message : "Incorrect Password"});
        }
    } catch (err) {
        return done(err);
    }
}))
module.exports=passport;