import React, { useState } from 'react'
import Header from '../Component/Header';
import SignUpSignIn from '../Component/SignUpSignIn';
import LogIn from '../Component/LogIn';
const SignUp = () => {
  const[isLogin,setIsLogIn]=useState(false)
  return (
    <>
     <Header/>
     <div className='wrapper'>
        {isLogin ? <LogIn isLogin={isLogin} setIsLogIn={setIsLogIn} /> : <SignUpSignIn isLogin={isLogin} setIsLogIn={setIsLogIn}/>}
       
     </div>
    </>
       
  
  )
}

export default SignUp