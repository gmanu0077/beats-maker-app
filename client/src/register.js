import React, { Component } from 'react'
 import './App.css'
 import axios from 'axios'
import AuthContext from './context/AuthContext'

class Reg extends Component{
   static contextType=AuthContext;
    state={
        name:"",
        pass:"",
        verify:""
        
    }
 cha=(e)=>{
     this.setState({
         [e.target.id]:e.target.value
     })
 }


 sub=async(e)=>{
     const {getLoggedin}=this.context
    e.preventDefault();
    if(!this.state.pass&&!this.state.verify&&!this.state.name){
        alert("enter all the feilds")
    }else if(this.state.pass !== this.state.verify){
        alert("verify password")
    }else if(this.state.pass.length<6){
        console.log("pass")
         alert("password should be greater than 6 letters")
    }else{
   await axios.post('/api/user/add',{username:this.state.name,password:this.state.pass,passwordVerify:this.state.verify})
    await getLoggedin();
   
   this.props.history.push('/beatsmaker')
    
    }
    this.setState({
       name:"",
       pass:"",
       verify:""
    })
   
   
}

 render() {
    const {getLoggedin,loggedin} = this.context;
    if(loggedin?.status===true){
        getLoggedin(this.props.history); }

  return(
      <div className="login container z-depth-3">
      <h1 className="deep-orange-text text-darken-3 center">REGISTER</h1>
      
      <form className="container center" >
      <div>
      <label className="left" htmlFor="name">username : </label>
      <input  className="white-text" id="name" onChange={this.cha} value={this.state.name}   /></div>
      <div>
      
     
      <label className="left" htmlFor="pass">password : </label>
      <input className="white-text" type="password" id="pass" onChange={this.cha} value={this.state.pass}  /></div><div>
      <label className="left" htmlFor="pass">verify password : </label>
      <input className="white-text" type="password" id="verify" onChange={this.cha} value={this.state.verify}  /></div>
      <button className="btn deep-orange accent-4 center" onClick={this.sub}>Create account</button>
     <button className="btn deep-orange accent-4 center" onClick={()=>{this.props.history.push('/')}}>switch to login</button>

      </form>
       
      </div>
   
  )



 }
}
 export default Reg;