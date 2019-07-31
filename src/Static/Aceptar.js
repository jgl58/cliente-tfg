import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import {reactLocalStorage} from 'reactjs-localstorage'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', pass: '', show: false , profesional: true, logeado: false}
    this.login = this.login.bind(this)
    
   
  }
  componentWillMount(){
    if(reactLocalStorage.get('token') != undefined){
      console.log("Token: "+ reactLocalStorage.get("token"))
      console.log("Hay un token guardado")
    }
  }


  login(event) {
    
    var pet = {
      profesional:this.state.profesional, 
      email: this.state.email, 
      pass: this.state.pass 
    };
    
    var json = JSON.stringify(pet)
    
    new API().login(json)
      .then((response) => {
        
        if (response.ok) {
          return response.json();
        } else {
          this.handleShow()
        }
      }).then((json) => {
        reactLocalStorage.set('token',json.token)
        reactLocalStorage.set('idUser',json.idUser)
        reactLocalStorage.set('isProfesional',this.state.profesional)
        reactLocalStorage.set('nombre',json.nombre)
        reactLocalStorage.set('provincia',json.provincia)
        if(!this.state.profesional)
          this.setState({logeado: true})
         // this.goToMuro()
        else
          this.setState({logeado: true})
//          this.props.muroP()
      }).catch(function(err){
        
      })
  }


  render() {

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5">
              <div className="card">
                <div className="card-header">
                  Hemos encontrado esta oferta para ti
                </div>
                <div className="card-body">
                    
                </div>
                <div className="card-footer">
                    <div className="col-md-12">
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Login;

