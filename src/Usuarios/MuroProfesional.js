import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Perfil from './Perfil';
import Navbar from './Navbar'
import BuscadorItem from '../Buscador/BuscadorItem'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import socketIOClient from 'socket.io-client';

class MuroProfesional extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nick: '', ofertas: [], clientes: [],
      oferta: false,
      perfilPublico: false,
      tarjetasVisibles: 3
    }
    this.goOferta = this.goOferta.bind(this)
    this.perfil = this.perfil.bind(this)
    this.chat = this.chat.bind(this)
  }

  componentWillMount() {

    console.log(reactLocalStorage.get("token"))

    this.setState({ nick: reactLocalStorage.get('nombre') })

    new API().getTrabajos(reactLocalStorage.get("idUser"))
      .then((json) => {
        this.setState({ ofertas: json.ofertas })

        new API().getHistorialClientes(reactLocalStorage.get("idUser")).then((json) => {
          this.setState({ clientes: json.clientes })
        })
      })

  }


  goOferta(id) {
    console.log("Visitando oferta " + id)
    reactLocalStorage.set('idOferta', id)
    this.setState({ oferta: true })
  }

  perfil() {
    this.props.goToPerfil()
  }

  chat(id) {
    reactLocalStorage.set("visitarProfesional", false)
    reactLocalStorage.set("visitar", id)
    this.setState({ perfilPublico: true })
  }

  render() {



    if (this.state.oferta == true) {
      return <Redirect push to='/oferta/' />
    }
    if (this.state.perfilPublico == true) {
      return <Redirect push to='/publico' />
    }
    let ofertas = []
    let clientes = []
    if (this.state.ofertas.length == 0) {
      ofertas = <label>No has aceptado ninguna oferta todavía</label>
    } else {
      for (let i = 0; i < this.state.tarjetasVisibles; i++) {

        if (this.state.ofertas[i] != null) {
          

          let elem = <div className="col-md-4 mb-2">
            <BuscadorItem oferta={this.state.ofertas[i]} goOferta={this.props.oferta}></BuscadorItem>
          </div> 

          ofertas.push(elem)
        }

      }

    }

    if (this.state.clientes.length == 0) {
      clientes = <label>No tienes clientes todavía</label>
    } else {
      for (let i = 0; i < this.state.tarjetasVisibles; i++) {

        if (this.state.clientes[i] != null) {
          let elem = <div className="col-sm-6 col-md-4" key={i}>
            <div className="card mb-2">
              <div className="card-header"><b>Cliente</b></div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p class="card-text"><b>{this.state.clientes[i].nombre} {this.state.clientes[i].apellidos}</b></p>
                    <p class="card-text">Tlf: {this.state.clientes[i].telefono}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="btn btn-primary" onClick={() => this.chat(this.state.clientes[i].id)}>Contactar</div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          clientes.push(elem)
        }

      }
    }



    return (

      <div>
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              Tus últimos trabajos aceptados
              <a className="float-right" href="/listaOfertas">Ver más</a>
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
              <a className="float-right" href="/listaUsuarios">Ver más</a>
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

