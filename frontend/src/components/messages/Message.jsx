import React from 'react';
import { extractTime } from "../../utils/extractTime";

import useConversation from "../../zustand/useConversation";
import { useAuthContext } from '../../context/authContext';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;

  
  let createdAt = message.createdAt;

  
  if (typeof createdAt === 'string' || createdAt instanceof String) {
    createdAt = new Date(createdAt);
  }

  
  if (!(createdAt instanceof Date) || isNaN(createdAt.getTime())) {
    createdAt = new Date(); 
  }

  const formattedTime = extractTime(createdAt);

  const chatClassName = fromMe ? "chat-start" : "chat-end";
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
