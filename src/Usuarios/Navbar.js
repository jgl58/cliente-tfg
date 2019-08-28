import React, { Component } from 'react';
import '../App.css'
import { reactLocalStorage } from 'reactjs-localstorage';
import './Navbar.css'
import io from 'socket.io-client';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import API from '../API/API';
import { MDBNotification } from "mdbreact";


class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = { 
      noti: [],
      nick: '', 
      home: false,
      logout: false,
      perfil: false,
      buscador: false,
      goOferta: false,
      horario: false,response: "",
      endpoint: "http://localhost:4001",
      reload: false
    }
    this.logout = this.logout.bind(this)
    this.perfil = this.perfil.bind(this)
    this.muro = this.muro.bind(this)
    this.buscador = this.buscador.bind(this)
    this.horario = this.horario.bind(this)
    this.cancelarNotificacion = this.cancelarNotificacion.bind(this)
    this.socket = io("http://localhost:4001")
    this.socket.emit('room', "profesional"+reactLocalStorage.get("idUser"));

    this.socket.on("n",(data)=>{
      new API().getNotificaciones(data.profesional_id).then(function(d){
        //  console.log(Array.isArray(this.state.notificaciones))
          if(d.notificaciones.length != 0){
            console.log(d.notificaciones)
            this.setState({noti:d.notificaciones})
            reactLocalStorage.set("notificaciones",this.state.noti)
          }
            
        }.bind(this))
      
    })
    
  }

  componentWillMount() {
    if(reactLocalStorage.get("token") == undefined){
      this.logout()
    }


    this.setState({ nick: reactLocalStorage.get('nombre') })

    new API().getNotificaciones(reactLocalStorage.get('idUser')).then(function(d){
        if(d.notificaciones.length != 0){
          this.setState({noti:d.notificaciones})
          reactLocalStorage.set("notificaciones",this.state.noti)
        }
          
      }.bind(this))
  } 

  cancelarNotificacion(id){
    new API().cancelarNotificacion(reactLocalStorage.get("idUser"),id).then(function (response) {})
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

    if(this.state.goOferta == true && reactLocalStorage.get('isProfesional') == 'true'){ 
      return <Redirect push to='/oferta'></Redirect>
    }

    if(this.state.logout == true  && window.location.pathname != '/'){ 
      reactLocalStorage.clear()
      return <Redirect push to='/'></Redirect>
    }
    if(this.state.horario == true && window.location.pathname != '/horario'){ 
      return <Redirect push to='/horario'></Redirect>
    }
    if(this.state.perfil == true && window.location.pathname != '/perfil'){ 
      return <Redirect push to='/perfil'></Redirect>
    }
    if(this.state.buscador == true && window.location.pathname != '/buscador'){ 
      return <Redirect push to='/buscador'></Redirect>
    }

    if(reactLocalStorage.get('isProfesional') == 'true' && this.state.home == true && window.location.pathname != '/muroProfesional'){   
      return <Redirect push to="/muroProfesional"></Redirect>
    } 
    if(reactLocalStorage.get('isProfesional') == 'false' && this.state.home == true && window.location.pathname != '/muroCliente'){
      return <Redirect push to="/muroCliente"></Redirect>
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

    let mensaje
    if(this.state.noti.length != 0 ){
      let oferta = this.state.noti.slice(-1).pop()
      reactLocalStorage.set("idOferta",oferta.mensaje)
      let m = <div>Tienes una <Link to="/oferta">oferta</Link> asignada. <br/>
        <Link onClick={this.cancelarNotificacion(oferta.id)}>Cancelar oferta</Link>
      </div>
      mensaje = <MDBNotification
                  show
                  fade
                  iconClassName="text-primary"
                  title="Oferta asignada"
                  message={m}
                  text=""
                />
    }

    return (
    <nav className="navbar navbar-expand-lg navbar-dark primary-color">
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
    <div id="menu" className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
      <a className="dropdown-item" onClick={this.perfil}>Perfil</a>
      <div className="dropdown-divider"></div>
      <a className="dropdown-item" onClick={this.logout} >Cerrar sesión</a>
    </div>
  </div>
{mensaje}
</nav>

    );
  }
}

export default Navbar;

