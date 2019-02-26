import React, { Component } from 'react';
import './App.css';
import API from './API/API'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', pass: '' }
    this.login = this.login.bind(this)
    this.goToRegistro = this.goToRegistro.bind(this);
  }

  goToRegistro() {
    this.props.reg()
  }
  login(event) {
    var pet = { nick: this.state.nick, pass: this.state.pass };
    var json = JSON.stringify(pet)

    new API().login(json)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert('Datos incorrectos')
        }
      }).then((json) => {
        console.log(json)

      })
  }


  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              <p className="h4 text-center mb-4">Log in</p>
              <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
            </label>
              <input
                type="email"
                id="email"
                onChange={(event) => this.setState({ nick: event.target.value })}
                className="form-control"
              />
              <br />
              <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Your password
            </label>
              <input
                type="password"
                id="pass"
                onChange={(event) => this.setState({ pass: event.target.value })}
                className="form-control"
              />
              <div className="text-center mt-4">
                <button className="btn btn-primary" color="indigo" type="submit" onClick={(event) => this.login(event)}>Login</button>
              </div>
              <button className="btn btn-primary" onClick={this.goToRegistro}>Registrarse</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

