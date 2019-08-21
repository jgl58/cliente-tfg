import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class MuroCliente extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', ofertas: [], profesionales: [] ,
    perfilPublico: false,
    crearOferta: false,
    oferta: false
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
      return <Redirect to='/crearOferta'/>
    }
    if(this.state.oferta == true){
      return <Redirect push to='/oferta'/>
    }

    var ofertas = []
    var profesionales = []
    if (this.state.ofertas.length == 0) {
      
      ofertas = <label>No has creado ninguna oferta todavía</label>
    } else {
      for (let i = 0; i < this.state.ofertas.length; i++) {
        let estado
        if (this.state.ofertas[i].estado) {
          estado = <span className="badge badge-success float-right">Seleccionada</span>
        } else {
          estado = <span className="badge badge-danger float-right">No seleccionada</span>
        }

        let elem = <div className="col-sm-6 col-md-4">
          <div className="card">
            <div className="card-header">{this.state.ofertas[i].titulo}{estado}</div>
            <div className="card-body">{this.state.ofertas[i].descripcion}<a className="float-right" onClick={() => this.goOferta(this.state.ofertas[i].id)}><i class="fa fa-plus"></i></a></div>
          </div>
        </div>

        ofertas.push(elem)
      }

    }
    
    
    if (this.state.profesionales.length == 0) {
      profesionales = <label>No tienes profesionales todavía</label>
    } else {
      for (let i = 0; i < this.state.profesionales.length; i++) {

        let elem = <div className="col-sm-6 col-md-3">
                <div className="card">
                  <div className="card-header">{this.state.profesionales[i].nombre} {this.state.profesionales[i].apellidos}</div>
                  <div className="card-body">
                    <div className="btn btn-primary" onClick={() => this.chat(this.state.profesionales[i].id)}>Contactar</div>
                  </div>
                </div>
              </div>

        profesionales.push(elem)
      }
    }

    
    return (
      <div>
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              Tus ofertas
                <a className="float-right" onClick={this.crearOferta}><i class="fa fa-plus fa-lg"></i></a>
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
            </div>
            <div className="card-body">
              <div className="row">
              {profesionales}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MuroCliente;

