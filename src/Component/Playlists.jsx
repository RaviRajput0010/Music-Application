import React from 'react'



function Playlists() {
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

      <div className="bottom">
        <div className="playbtn" onClick={() => Play(alldata.media_url, alldata.image, alldata.album)}>
          <img src={img1.play} alt="" />
        </div>
      </div>

      <div className='songtimings'>
        <button onClick={handleAddToPlaylist}>Add To Playlist</button>
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
                <h4>{i.album}</h4>
                {
                  i.id === pop &&
                  <div className='playbtn' onClick={() => {
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
  )
}

export default Playlists
