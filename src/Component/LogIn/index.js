import React, { useState } from 'react'
import './style.css'
import Button from '../Button'
import Input from '../Input';
import {signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { auth, db} from '../../firebase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const LogIn = ({isLogin,setIsLogIn}) => {
  const[loading,setLoading]=useState(false);
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const navigate=useNavigate();

  
  function signUpWithEmail(){ 

    if(email !="" && password !=""){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {

        const user = userCredential.user;

        toast.success("User sucessfully log in!")
        navigate("/dashboard");
   
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        setLoading(false);
    
      });
    
    }else{
      toast.error("All feilds are mandatory");
      setLoading(false)
    }
    
    
  }

   

  return (
    <div className='signup-wrapper'>
    <h2 className='title'>
    Log in <span style={{color:"var(--theme)"}}>ApnaWallet</span>
    </h2>
  <form>
    
    <Input label={"Email"} state={email} setState={setEmail} placeholder={"Enter your email"} type={"email"}/>
    <Input label={"Password"} state={password} setState={setPassword} placeholder={"Enter your password"} type={"password"}/>
   
  </form>
  <Button disabled={loading} text={loading ? "Loading...":"Log in using Email And Password"} onClick={signUpWithEmail}/>
  <p style={{textAlign:"center", margin: 0}}>or</p>
  <Button disabled={loading}text={ loading ? "Loading..." : "Log in Using Google "} blue={true} />
 
  <p>Don't have an account <span style={{color:"var(--theme)"}} onClick={()=>{setIsLogIn(false)}}>click here</span></p>

  </div>
  )
}

export default LogIn