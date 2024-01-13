import React, { useState } from 'react'
import "./style.css"
import Input from '../Input'
import Button from '../Button';
import { auth } from '../../firebase';
import { toast } from 'react-toastify';
import {createUserWithEmailAndPassword } from "firebase/auth";
const  SignUpSignIn = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[confirmPassword,setConfirmPassword]=useState("");
  const[loading,setLoading]=useState(false);


  function signUpWithEmail(){
    setLoading(true);
    console.log("Name",name);
    if(name !="" && email !="" && password !=""){
   // Authetication of the user and creating new user
   if(password ===confirmPassword){
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log("User >>",user);
      toast.success("User sucessfully created")


      setConfirmPassword("");
      setEmail("");
      setName("");
      setPassword("");

      setLoading(false);

      createDocs(user);
 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      setLoading(false);
  
    });
   }else{
    toast.error("Passwords do not match");
    setLoading(false)
   }
   
    } else{
      toast.error("All feilds are mandatory");
      setLoading(false)
    }

  }


  function createDocs(){
   //make sure the doc user id does not match
   //here we are storing the data 
  }
  return (
    <div className='signup-wrapper'>
      <h2 className='title'>
      SignUp on <span style={{color:"var(--theme)"}}>ApnaWallet</span>
      </h2>
    <form>
      <Input label={"Full Name"} state={name} setState={setName} placeholder={"Enter your name"} />
      <Input label={"Email"} state={email} setState={setEmail} placeholder={"Enter your email"} type={"email"}/>
      <Input label={"Password"} state={password} setState={setPassword} placeholder={"Enter your password"} type={"password"}/>
      <Input label={"Confirm Password"} state={confirmPassword} setState={setConfirmPassword} placeholder={"confirm password"} type={"password"}/>
    </form>
    <Button disabled={loading} text={loading ? "Loading...":"Sign Up using Email And Password"} onClick={signUpWithEmail}/>
    <p style={{textAlign:"center", margin: 0}}>or</p>
    <Button disabled={loading}text={ loading ? "Loading..." : "Sign Up Using Google "} blue={true} />
    </div>
  )
}

export default  SignUpSignIn