import React, { Component } from 'react';
import './App.css';
import API from './API/API'
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"

class Registro extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', pass: '', confirmpassword: '', nombre: '', apellidos: '', isProfesional: false }
    this.registrar = this.registrar.bind(this)
    this.goToLogin = this.goToLogin.bind(this);
    this.registroCliente = this.registroCliente.bind(this);
    this.registroProfesional = this.registroProfesional.bind(this);
  }

  goToLogin() {
    this.props.log()
  }
  registroProfesional() {
    this.setState({ isProfesional: true })
  }

  registroCliente() {
    this.setState({ isProfesional: false })
  }

  registrar(event) {
    if (this.state.pass === '' && this.state.confirmpassword === '' && this.state.email === '' && this.state.nombre === '' && this.state.apellidos === '') {
      alert("Introduce todos los datos")
    }
    else if (this.state.pass !== this.state.confirmpassword) {
      alert("Las contraseñas son distintas")
    } else {
      var pet = { isProfesional: this.state.isProfesional, email: this.state.email, pass: this.state.pass, nombre: this.state.nombre, apellidos: this.state.apellidos };

      var json = JSON.stringify(pet)

      new API().registro(json)
        .then((response) => {
          if (response.ok) {
            this.props.log()
          } else {
            alert("Email ya en uso")
          }
        })
    }

  }

  render() {
    let titulo
    let enlace
    if (this.state.isProfesional) {
      titulo = <strong>Registro profesionales</strong>
      enlace = <a href="#" onClick={this.registroCliente}>Registrarse como cliente</a>
    } else {
      titulo = <strong>Registro clientes</strong>
      enlace = <a href="#" onClick={this.registroProfesional}>Registrarse como profesional</a>
    }

    return <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12">

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Error al registrarse</Modal.Title>
              </Modal.Header>
              <Modal.Body>El usuario o la contraseña ya existen</Modal.Body>
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
                      <label for="hf-password" class="">Repite la contraseña</label>
                    </div>
                    <div class="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" autocomplete="current-password" type="password" class="form-control" onChange={(event) => this.setState({ confirmpassword: event.target.value })} />
                      <small class="help-block form-text text-muted">Repite la contraseña</small>
                    </div>
                  </div>
                  <div class="position-relative row form-group">
                    <div class="col-md-3">
                      <label for="hf-text" class="">Nombre</label>
                    </div>
                    <div class="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" autocomplete="current-password" type="text" class="form-control" onChange={(event) => this.setState({ nombre: event.target.value })} />
                      <small class="help-block form-text text-muted">Introduce tu nombre</small>
                    </div>
                  </div>
                  <div class="position-relative row form-group">
                    <div class="col-md-3">
                      <label for="hf-password" class="">Apellidos</label>
                    </div>
                    <div class="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" autocomplete="current-password" type="text" class="form-control" onChange={(event) => this.setState({ apellidos: event.target.value })} />
                      <small class="help-block form-text text-muted">Introduce tus apellidos</small>
                    </div>
                  </div>
                  <div class="position-relative row form-group">
                    <div class="col-md-3">
                    </div>
                    <div class="col-12 col-md-9">
                      <button class="btn btn-primary" onClick={(event) => this.registrar(event)}>
                        <i class="fa fa-dot-circle-o">
                        </i> Registrarse</button>
                    </div>
                  </div>

                </div>
              </div>
              <div class="card-footer">

                <button type="reset" class="btn btn-ghost-danger" onClick={this.goToLogin}>
                  <i class="fa fa-ban"></i> Ir a inicio de sesion</button>

                {enlace}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  }
}

export default Registro;

