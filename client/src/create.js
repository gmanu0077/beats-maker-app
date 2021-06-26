import React, { Component } from 'react'
import './form.css'
import axios from 'axios'
import AuthContext from './context/AuthContext'
class Create extends Component{
  static contextType=AuthContext
    
    
    state={
        usename:"", 
      pressedkeys:[], 
      beatname:""
    }
      cha=(e)=>{
          this.setState({
              beatname:e.target.value
          })
      }
    play1=()=>{
        this.state.pressedkeys.push('a')
        var na=new Audio("audio/a.wav")
        
        na.play()
         
         
     }
     play2=()=>{
         this.state.pressedkeys.push('e')
         var na=new Audio("audio/e.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
      play3=()=>{
         this.state.pressedkeys.push('i')
         var na=new Audio("audio/i.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
      play4=()=>{
         this.state.pressedkeys.push('r')
         var na=new Audio("audio/r.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
      play5=()=>{
         this.state.pressedkeys.push('t')
         var na=new Audio("audio/t.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
      play6=()=>{
         this.state.pressedkeys.push('b')
         var na=new Audio("audio/b.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
 
      play7=()=>{
         this.state.pressedkeys.push('c')
         var na=new Audio("audio/c.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
 
      play8=()=>{
         this.state.pressedkeys.push('h')
         var na=new Audio("audio/h.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
 
      play9=()=>{
         this.state.pressedkeys.push('f')
         var na=new Audio("audio/f.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
 
      play10=()=>{
         this.state.pressedkeys.push('p')
         var na=new Audio("audio/p.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
 
      play11=()=>{
         this.state.pressedkeys.push('q')
         var na=new Audio("audio/q.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
      play12=()=>{
         this.state.pressedkeys.push('s')
         var na=new Audio("audio/s.wav")
         
         na.play()
          .catch(err=>console.log(err))
          
      }
     clear=()=>{
         this.setState({
             pressedkeys:[]
         })
         alert("your beat is cleared")
     }
     check=async()=>{
         for(const re of this.state.pressedkeys){
            
            var na=new Audio(`audio/${re}.wav`)
            na.play()
            
              
            await new Promise(r => setTimeout(r, 350)); 
         }
   
     }
     save=async()=>{
        const {loggedin,getLoggedin}=this.context;
        await getLoggedin();
        
       this.setState({
      usename:loggedin.name
       })
       if(this.state.beatname){
        await axios.post('/api/beats/add',{beats:this.state.pressedkeys,username:this.state.usename,beatname:this.state.beatname})
         alert("beat saved")
         this.setState({
             beatname:""
         })}
         else{
             alert('enter the name')
         }
     }
     sub1=(e)=>{
         e.preventDefault()
         
     }
     
    render(){
       
       
        
      return(
          <div className="main">
          <div className="hi container">

          
                <span className="but right brown darken-3 btn" onClick={()=>{this.props.history.push('/beatsmaker')}}>back</span>
          <br></br>
          <br></br>
          <div className="container">
          <div className=" bb container z-depth-3 center">
              <button className="btn center deep-orange " onClick={this.save}>save</button>
              <br/>
              <button onClick={this.check} className="deep-orange  btn btn-large">
              check</button>
              <button className="btn deep-orange" onClick={this.clear}>clear</button>
          </div>
          <br />
          <div className="name">
          <form className="container center" onSubmit={this.sub1}>
          <label htmlFor="name" className="left" >beatname:</label>
           <input className="white-text" id="beatname" onChange={this.cha} value={this.state.beatname} onSubmit={this.sub1} />
          </form></div>
         
          <div className="keyboard container center z-depth-3 ">
              <button onClick={this.play1} className="deep-orange btn-floating btn-large "/>
              <button onClick={this.play2} className="deep-orange btn-floating btn-large"/>
              <button onClick={this.play3} className="brown darken-3 btn-floating btn-large"/>
              <button onClick={this.play4} className="brown darken-3 btn-floating btn-large"/>
              <button onClick={this.play5} className="brown darken-3 btn-floating btn-large"/>
              <button onClick={this.play6} className="deep-orange btn-floating btn-large"/>
              <button onClick={this.play7} className="deep-orange btn-floating btn-large"/>
              <button onClick={this.play8} className="brown darken-3 btn-floating btn-large"/>
              <button onClick={this.play9} className="brown darken-3 btn-floating btn-large"/>
              <button onClick={this.play10} className="brown darken-3 btn-floating btn-large"/>
              <button onClick={this.play11} className="brown darken-3 btn-floating btn-large"/>
              <button onClick={this.play12} className="brown darken-3 btn-floating btn-large"/>
              
              
          </div></div></div></div>
      )


    }

}
export default Create;