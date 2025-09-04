import { useContext, useEffect, useRef, useState } from 'react'
import { img1} from '../Assests/images'
import './Section.css'
import { Context } from '../Context'
import { useNavigate} from 'react-router-dom'
import Skeletoncomponent from './Skeletoncomponent.jsx'
import { toast } from 'react-toastify'

function Section(props) {

  //var data = musicdata.filter((i)=>props.category==i.category)
  
  const {logindata,SetDuration,pop,setpop,setchangeimage,setchangesongname,playingone,}=useContext(Context)
  
  const [alldata,setalldata] = useState([])

 useEffect(() => {
  async function fetchdata() {
    try {
      const res = await fetch(`https://music-application-fzwf.onrender.com/result/?query=${props.category}&lyrics=true`);
      const data = await res.json();
      console.log("Received data:", data);
      setalldata(data)
      
    } catch (err) {
      console.error("Fetch error:", err);
     
    }
  }

  fetchdata();
}, []);

function Play(x,y,z)
{
   if (playingone.current)
     {
      playingone.current.pause();
      playingone.current.currentTime = 0;
    }

  setchangeimage(y)
  setchangesongname(z)

  const audio = new Audio(x)
  audio.play()
  
  audio.addEventListener('loadedmetadata',()=>{

    SetDuration(audio.duration)

  })

  playingone.current=audio
  console.log(playingone.current.currentTime)
  //setplayingone(audio)
}

const navigate = useNavigate();


  return (
    <div className='section'>
        <div className="heading">
            <h3>{props.title}</h3>
       </div>
       <div className="songs">
            {
                alldata.length > 0 ?( alldata.map((i)=>{
                    return(
                <div className='singlesong' onMouseOver={()=>setpop(i.id)}>
                    <img src={i.image} id='songimage' alt="song name" onClick={()=>navigate('/album' , {state: {link: i.song}} )} />
                    <h4>{i.song}</h4>
                 {
                i.id=== pop ? <div className='playbtn' onClick={()=>{logindata.name==null?toast("Please Login"): Play(i.media_url,i.image,i.album)}}>
                    <img src={img1.play} alt='playbtn'/>
                    
                </div> : ''
                
               }
                </div>
              )

              }))
              :        <Skeletoncomponent/>
              
                
            }
          
       </div>
    </div>
  )
}

export default Section
