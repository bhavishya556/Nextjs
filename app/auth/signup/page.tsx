"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useRouter();
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/api/user/signup", { email, password });
            console.log(res.data);
            navigate.push("/auth/login");
            toast.success("Signup successful");
        } catch (error:any) {
            toast.error(error.response.data.message);
            console.error("Signup error:",error );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col'>
            <div><Toaster /></div>
            <h1>This is the signup page</h1>
            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
            <br />
            <button onClick={onSignup} disabled={loading}>{loading ? "Signing up..." : "Signup"}</button>
            <br />
            <Link href="/auth/login">Go to Login</Link>
        </div>
    );
}

export default Signup;
