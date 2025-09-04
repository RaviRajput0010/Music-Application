import React, { useContext, useEffect, useState } from 'react'
import './Search.css'
import { Context } from '../Context'
import { img1, musicdata } from '../Assests/images'
import { useNavigate } from 'react-router-dom'


function Search() {
  

    const {screenSize,SetDuration,Search,setpop,pop,playingone,setplayingone,setchangeimage,setchangesongname}=useContext(Context)
    console.log(Search)

    const [data,setdata]=useState([]);

    const navigate=useNavigate();

    console.log('search',Search);
    
   
useEffect(() => {
  if (!Search || Search.trim() === "") {
    setdata([]);
    return;
  }

  async function fetchdata() {
    try {
      const res = await fetch(`https://music-application-fzwf.onrender.com/result/?query=${Search}&lyrics=true`);
      const result = await res.json();
      console.log("Received data:", result);
      setdata(result);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  fetchdata();
}, [Search]);



     function Play(x,y,z)
{
   if (playingone.current)
     {
      playingone.current.pause();
      playingone.current.currentTime = 0;
    }

    if (setchangeimage) setchangeimage(y);
    if (setchangesongname) setchangesongname(z);
    

  const audio = new Audio(x)
  audio.play()

   audio.addEventListener('loadedmetadata', () => {
      SetDuration(audio.duration);
    });

    playingone.current = audio;
}

console.log(data)

  return (
    <div className='search' style={{height:playingone.current==null?'90vh':'80vh'}}>

        <div className="searchresult">
          {
                    data.map((i)=>{
                          return(
                      <div className='singlesong' onMouseOver={()=>setpop(i.id)}>
                          <img src={i.image} id='songimage' alt="song name" onClick={()=>navigate('/album' , {state: {link: i.song}})} />
                          <h4 style={{color:'white'}}>{i.song}</h4>
                       {
                      i.id=== pop ? <div className='playbtn' style={{height:screenSize <480 ? '35px':'45px',width:screenSize <480 ? '35px':'45px',bottom:screenSize <480 ? '43%':'35%',right:screenSize <480 ? '15px':'10px'}} onClick={()=> Play(i.media_url,i.image,i.song)}>
                          <img src={img1.play} alt='playbtn'/>
                      </div> : ''
                      
                     }
                      </div>
                    )
      
                    })
                  }  

        </div>
    
        
    </div>
  )
}

export default Search
