import { useContext, useEffect, useState } from 'react'
import { img1 } from '../Assests/images'
import './Login.css'
import { Context } from '../Context';
import { toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'

function Login() {

   const [email,setemail]=useState('');
  
   const [pass,setpass]=useState('');

   const [SignupData,setsignupdata]=useState('');
   
    const {getlogindata}=useContext(Context);

    const jump=useNavigate();

  function fun()
  {
      if(SignupData.email===email && SignupData.password===pass)
      {
        toast.success("Successfull")
        getlogindata(SignupData.name,SignupData.email)
        jump('/')
      }
      else
      {
        toast.error("unSuccessfull")
      }
  }

  useEffect(()=>{

     setsignupdata(JSON.parse(localStorage.getItem('SignupData')))


  },[])
  
 console.log(SignupData)

  return (
    <div className='login'>
      <div className="container">
             <img src={img1.logo} alt="" />
            <h2>Login in to Spotify </h2>
           
           
      </div>
        <br/><br/>
           <div className="existing">
            <input type="text" placeholder='Enter Email 'onChange={(a)=>{setemail(a.target.value)}} value={email} />
             <input type="password" placeholder='Enter Password'onChange={(a)=>(setpass(a.target.value))} value={pass}/>
             <button onClick={()=>{fun()}} >Continue</button>
           </div>
           <br/>

            <div id='lastbox'>
                <ul>
                   
           
            <li style={{listStyle:'none'}}>Dont have an account? <a href="#" onClick={()=>{jump('/signup')}} >Register</a></li>
          
            </ul>
            </div>  
   
    </div>
  )
}

export default Login
