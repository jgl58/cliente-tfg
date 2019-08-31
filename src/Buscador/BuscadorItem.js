import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class BuscadorItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      oferta: false,
      direccion: "",
      fecha:"",
      hora: ""
    }
  }
  formatDate(date) {
    var monthNames = [
      "enero", "febrero", "marzo",
      "abril", "mayo", "junio", "julio",
      "agosto", "septiembre", "octubre",
      "noviembre", "diciembre"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    var hour = date.getHours();
    var min = date.getMinutes();
    if(min == 0){min = "00"}
    var d = day + '/' + monthNames[monthIndex] + '/' + year;
    var h = hour+":"+min

    this.setState({fecha: d})
    this.setState({hora: h})
  }

  componentWillMount(){

    var dir = this.props.oferta.direccion
    dir = dir.replace(" ","+");

    let pob = this.props.oferta.poblacion
    pob = pob.replace(" ","+");
    let src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAYS8EDyWG-GGFK80V2bwJ3atV68WninOI&q="`+pob+dir+`"`

    this.setState({direccion: src})

    this.formatDate(new Date(this.props.oferta.fecha))
  }

  goOferta(id){
    reactLocalStorage.set('idOferta',id)
    this.setState({oferta: true})
    
  }

  render() {
    console.log(this.props.oferta)

    if(this.state.oferta == true){
      let url = "/oferta/"+this.props.oferta.id
        return <Redirect push to={url}/>
    }
    let estado
    if (this.props.oferta.estado) {
        estado = <span className="badge badge-success float-right">Seleccionada</span>
    } else {
        estado = <span className="badge badge-danger float-right">No seleccionada</span>
    }

    return (
    <div class="card">
        <div class="card-body">
            {estado}
            <h4 class="card-title font-weight-bold">{this.props.oferta.titulo}</h4>
            <p class="mb-2">{this.props.oferta.provincia}</p>
            <p class="card-text">{this.props.oferta.descripcion}</p>
            <p class="card-text"><b>{this.props.oferta.precio} €</b></p>
            <p class="card-text"><b>{this.props.oferta.duracion} horas</b></p>
            <hr class="my-4"/>
            <p class="card-text">{this.props.oferta.direccion} {this.props.oferta.poblacion}</p>
            <ul class="list-unstyled list-inline d-flex justify-content-between mb-0">
            <li class="list-inline-item mr-0">
                <div class="chip mr-0">{this.state.hora}</div>
            </li>
            <li class="list-inline-item mr-0">
                <div class="chip mr-0">{this.state.fecha}</div>
            </li>
            </ul>
            <a class="btn btn-default" onClick={() => this.goOferta(this.props.oferta.id)}>Ver más</a>

        </div>
        <div class="card-img-bottom">
          <iframe
            width="100%"
            height="100%"
            frameborder="0" style={{border: 0}}
            src={this.state.direccion} allowfullscreen>
          </iframe>
        </div>

    </div>
    );
  }
}

export default BuscadorItem;

