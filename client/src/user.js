import React, {Component } from 'react'
 import './App.css'
 import axios from 'axios'
 import AuthContext from "./context/AuthContext";
 

class User extends Component{
   
    static contextType = AuthContext;
 
    state={
        name:"",
        pass:"",
    }
    
 cha=(e)=>{
     this.setState({
         [e.target.id]:e.target.value
     })
 }


 check=async(e)=>{
    e.preventDefault();
    const {getLoggedin,loggedin} = this.context;
    await getLoggedin()
    if(loggedin === false){
       
      const el = document.getElementById('e')
      if(el){
          el.innerHTML="wrong password or username"
      }
     
      await axios.post('/api/user/login',{username:this.state.name,password:this.state.pass})
      
      
       await getLoggedin(this.props.history);
        
    }
      
     
     
     
     
    
     this.setState({
        name:"",
        pass:""
     })
     
     
    }
 

 render() {
    const {getLoggedin,loggedin} = this.context;
    if(loggedin?.status===true){
        getLoggedin(this.props.history); 
     }
    
        
    
  return(
      
    <div className="main">
      <div className="loginn container z-depth-3">
      <h1 className="deep-orange-text text-darken-3 center">LOGIN</h1>
      
      <form className="container center" >
      <div>
      <label className="left" htmlFor="name">username : </label>
      <input  className="white-text" id="name" onChange={this.cha} value={this.state.name}   /></div>
      <div>
      
     
      <label className="left" htmlFor="pass">password : </label> 
      <input className="white-text" type="password" id="pass" onChange={this.cha} value={this.state.pass}  /></div>
      <h6 className="red-text" id="e"></h6>
      <button className="btn deep-orange accent-4 center" onClick={this.check}>login</button>
       
      <button className="btn deep-orange accent-4 center" onClick={()=>{this.props.history.push('/register')}}>create a new account</button>
      </form>
      
      </div>
      </div>
  )



 }
}
 export default User;
