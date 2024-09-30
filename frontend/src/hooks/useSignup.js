import React,{useState} from 'react'
import toast from 'react-hot-toast';
import { json } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';
const useSignup = () => {
   const [loading,setLoading]=useState(false);
   const {setAuthUser}=useAuthContext();
   const signup=async({fullName,username,password,confirmPassword,gender})=>{
      const success=handleInputErrors({fullName,username,password,confirmPassword,gender})
      if(!success){
        return;
      }
      setLoading(true)
      try{
          const res=await fetch("/api/auth/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullName,username,password,confirmPassword,gender})
          })
          const data=await res.json();
          if(data.error){
            throw new Error(data.error);
          }
          //localstorage and conbtext
          localStorage.setItem('chat-user',JSON.stringify(data))
          setAuthUser(data);

          console.log(data)
      }catch(err){
        toast.error(err.message)
      }finally{
        setLoading(false)
      }
    };
    return {loading,signup}
}

export default useSignup

function handleInputErrors({fullName,username,password,confirmPassword,gender}){
  if(!fullName||!username||!password||!confirmPassword||!gender){
    toast.error("Please fill all the fields");
    return false;
  }
  if(password!==confirmPassword){
    toast.error("Passwords do not match");
    return false;
  }
  if(password.length<6){
    toast.error("Password must be atleast 6 characters");
    return false;
  }
  return true;
}