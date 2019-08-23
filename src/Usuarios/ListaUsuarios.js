import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import BuscadorItem from '../Buscador/BuscadorItem'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../Usuarios/Navbar'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class ListaUsuarios extends Component {

  constructor(props) {
    super(props)
    this.state = {clientes: [], provincias: [], selectedProvincia: '9',selectedTitle:'' }  
    
  }

  componentWillMount() {


    if(reactLocalStorage.get("isProfesional") == 'true'){
        new API().getHistorialClientes(reactLocalStorage.get("idUser")).then((json) => {
            this.setState({ clientes: json.clientes })
          })
    }else{
        new API().getHistorialProfesionales(reactLocalStorage.get("idUser")).then((json) => {
            this.setState({ clientes: json.profesionales })
          })
    }
  }

  chat(id) {
      if(reactLocalStorage.get("isProfesional")=='true'){
        reactLocalStorage.set("visitarProfesional", false)
      }else{
        reactLocalStorage.set("visitarProfesional", true)
      }
    
    reactLocalStorage.set("visitar", id)
    this.setState({ perfilPublico: true })
  }


  render() {
    if (this.state.perfilPublico == true) {
        return <Redirect push to='/publico' />
    }
    let title=""
    let t =""
    if(reactLocalStorage.get("isProfesional")=='true'){
        title = <h1>Estos son tus clientes</h1>
        t = <b>Cliente</b>
    }else{
        title = <h1>Estos son tus profesionales</h1>
        t = <b>Profesional</b>
    }

    let clientes = []
    
    for(let i=0;i<this.state.clientes.length;i++){
      
        if (this.state.clientes.length == 0) {
            clientes = <label>No tienes clientes todavía</label>
          } else {
      
                let elem = <div className="col-sm-6 col-md-4" key={i}>
                  <div className="card mb-2">
                    <div className="card-header">{t}</div>
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
    return (
      <div>
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-md-2"></div>
            <div className="col-md-8">
                {title}
            </div>
            <div className="col-md-2"></div>
          
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="row">
                {clientes}
              </div>
              
            </div>
            <div className="col-md-2"></div>
           
          </div>
        </div>
      </div>
    );
  }
}

export default ListaUsuarios;

