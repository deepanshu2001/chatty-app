import User from "../models/usermodel.js";

export const getusersforSidebar=async(req,res)=>{
    try{
       const loggedInUser=req.user._id;
       //only store the users not equal to loggedInUser
       const filteredUser=await User.find({_id:{$ne:loggedInUser}}).select("-password");
       return res.status(200).json(filteredUser);
    }
    catch(err){
        console.log("Error in getusersforSidebar controller",err.message)
        res.status(500).json({error:"Internal server error"});
    }
}