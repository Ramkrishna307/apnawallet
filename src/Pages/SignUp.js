import React from 'react'
import Header from '../Component/Header';
import SignUpSignIn from '../Component/SignUpSignIn';
const SignUp = () => {
    console.log("Hello");
  return (
    <>
     <Header/>
     <div className='wrapper'>
        
       <SignUpSignIn/>
     </div>
    </>
       
  
  )
}

export default SignUp