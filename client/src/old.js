import React, { Component } from 'react'
import './form.css'
import './App.css'
import axios from 'axios'
import Beat from './beat'
import AuthContext from "./context/AuthContext";

class Old extends Component{
  static contextType = AuthContext;
    constructor(props){
      super(props);
      this.state={
        usename:"", 
      pressedkeys:[]  
    }
    }
    
    load=async()=>{
      const {loggedin,getLoggedin}=this.context
      await getLoggedin()
    }
   

 
    
      componentDidMount=async()=>{
          await this.load();
        await axios.get('/api/beats/')
         
        .then(async(re)=>{
          
          const {loggedin,getLoggedin}=this.context
            await getLoggedin()
           
            const n=re.data.map((li)=>{
                  
              if(li.username === loggedin.name)
              
              this.setState({
                  pressedkeys:re.data,
                  usename:loggedin.name
              });
          
            })
           
        })
        
    }
    

     clear=(id)=>{
          axios.delete('/api/beats/'+id);
         let pk = this.state.pressedkeys.filter(tt => {
            return tt._id !== id
          });
         this.setState({
            pressedKeys: pk
          });
          alert('deleted');
          window.location.reload(false);
        
     }
     check=async(key)=>{
       for(const i of key){
      
        var na=new Audio(`audio/${i}.wav`)
        na.play()
        .catch(err=>console.log('hi'))
         
        await new Promise(r => setTimeout(r, 350));
     }


    }



    
     
    render(){
       
       
      return(
        <div className="main">
        
          <div className="container">
          
          <span className="right brown darken-3 btn" onClick={()=>{this.props.history.push('/beatsmaker')}}>back</span>
           <Beat beat={this.state.pressedkeys} name={this.state.usename} del={this.clear} play={this.check}/>
            
          </div>
          </div>
           
          
      )


    }

}
export default Old; 