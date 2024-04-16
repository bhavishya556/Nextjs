"use client"
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

import Link from "next/link";

import { useRouter } from "next/navigation";
import toast,{ Toaster }  from 'react-hot-toast';

const login = () => {
    const [email,setEmail] = useState("");
    const [password,setPass] = useState("");

    const onLogin = async  () => {
     try {
     const res =  await axios.post("http://localhost:3000/api/user/login",{email,password});
     console.log(res);
     toast.success("Login success")
      
     } catch (error:any) {
      toast.error(error.response.data.message);
      
     }
        
    }
  return (
      <div className='flex flex-col '>
        <div><Toaster/></div>
      <h1>this login page</h1>
    <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
    <input type="password" onChange={(e)=>setPass(e.target.value)} placeholder='Password' />
    <br/>
    <button onClick={onLogin} > login</button>
    <Link href="/auth/signup"> Go to signup</Link>

</div>
  )
}

export default login