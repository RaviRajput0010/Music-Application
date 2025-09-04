import { useContext } from 'react'
import Section from '../Component/Section'
import './Homepage.css'
import { Context } from '../Context'
function Homepage() {

  const {playingone}=useContext(Context);

  return (
    <div className='Homepage' style={{height:playingone.current==null?'90vh':'80vh'}}>
       <Section title={'Trending Song'} category={'haryanvi'}/>
      <Section title={'Punjabi Song'} category={'punjabi'}/>
      <Section title={'Hindi Song'} category={'Hindi'}/>
      <Section title={'Tamil Song'} category={'Tamil'}/>
     
    </div>
  )
}

export default Homepage
