import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import Playlist from './Component/Playlist';
import Homepage from './Pages/Homepage';
import {Routes,Route} from 'react-router-dom'; 
import Login from './Pages/Login';
import Signup from './Component/Signup';
import Seeker from './Component/Seeker';
import { useContext, useState } from 'react';
import { Context } from './Context';
import Search from './Pages/Search';
import Songdiscription from './Pages/Songdiscription';
import Dashboard from './Pages/Dashboard';
import { ToastContainer} from 'react-toastify';

function App() {

  const {playingone,showplaylist,setshowplaylist,screenSize,setscreenSize}=useContext(Context)



  return (
    <div className="App">
      <ToastContainer/>
      <Navbar/>
      <div className='playlistandhomepage'>
        {
          screenSize < 480 && !showplaylist? '':(<Playlist/>)
        }

        {
          showplaylist ? '':( 
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            
            <Route path='/search' element={<Search/>}/>
            <Route path='/album' element={<Songdiscription/>}/>
            <Route path='/dash' element={<Dashboard/>}/>
            
        </Routes>
        )
        }
       
        
      </div>
      {playingone.current===null?'': <Seeker/>}
  
    </div>
  );
}

export default App;
