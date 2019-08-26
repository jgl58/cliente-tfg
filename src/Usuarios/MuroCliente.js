import React, { Component } from 'react';
import '../App.css';
import './Muro.css'
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Container, Button } from 'react-floating-action-button'
import BuscadorItem from '../Buscador/BuscadorItem'

class MuroCliente extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', ofertas: [], profesionales: [] ,
    perfilPublico: false,
    crearOferta: false,
    oferta: false,
    tarjetasVisibles: 3
  }
    this.crearOferta = this.crearOferta.bind(this)
    this.goOferta = this.goOferta.bind(this)
    this.chat = this.chat.bind(this)
  }

  componentWillMount() {
    this.setState({ nick: reactLocalStorage.get('nombre') })
    console.log(reactLocalStorage.get("idUser"))

    new API().getOfertasCreadas(reactLocalStorage.get("idUser"))
      .then((json) => {
        this.setState({ ofertas: json.ofertas })
        
        new API().getHistorialProfesionales(reactLocalStorage.get("idUser")).then((json) => {
          this.setState({ profesionales: json.profesionales })
        })
      })
  

  }

  chat(id){
    reactLocalStorage.set("visitarProfesional", true)
    reactLocalStorage.set("visitar",id)
    this.setState({perfilPublico: true})
  }

  goOferta(id){
    reactLocalStorage.set('idOferta',id)
    this.setState({oferta: true})
  }

  crearOferta() {
    this.setState({crearOferta: true})
  }

  render() {

    if(this.state.perfilPublico == true){
      return <Redirect push to='/publico'/>
    }
    if(this.state.crearOferta == true){
      return <Redirect push to='/crearOferta'/>
    }
    if(this.state.oferta == true){
      return <Redirect push to='/oferta'/>
    }

    var ofertas = []
    var profesionales = []
    if (this.state.ofertas.length == 0) {
      
      ofertas = <label>No has creado ninguna oferta todavía</label>
    } else {
      for (let i = 0; i < this.state.tarjetasVisibles; i++) {

        if(this.state.ofertas[i] != null){
          
          let elem = <div className="col-md-4 mb-2">
            <BuscadorItem oferta={this.state.ofertas[i]} goOferta={this.props.oferta}></BuscadorItem>
          </div> 
  
          ofertas.push(elem)
        }
        
      }

    }
    
    
    if (this.state.profesionales.length == 0) {
      profesionales = <label>No tienes profesionales todavía</label>
    } else {
      for (let i = 0; i < this.state.tarjetasVisibles; i++) {

        if(this.state.profesionales[i] != null){
          let elem = <div className="col-sm-6 col-md-4" key={i}>
          <div className="card mb-2">
                      <div className="card-header"><b>Profesional</b></div>
                      <div className="card-body">
                          <div className="row">
                              <div className="col-md-6">
                                  <p class="card-text"><b>{this.state.profesionales[i].nombre} {this.state.profesionales[i].apellidos}</b></p>
                                  <p class="card-text">Tlf: {this.state.profesionales[i].telefono}</p>
                              </div>
                          </div>
                          <div className="row">
                              <div className="col">
                                  <div className="btn btn-primary" onClick={() => this.chat(this.state.profesionales[i].id)}>Contactar</div>
                              </div>
  
                          </div>
                      </div>
                  </div>
              </div>

          profesionales.push(elem)
        }
        
      }
    }

    
    return (
      <div>
        
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              Tus últimas ofertas
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
              Historial de profesionales
              <a className="float-right" href="/listaUsuarios">Ver más</a>
            </div>
            <div className="card-body">
              <div className="row">
              {profesionales}
              </div>
            </div>
          </div>
          <Container>
            <Button
                tooltip="Crear oferta nueva"
                icon="fas fa-plus"
                rotate={false}
                onClick={this.crearOferta} />
          </Container>
        </div>
        
      </div>
    );
  }
}

export default MuroCliente;

