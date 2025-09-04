import { useContext, useEffect, useState } from 'react';
import './Playlist.css';
import { Context } from '../Context';
import { toast } from 'react-toastify';
import { img1 } from '../Assests/images.js';

function Playlist() {
  const {screenSize,showplaylist,setshowplaylist,myPlaylistSongs, setMyPlaylistSongs,logindata, setchangeimage, setchangesongname, playingone } = useContext(Context);

  const [playlists, setPlaylists] = useState({});

  console.log("myplaylistsong ", myPlaylistSongs);

  useEffect(() => {
    const stored = localStorage.getItem('my_playlists');
    if (stored) setPlaylists(JSON.parse(stored));

    const myPlaylistData = localStorage.getItem('my_playlist');
    if (myPlaylistData) setMyPlaylistSongs(JSON.parse(myPlaylistData));
  }, []);


  function handlePlay(url, image, name) {
    console.log("url :", url);

    try {
      if (playingone.current) {
        playingone.current.pause();
        playingone.current.currentTime = 0;
      }

      const audio = new Audio(url);
      playingone.current = audio;

      audio.play().catch(err => {
        toast.error("Audio play failed.");
        console.error(err);
      });

      if (setchangeimage) setchangeimage(image);
      if (setchangesongname) setchangesongname(name);
    } catch (err) {
      console.error('Playback Error:', err);
      toast.error("Error playing song");
    }
  }

  function handleAddSongToPlaylist(name) {
    const recentSong = JSON.parse(localStorage.getItem("current_song"));
    if (!recentSong || !recentSong.id) {
      toast.error("No song selected to add!");
      return;
    }

    const alreadyExists = playlists[name]?.some(song => song.id === recentSong.songid);
    if (alreadyExists) {
      toast.warn("Song already in playlist!");
      return;
    }

    setPlaylists(prev => ({
      ...prev,
      [name]: [...(prev[name] || []), recentSong]
    }));

    toast.success(`Song added to '${name}'`);
  }

  return (
    <div className='playlist' style={{ height: playingone.current == null ? '90vh' : '80vh' }}>
      
      {/* Custom Playlists Section */}
      {Object.keys(playlists).length > 0 && (
        <div className="myPlaylistGrid">
          {Object.entries(playlists).map(([name, songs], index) => (
            <div key={index} className="one">
              <div className="inner">
                <h4>{name}</h4>
                {songs.length === 0 ? (
                  <p>No songs yet</p>
                ) : (
                  <ul>
                    {songs.map((song, idx) => (
                      <li key={idx}>
                        🎵 <strong>{song.album}</strong>
                      </li>
                    ))}
                  </ul>
                )}
                <button onClick={() => handleAddSongToPlaylist(name)}>+ Add Current Song</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="myPlaylistSection">
        <div>
           {screenSize < 480 ?<button id='playlist-btn' onClick={()=>setshowplaylist(false)}>Back</button>:''} 
            <h4>My Playlist</h4>
        </div>
        <div className="myPlaylistGrid">
          {logindata?.name ? (
            myPlaylistSongs.length > 0 ? (
              myPlaylistSongs.map((song, idx) => (
                <div key={idx} className="song-card">
                  <img src={song.image} alt="song" className="song-img" />
                  <div className="song-info">
                    <p className="song-title">{song.name}</p>
                    <p className="song-artist">{song.singer}</p>
                  </div>
                  <button
                    className="play-btn"
                    onClick={() => handlePlay(song.songsrc, song.image, song.name)}
                  >
                    <img id="buttonplay" src={img1.play} alt="Play" />
                  </button>
                </div>
              ))
            ) : (
              <p>No songs in your playlist yet.</p>
            )
          ) : (
            <p>Please log in to view your playlist.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Playlist;
