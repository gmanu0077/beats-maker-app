import React from 'react'

import './form.css'

const Beat=({beat,del,play,name})=>{
  
  const beats=beat.length?(beat.map((re)=>{
     if(re.username===name){
       
       return(
        <div  key={re._id}>
        <ul className="left container list ">
         <li>
         <h4 className="white-text">{re.beatname}</h4> </li><li>
         <button className="btn brown darken-3" onClick={()=>{play(re.beats)}}>play</button>
           <button onClick={()=>{del(re._id)}} className="btn btn-small deep-orange white-text">
            delete
          </button></li>
          </ul>
         
        </div>
      )
      
       }
    
   

 })):( <h5 className="white-text  center">NO Beats</h5>
 )






return(
  <div className="cons container">
  <div className="container">
  
  <h3 className="center orange-text text-darken-3 ">My beats</h3>
  
      {beats}
  </div></div>

)}
export default Beat;  