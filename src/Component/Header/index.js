import React, { useEffect } from "react";
import "./style.css";
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userImg from '../../Assects/userImg.png'
import walletImg from '../../Assects/wa.png'; 

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate =useNavigate();
  useEffect(() => {
  if(user){
    navigate("/dashboard");
  }
  
  }, [user,loading])
  
   function logoutFun(){
    try {
          signOut(auth).then(() => {
                   // Sign-out successful.
                 toast.success("Successfully Loged out !");
                 navigate("/");
                 
              }).catch((error) => {
                   // An error happened.
                   toast.error(error.messsage);
             });
    } catch (error) {
      toast.error(error.message);
    }
   }

  return (
      <div className="navbar">
        <p className="logo link">
            ApnaWallet.
            <img src={walletImg} alt="Logo" 
            style={{backgroundColor: "transparent", height:"2rem",width:"2rem"}}/>
        </p>
        {user && 
        <div style={{display:"flex",alignItems:"center", gap:"0.75rem"}}>
           
           <img
           src={user.photoURL ? user.photoURL: userImg}
           style={{borderRadius:"50%", height:"2rem",width:"2rem"}}
           />
           <p className="logo link" onClick={logoutFun}>Log Out</p>
           
        </div>}
       
      </div>

  );
};

export default Header;
