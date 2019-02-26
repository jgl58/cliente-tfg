import React, { Component } from 'react';
import './App.css';
import API from './API/API'

class Registro extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', pass: '', confirmpassword: '', nombre: '', apellidos: '' }
    this.registrar = this.registrar.bind(this)
    this.goToLogin = this.goToLogin.bind(this);
  }

  goToLogin(){
    this.props.log()
  }

  registrar(event) {
    if (this.state.pass === '' && this.state.confirmpassword === '' && this.state.email === '' && this.state.nombre === '' && this.state.apellidos === '') {
      alert("Introduce todos los datos")
    }
    else if (this.state.pass !== this.state.confirmpassword) {
      alert("Las contraseñas son distintas")
    } else {
      var pet = { email: this.state.email, pass: this.state.pass, nombre: this.state.nombre, apellidos: this.state.apellidos};
      
      var json = JSON.stringify(pet)
    
      new API().registro(json)
        .then((response) => {
          if (response.ok) {
            this.props.log()
          } else {
            alert("Nick ya en uso")
          }

        })
    }

  }

  render() {

    return <div className="container">
      <div className="card card-container">
        <p id="profile-name" className="profile-name-card">Registrate</p>

        <span id="reauth-email" className="reauth-email"></span>
        <input type="text" name="email" id="email" onChange={(event) => this.setState({ email: event.target.value })} className="form-control input-lg" placeholder="Email" />
        <br />
        <input type="password" name="password" id="password" onChange={(event) => this.setState({ pass: event.target.value })} className="form-control input-lg" placeholder="Contraseña" />
        <br />
        <input type="password" name="confirmpassword" id="confirmpassword" onChange={(event) => this.setState({ confirmpassword: event.target.value })} className="form-control input-lg" placeholder="Repita la contraseña" />
        <br />
        <input type="text" name="nombre" id="nombre" onChange={(event) => this.setState({ nombre: event.target.value })} className="form-control input-lg" placeholder="Nombre" />
        <br />
        <input type="text" name="apellidos" id="emapellidosail" onChange={(event) => this.setState({ apellidos: event.target.value })} className="form-control input-lg" placeholder="Apellidos" />
        <br />

        <button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.registrar}>Registrate</button>
        <button className="btn btn-lg btn-success btn-block btn-signin" onClick={this.goToLogin}>Login</button>
      </div>
    </div>
  }
}

export default Registro;

