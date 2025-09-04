// src/context/PlayerContext.js
import { createContext, useEffect, useRef, useState } from 'react';

export const Context = createContext();

export function PlayerProvider({ children }) {
  
    const [pop,setpop]=useState(null)
    const [changeimage,setchangeimage]=useState(null)
    const [changesongname,setchangesongname]=useState(null)

    const [showplaylist,setshowplaylist]= useState(false)
    
    const playingone=useRef(null)

    const [Search,ChangeSearch]=useState('')
    
    const [Duration,SetDuration]=useState(null)
   
    const [logindata,setlogindata]=useState({name:null,email:null});

    const [playlist,setplaylist]=useState([]);
   
   const [myPlaylistSongs, setMyPlaylistSongs] = useState([]);

   const [screenSize,setscreenSize]=useState(window.innerWidth);


   useEffect(() => {
    // Function to update state on resize
    const handleResize = () => setscreenSize(window.innerWidth);

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);



    useEffect(()=>{

      var x=JSON.parse(localStorage.getItem('loginData'))
      console.log(x)
      if(x!==null)
      {
        setlogindata(x)
      }
      else
      {
        setlogindata({name:null,email:null})
      }

    },[])

    function getlogindata(name,email)
    {

      setlogindata({name:name,email:email})
      localStorage.setItem('loginData',JSON.stringify({name:name,email:email}))
    }
    console.log(logindata)

    console.log("Playlist",playlist)

  return (
    <Context.Provider value={{showplaylist,setshowplaylist,screenSize,setscreenSize,myPlaylistSongs, setMyPlaylistSongs,playlist,setplaylist,setlogindata,getlogindata,logindata,Duration,SetDuration,Search,ChangeSearch, pop, setpop , changeimage , setchangeimage,setchangesongname,changesongname,playingone}}>
      {children}
    </Context.Provider>
  );
}







