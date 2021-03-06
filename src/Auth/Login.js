import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { Button, Col } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import {reactLocalStorage} from 'reactjs-localstorage'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
var sha512 = require('js-sha512');

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', pass: '', show: false , profesional: true, logeado: false}
    this.login = this.login.bind(this)
    this.goToRegistro = this.goToRegistro.bind(this);
    this.goToMuro = this.goToMuro.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loginCliente = this.loginCliente.bind(this);
    this.loginProfesional = this.loginProfesional.bind(this);
    
   
  }
  componentWillMount(){
    if(reactLocalStorage.get('token') != undefined){
      console.log("Token: "+ reactLocalStorage.get("token"))
      console.log("Hay un token guardado")

      var pet = {
        token: reactLocalStorage.get("token")
      }

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
        if(!this.state.profesional){
          this.setState({logeado: true})
        }else{
          this.setState({logeado: true})
          new API().getNotificaciones(json.idUser).then(function(d){
              if(d.notificaciones.length != 0)
                reactLocalStorage.set("notificaciones",d.notificaciones)        
          })
        }
      }).catch(function(err){
        
      })
    }
  }

  loginProfesional(){
    this.setState({profesional: true})
  }

  loginCliente(){
    this.setState({profesional: false})
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  goToRegistro() {
    this.props.reg()
  }

  goToMuro() {
    this.props.muro()
  }



  login(event) {

    var pet = {
        profesional:this.state.profesional, 
        email: this.state.email, 
        pass: this.state.pass 
      }
    

    
    var hash = sha512(pet.pass)
    pet.pass = hash
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
      if(!this.state.profesional){
        this.setState({logeado: true})
      }else{
        this.setState({logeado: true})
        new API().getNotificaciones(json.idUser).then(function(d){
            if(d.notificaciones.length != 0)
              reactLocalStorage.set("notificaciones",d.notificaciones)        
        })
      }
    }).catch(function(err){
      
    })
  }


  render() {

    if(this.state.logeado == true && this.state.profesional == true){
      return <Redirect to='/muroProfesional'></Redirect>
    }

    if(this.state.logeado == true && this.state.profesional == false){
      return <Redirect to='/muroCliente'></Redirect>
    }

    let titulo
    let enlace 
    if(this.state.profesional){
      titulo = <strong>Inicio sesión profesionales</strong>
      enlace = <a href="#" onClick={this.loginCliente}>Inicia sesión como cliente</a>
    }else{
      titulo = <strong>Inicio sesión clientes</strong>
      enlace = <a href="#" onClick={this.loginProfesional}>Inicia sesión como profesional</a>
    }

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5">

              <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Error al iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>El usuario o la contraseña son incorrectos</Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={this.handleClose}>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </Modal>

              <div className="card">
                <div className="card-header">
                  {titulo}
                </div>
                <div className="card-body">
                  <div className="form-horizontal">
                    <div className="position-relative row form-group">
                      <div className="col-md-3">
                        <label className="">Email</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <input id="hf-email" name="hf-email" placeholder="" type="email" className="form-control" onChange={(event) => this.setState({ email: event.target.value })} />
                        <small className="help-block form-text text-muted">Introduce tu email</small>
                      </div>
                    </div>
                    <div className="position-relative row form-group">
                      <div className="col-md-3">
                        <label className="">Contraseña</label>
                      </div>
                      <div className="col-12 col-md-9">
                        <input id="hf-password" name="hf-password" placeholder="" type="password" className="form-control" onChange={(event) => this.setState({ pass: event.target.value })} />
                        <small className="help-block form-text text-muted">Introduce tu contraseña</small>
                      </div>
                    </div>
                    <div className="position-relative row form-group">
                    <div className="col-md-3">
                    </div>
                    <div className="col-12 col-md-9">
                    <button className="btn btn-primary" onClick={(event) => this.login(event)}>
                    <i className="fa fa-dot-circle-o">
                    </i> Enviar</button>
                    </div>
                  </div>
                  </div>
                </div>
                <div className="card-footer">
                    <div className="col-md-12">
                    <Link to='/registrar'><button type="reset" className="btn btn-info">Registrarse</button></Link>
                    </div>
                    <div className="col-md-12 mt-2">
                      {enlace}
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

