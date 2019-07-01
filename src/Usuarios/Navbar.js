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
    this.buscador = this.buscador.bind(this)
    this.horario = this.horario.bind(this)
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

  buscador(){
    this.props.buscador();
  }
  horario(){
    this.props.horario();
  }


  render() {
    
    let horario
    let elem
    if(reactLocalStorage.get('isProfesional')=='true'){
      elem =<li className="nav-item">
        <a className="nav-link" href="#"onClick={this.buscador}>Buscar</a>
      </li>
      horario =<li className="nav-item">
      <a className="nav-link" href="#" onClick={this.horario}>Horario</a>
    </li>
    }
    return (<nav className="navbar navbar-expand-lg navbar-dark primary-color">
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="basicExampleNav">

    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#"  onClick={this.muro}>Home
          <span className="sr-only">(current)</span>
        </a>
      </li>
      {elem}
      {horario}
  
    </ul>
  </div> 
  <div className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" 
      aria-haspopup="true" aria-expanded="false">Hola {this.state.nick}</a>
    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
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

