import { useState } from "react";
import toast from 'react-hot-toast'
import { useAuthContext } from "../context/authContext";
const useLogin=()=>{
   const [loading,setLoading]=useState(false);
   const {setAuthUser}=useAuthContext();
   const login=async(username,password)=>{
    try{
        const success=handleInputErrors(username,password)
        if(!success){
            return;
        }
       setLoading(true);
       const res=await fetch("/api/auth/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({username,password})
       })
       const data=await res.json();
       if(data.error){
        throw new Error(data.error);
       }
       setAuthUser(data);
       localStorage.setItem('chat-user',JSON.stringify(data))
    }catch(err){
       toast.error(err.message)
    }finally{
        setLoading(false)
    }
   }
   return {loading,login}
}

export default useLogin;

function handleInputErrors(username,password){
    if(!username||!password){
      toast.error("Please fill all the fields");
      return false;
    }
    
    return true;
  }