import User from "../models/usermodel.js"
import bcrypt from 'bcryptjs'
import jwtandsetmycookie from "../utils/jwttoken.js"
export const login=async(req,res)=>{
    try{
       const {username,password}=req.body;
       const user=await User.findOne({username});
       const isPasswordCorrect=await bcrypt.compare(password,user?.password||"");
       if(!user|| !isPasswordCorrect){
        res.status(400).json({error:"Invalid Credentials"});
       }
       jwtandsetmycookie(user._id,res);
       res.status(200).json({
        _id:user._id,
        fullName:user.fullName,
        username:user.username,
        profilePic:user.profilePic
      });
    }
    catch(err){
        console.log("Error in login controller",err.message)
        res.status(500).json({error:'Internal server error'})
    }
}

export const logout=async(req,res)=>{
    try{
        res.cookie("jwt","",{
            maxAge:0
        })
       res.status(200).json({msg:"Logged out successfully"})
    }
    catch(err){
        console.log("Error in logout controller",err.message)
        res.status(500).json({error:'Internal server error'})
    }

}

export const signUp=async(req,res)=>{
    try{
      const {fullName,username,password,confirmPassword,gender}=req.body;
      if(password!=confirmPassword){
        return res.status(400).json({error:'Passwords do not match'});
      }
      const user=await User.findOne({username});
      if(user){
        return res.status(400).json({error:'Username already exists'});
      }
      //hashing the password
      const hashRound=await bcrypt.genSalt(10);
      const hashedPassword=await bcrypt.hash(password,hashRound);
      //for getting the profile pic
      const boyavatar=`https://avatar.iran.liara.run/public/boy?username=${username}`
      const girlavatar=`https://avatar.iran.liara.run/public/girl?username=${username}`
      const newUser=new User({
        fullName,
        username,
        password:hashedPassword,
        gender,
        profilePic:gender==='male'?boyavatar:girlavatar
      })
      if(newUser){
        await jwtandsetmycookie(newUser._id,res);
        await newUser.save();
        res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        username:newUser.username,
        profilePic:newUser.profilePic
      });
      }
      else{
        return res.status(400).json({error:"Invalid User credentials"});
      }
      
    }catch(err){
       console.log("Error in signup controller")
       res.status(500).json({msg:err.message});
    }
}