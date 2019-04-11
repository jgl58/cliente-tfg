import React, { Component } from 'react';
import '../App.css'
import { reactLocalStorage } from 'reactjs-localstorage';

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', ofertas: [] }
    this.logout = this.logout.bind(this)
    this.perfil = this.perfil.bind(this)
    this.muro = this.muro.bind(this)
  }

  componentWillMount() {
    this.setState({ nick: reactLocalStorage.get('nombre') })
  }

  muro(){
      this.props.muro()
  }

  logout() {
    reactLocalStorage.clear()
    this.props.logout()
  }

  perfil(){
    this.props.perfil();
  }


  render() {
    return (
        <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand mb-0 h1"><a href="#" onClick={this.muro}>Home</a></span>
      <div className="dropdown pull-right">
        <div className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Hola {this.state.nick}
        </div>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#" onClick={this.perfil}>Perfil</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" onClick={this.logout} href="#">Cerrar sesión</a>
        </div>
      </div>
    </nav>
    );
  }
}

export default Navbar;

