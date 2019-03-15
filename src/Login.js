import React, { Component } from 'react';
import './App.css';
import API from './API/API'
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', pass: '', show: false , profesional: false}
    this.login = this.login.bind(this)
    this.goToRegistro = this.goToRegistro.bind(this);
    this.goToMuro = this.goToMuro.bind(this);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loginCliente = this.loginCliente.bind(this);
    this.loginProfesional = this.loginProfesional.bind(this);
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

    var pet = {profesional:this.state.profesional, email: this.state.email, pass: this.state.pass };
    var json = JSON.stringify(pet)

    new API().login(json)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.handleShow()
        }
      }).then((json) => {
        this.goToMuro()
      })
  }


  render() {


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
            <div className="col-md-12">

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

              <div class="card">
                <div class="card-header">
                  {titulo}
                </div>
                <div class="card-body">
                  <div class="form-horizontal">
                    <div class="position-relative row form-group">
                      <div class="col-md-3">
                        <label for="hf-email" class="">Email</label>
                      </div>
                      <div class="col-12 col-md-9">
                        <input id="hf-email" name="hf-email" placeholder="" autocomplete="email" type="email" class="form-control" onChange={(event) => this.setState({ email: event.target.value })} />
                        <small class="help-block form-text text-muted">Introduce tu email</small>
                      </div>
                    </div>
                    <div class="position-relative row form-group">
                      <div class="col-md-3">
                        <label for="hf-password" class="">Contraseña</label>
                      </div>
                      <div class="col-12 col-md-9">
                        <input id="hf-password" name="hf-password" placeholder="" autocomplete="current-password" type="password" class="form-control" onChange={(event) => this.setState({ pass: event.target.value })} />
                        <small class="help-block form-text text-muted">Introduce tu contraseña</small>
                      </div>
                    </div>
                    <div class="position-relative row form-group">
                    <div class="col-md-3">
                    </div>
                    <div class="col-12 col-md-9">
                    <button class="btn btn-primary" onClick={(event) => this.login(event)}>
                    <i class="fa fa-dot-circle-o">
                    </i> Enviar</button>
                    </div>
                  </div>
                  </div>
                </div>
                <div class="card-footer">
                  
                  <button type="reset" class="btn btn-ghost-danger" onClick={this.goToRegistro}>
                    <i class="fa fa-ban"></i> Registrarse</button>

                  {enlace}
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

