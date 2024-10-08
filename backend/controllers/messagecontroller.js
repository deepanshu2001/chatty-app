import Conversation from '../models/conversationmodel.js'
import Message from '../models/messagemodel.js';
import { getRecieverSocketId, io } from '../socket/socket.js';
export const sendMessage=async(req,res)=>{
    try{
       const {message}=req.body;
       const receiverId=req.params.id;
       const senderId=req.user._id;
       let conversation = await Conversation.findOne({
        participants: { $all: [senderId, receiverId] },
        });

        if(!conversation){
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        

        conversation.save();
        newMessage.save();
        //socket functionality
        const receiverSocketId=getRecieverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage);
    }
    catch(err){
        console.log("Error in sendMessage controller",err.message)
        res.status(500).json({error:"Internal server error"});
    }
}

export const getMessages=async(req,res)=>{
   try{
      const usertochat=req.params.id;
      const senderId=req.user._id;
      const conversation = await Conversation.findOne({
        participants: { $all: [senderId,usertochat] },
    }).populate("messages"); 
     if(!conversation){
        return res.status(200).json([]);
     }
      res.status(200).json(conversation.messages)
   }
   catch(err){
    console.log("Error in getMessages controller",err.message)
    res.status(500).json({error:"Internal server id"});
   }
}