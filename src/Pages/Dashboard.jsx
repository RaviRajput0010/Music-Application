import React, { useContext } from 'react'
import { Context } from '../Context';
import { useNavigate } from 'react-router-dom';


function Dashboard() {
    
      const {playingone,setlogindata}=useContext(Context);

      const navigate=useNavigate();

  return (
   
    <div className='Homepage' style={{height:playingone.current==null?'90vh':'80vh'}}>
       
       
        <button id='playlist-btn' onClick={()=>{localStorage.removeItem('loginData')
            navigate('/')
            setlogindata({name:null,email:null})
        }}>Logout</button>

    </div>
  )
}

export default Dashboard
