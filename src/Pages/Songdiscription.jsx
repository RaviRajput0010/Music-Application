import { useContext, useEffect, useState } from 'react';
import './Songdiscription.css';
import { Context } from '../Context';
import { useLocation, useNavigate } from 'react-router-dom';
import { img1 } from '../Assests/images.js';
import Skeleton from 'react-loading-skeleton';
import { toast } from 'react-toastify';
import Skeletoncomponent from '../Component/Skeletoncomponent.jsx';

function Songdiscription() {
  const {
    pop, setpop, logindata, setplaylist, changeimage,
    setchangeimage, playingone, SetDuration, setchangesongname,screenSize
  } = useContext(Context);

  const [alldata, setalldata] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [musicobj, setmusicobj] = useState({});
  const [loading, setloading] = useState(false);

  const jump = useNavigate();
  const location = useLocation();
  const link = location.state.link;

  useEffect(() => {
    async function fetchdata() {
      try {
        setloading(true);
        const res = await fetch(`https://music-application-fzwf.onrender.com/result/?query=${link}`);
        const data = await res.json();
        setalldata(data[0]);
        setloading(false);

        const value = data[0].singers.split(",")[0].trim();
        const recRes = await fetch(`https://music-application-fzwf.onrender.com/result/?query=${value}&lyrics=true`);
        const recData = await recRes.json();
        const filtered = recData.filter(item => item.media_url !== data[0].media_url);
        setRecommended(filtered);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    }

    fetchdata();
  }, [link]);

  function Play(x, y, z) {
    if (playingone.current) {
      playingone.current.pause();
      playingone.current.currentTime = 0;
    }

    setchangeimage(y);
    setchangesongname(z);

    const audio = new Audio(x);
    audio.play();

    audio.addEventListener('loadedmetadata', () => {
      SetDuration(audio.duration);
    });

    playingone.current = audio;
  }

  useEffect(() => {
    setalldata([]);
    setloading(true);
  }, [link]);

  useEffect(() => {
    setmusicobj({
      songid: alldata.id,
      name: alldata.song,
      image: alldata.image,
      singer: alldata.singers,
      Language: alldata.language,
      year: alldata.year,
      songsrc: alldata.media_url
    });
  }, [alldata]);

  const handleAddToPlaylist = () => {
    setplaylist(prev => [...prev, musicobj]);

    let existing = JSON.parse(localStorage.getItem("my_playlist") || "[]");
    const isExist = existing.find(song => song.songid === musicobj.songid);

    if (isExist) {
      toast.warn("Song already exists in playlist!");
      return;
    }

    existing.push(musicobj);
    localStorage.setItem("my_playlist", JSON.stringify(existing));
    toast.success("Song Added to Playlist");

  };

  return (
    <div className='album' style={{ height: playingone.current == null ? '90vh' : '80vh' }}>
      {!loading ? (
        <div className="top">
          <div className="image">
            <img src={alldata.image} alt="" />
          </div>
          <div className='info'>
            <h2>{alldata.album}</h2>
            <div className="box">
              <h5 id="singer">{alldata.singers}</h5>
              <h5>{alldata.year}</h5>
            </div>
          </div>
        </div>
      ) : (
        <div className="top">
          <div className="image"><Skeleton height={180} width={180} baseColor='#3a3a3a' highlightColor='#555555' /></div>
          <div className='info'>
            <h1><Skeleton height={50} width={300} baseColor='#3a3a3a' highlightColor='#555555' /></h1>
            <div className="box">
              <h5><Skeleton height={20} width={100} baseColor='#3a3a3a' highlightColor='#555555' /></h5>
              <h5><Skeleton height={20} width={100} baseColor='#3a3a3a' highlightColor='#555555' /></h5>
            </div>
          </div>
        </div>
      )}

      <div className="bottom" style={{display:'flex',justifyContent:'space-between',width:'100%'}}>
      
        <div className="playbtn" onClick={() => Play(alldata.media_url, alldata.image, alldata.album)}>
          <img src={img1.play} alt="" />      
        </div>

        <div className='playbtn' style={{backgroundColor:'white',borderRadius:'5px',height:'30px',width:'30px',marginRight:'20px'}}>
          <h3 id='plus' onClick={handleAddToPlaylist}>+</h3>
        </div>
      
      </div>

  

      <div className='section'>
        <div className="heading">
          <h3>More By {alldata.singers}</h3>
        </div>

        <div className="songs">
          {
            recommended.length > 0 ? recommended.map((i) => (
              <div className='singlesong' onMouseOver={() => setpop(i.id)} key={i.id}>
                <img src={i.image} id='songimage' alt="song name" onClick={() => jump('/album', { state: { link: i.song } })} />
                <h4>{i.song}</h4>
                {
                  i.id === pop &&
                  <div className='playbtn' style={{height:screenSize <480 ? '35px':'45px',width:screenSize <480 ? '35px':'45px',bottom:screenSize <480 ? '43%':'35%',right:screenSize <480 ? '15px':'10px'}} onClick={() => {
                    logindata.name == null
                      ? toast("Please Login")
                      : Play(i.media_url, i.image, i.album);
                  }}>
                    <img src={img1.play} alt='playbtn' />
                  </div>
                }
              </div>
            )) : <Skeletoncomponent />
          }
        </div>
      </div>
    </div>
  );
}

export default Songdiscription;
