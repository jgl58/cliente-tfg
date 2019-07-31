import React, { Component } from 'react';
import '../App.css'
import { reactLocalStorage } from 'reactjs-localstorage';
import './Navbar.css'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      nick: '', 
      ofertas: [], 
      home: false,
      logout: false,
      perfil: false,
      buscador: false,
      horario: false 
    }
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
    this.setState({home: true})
    
  }

  logout() {
    reactLocalStorage.clear()
    this.setState({logout: true})
  }

  perfil(){
    this.setState({perfil: true})
  }

  buscador(){
    this.setState({buscador: true})
  }
  horario(){
    this.setState({horario: true})
  }


  render() {
    console.log(this.state)
    if(this.state.logout == true  && window.location.pathname != '/'){ 
      return <Redirect to='/'></Redirect>
    }
    if(this.state.horario == true && window.location.pathname != '/horario'){ 
      return <Redirect to='/horario'></Redirect>
    }
    if(this.state.perfil == true && window.location.pathname != '/perfil'){ 
      return <Redirect to='/perfil'></Redirect>
    }
    if(this.state.buscador == true && window.location.pathname != '/buscador'){ 
      return <Redirect to='/buscador'></Redirect>
    }

    if(reactLocalStorage.get('isProfesional') == 'true' && this.state.home == true && window.location.pathname != '/muroProfesional'){   
      return <Redirect to="/muroProfesional"></Redirect>
    } 
    if(reactLocalStorage.get('isProfesional') == 'false' && this.state.home == true && window.location.pathname != '/muroCliente'){
      return <Redirect to="/muroCliente"></Redirect>
    }
    
    let horario
    let elem
    if(reactLocalStorage.get('isProfesional')=='true'){
      elem =<li className="nav-item">
        <a className="nav-link" onClick={this.buscador}>Buscar</a>
      </li>
      horario =<li className="nav-item">
      <a className="nav-link" onClick={this.horario}>Horario</a>
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
        <a className="nav-link" onClick={this.muro}>Home
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
    <a className="dropdown-item" onClick={this.perfil}>Perfil</a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" onClick={this.logout} >Cerrar sesión</a>
    </div>
  </div>

</nav>
    );
  }
}

export default Navbar;

