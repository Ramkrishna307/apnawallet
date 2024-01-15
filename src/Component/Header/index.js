import React, { useEffect } from "react";
import "./style.css";
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";

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
        </p>
        {user &&      <p className="logo link" onClick={logoutFun}>Log Out</p>}
       
      </div>

  );
};

export default Header;
