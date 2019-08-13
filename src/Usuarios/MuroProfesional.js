import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Perfil from './Perfil';
import Navbar from './Navbar'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import socketIOClient from 'socket.io-client';

class MuroProfesional extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', ofertas: [], clientes: [] ,response: "",
    endpoint: "http://jonaygilabert.ddns.net:4001",
    oferta: false,
    perfilPublico: false
  }
    this.goOferta = this.goOferta.bind(this)
    this.perfil = this.perfil.bind(this)
    this.chat = this.chat.bind(this)
  }

  componentWillMount() {
    this.setState({ nick: reactLocalStorage.get('nombre') })

    new API().getTrabajos(reactLocalStorage.get("idUser"))
      .then((json) => {
        this.setState({ ofertas: json.ofertas })
         
        new API().getHistorialClientes(reactLocalStorage.get("idUser")).then((json) => {
          this.setState({ clientes: json.clientes })
        })
      })

  }

  
  componentDidMount(){
    const {endpoint} = this.state;
    const socket = socketIOClient(endpoint);

    

    socket.on('connect', function(){
        var r = ""
        if(reactLocalStorage.get("visitarProfesional") == 'true'){
            r = reactLocalStorage.get("idUser")+"-"+reactLocalStorage.get("visitar")
        }else{
            r = reactLocalStorage.get("visitar")+"-"+reactLocalStorage.get("idUser")
        }
        socket.emit('room', r);
        socket.on("notificacion",(data)=>{
                console.log(data)  
        })
    })


}


  goOferta(id){
    console.log("Visitando oferta "+id)
    reactLocalStorage.set('idOferta',id)
    this.setState({oferta: true})
  }

  perfil(){
    this.props.goToPerfil()
  }

  chat(id){
    reactLocalStorage.set("visitarProfesional", false)
    reactLocalStorage.set("visitar",id)
    this.setState({perfilPublico: true})
  }

  render() {

    

    if(this.state.oferta == true){
      return <Redirect push to='/oferta'/>
    }
    if(this.state.perfilPublico == true){
      return <Redirect push to='/publico'/>
    }
    let ofertas = []
    let clientes = []
    if (this.state.ofertas.length == 0) {
      ofertas = <label>No has aceptado ninguna oferta todavía</label>
    } else {
      for (let i = 0; i < this.state.ofertas.length; i++) {

        let estado
        if (this.state.ofertas[i].estado) {
          estado = <span className="badge badge-success float-right">Seleccionada</span>
        } else {
          estado = <span className="badge badge-danger float-right">No seleccionada</span>
        }

        let elem = <div className="col-sm-6 col-md-4" key={i}>
          <div className="card">
            <div className="card-header">{this.state.ofertas[i].titulo}{estado}</div>
            <div className="card-body">{this.state.ofertas[i].descripcion}<a className="float-right" onClick={() => this.goOferta(this.state.ofertas[i].id)}><i className="fa fa-plus"></i></a></div>
          </div>
        </div>

        ofertas.push(elem)
      }

    }

    if (this.state.clientes.length == 0) {
      clientes = <label>No tienes clientes todavía</label>
    } else {
      for (let i = 0; i < this.state.clientes.length; i++) {

        let elem = <div className="col-sm-6 col-md-3" key={i}>
                <div className="card">
                  <div className="card-header">{this.state.clientes[i].nombre} {this.state.clientes[i].apellidos}</div>
                  <div className="card-body">
                    <div className="btn btn-primary" onClick={() => this.chat(this.state.clientes[i].id)}>Contactar</div>
                  </div>
                </div>
              </div>

        clientes.push(elem)
      }
    }

    

    return (
      
      <div>
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              Tus trabajos aceptados
            </div>
            <div className="card-body">
              <div className="row">
                {ofertas}
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-header">
              Historial de clientes
            </div>
            <div className="card-body">
              <div className="row">
                {clientes}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MuroProfesional;

