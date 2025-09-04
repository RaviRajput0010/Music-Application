import React, { useState } from 'react'
import { img1 } from '../Assests/images'
import {useNavigate} from 'react-router-dom'

import './Signup.css'
import { toast } from 'react-toastify';
function Login() {

  const navigate=useNavigate();

  const [name,setname]=useState('');
  const [pass,setpass]=useState('');
  const [email,setemail]=useState('');
  
  const obj ={"name":name,"email":email,"password":pass}


  function submit()
  {
    localStorage.setItem("SignupData",JSON.stringify(obj))
    toast.success("Login Successfull")
  }


   
  return (
    <div className='login'>
      <div className="container">
             <img src={img1.logo} alt="" />
            <h2>Signup To Spotify </h2>
           
           
      </div>
        <br/><br/>
           <div className="existing">
            <input type="text" placeholder='Enter Name 'onChange={(a)=>{setname(a.target.value)}} value={name} />
            <input type="text" placeholder='Enter Email 'onChange={(a)=>{setemail(a.target.value)}} value={email} />
            
             <input type="password" placeholder='Enter Password'onChange={(a)=>(setpass(a.target.value))} value={pass}/>
             <button onClick={()=>{submit()}} >Continue</button>
           </div>
           <br/>

            <div id='lastbox'>
                <ul>
                   
           
            <li style={{listStyle:'none'}}>Already have an account? <a href="#" onClick={()=>{navigate('/login')}} >Login</a></li>
          
            </ul>
            </div>  
   
    </div>
  )
}

export default Login
