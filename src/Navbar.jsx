import React, { useContext } from 'react'
import {img1} from '../src/Assests/images.js'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { Context } from './Context.jsx';
import { toast } from 'react-toastify';

function Navbar() {

  const jump=useNavigate();

  const {Search,ChangeSearch,logindata,showplaylist,setshowplaylist,screenSize,setscreenSize}=useContext(Context)




  return (
    <nav>
        <div className="left">
            <li><img src={img1.logo} alt="" /></li>
            <li onClick={()=>jump('/')}><img src={img1.home} alt="" id="home"/></li>

           <div id='searchparent'>
                  <img src={img1.search} alt="" id="search"/>
                  < input type="text" placeholder={screenSize <480?'Search..':'What u want to search '}  className="styled-input" onChange={(x)=>{ChangeSearch(x.target.value)
            jump('/search')}} 
            value={Search}/>
           
           </div>
            
            {screenSize < 480 && logindata.name!==null ?  <button id="playlist-btn" onClick={()=>setshowplaylist(true)}>Playlist</button> :('')}
            {screenSize < 480 && logindata.name==null ? (<button style={{height:'30px',width:'100px',borderRadius:'10px'}} id="btnlogin" onClick={() => jump('/login')} >Login</button>):'' }
           
                      
        </div>

       

        <div className="right">

  {
    logindata.name == null ? (
      <div className="list">
        <li onClick={() => toast.warn("Feature will be Available soon")}>Premium</li>
        <li onClick={() => toast.warn("Feature will be Available soon")}>Support</li>
        <li onClick={() => toast.warn("Feature will be Available soon")}>Download</li>
      </div>
    ) : (
      <button id="explore" onClick={() => toast.warn("Feature will be Available soon")}>
        Explore Premium
      </button>
    )
  }

  <div className="download">
    <li onClick={() => toast.warn("After Learning React Native ")}>
      <img src={img1.down} alt="" id="down" />Install App
    </li>
  </div>

{
  logindata.name == null ? (
    <div className="list">
      {screenSize > 480 && (
        <li onClick={() => jump('/Signup')}>Sign up</li>
      )}
      <button id="btnlogin" onClick={() => jump('/login')}>Login</button>
    </div>
  ) : (
    <p 
      onClick={() => { jump('/dash') }} 
      style={{ 
        color: 'rgb(199, 215, 208)', 
        fontSize: screenSize < 480 ? '14px' : '18px', 
        fontWeight: 'bold', 
        cursor: 'pointer' 
      }}
    >
      {logindata.name}
    </p>
  )
}

</div>

    </nav>
  )
}

export default Navbar
