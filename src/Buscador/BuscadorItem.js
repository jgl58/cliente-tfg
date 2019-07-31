import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class BuscadorItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      oferta: false
    }
  }

  goOferta(id){
    reactLocalStorage.set('idOferta',id)
    this.setState({oferta: true})
    
  }

  render() {
    console.log(this.props.oferta)

    if(this.state.oferta == true){
      return <Redirect push to='/oferta'/>
    }

    return (
    <div class="card booking-card">

        <div class="view overlay">
            <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/8-col/img (5).jpg" alt="Card image cap"/>
            <a href="#!">
            <div class="mask rgba-white-slight"></div>
            </a>
        </div>

        <div class="card-body">

            <h4 class="card-title font-weight-bold"><a>{this.props.oferta.titulo}</a></h4>
            <ul class="list-unstyled list-inline rating mb-0">
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"> </i></li>
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
            <li class="list-inline-item"><i class="fas fa-star-half-alt amber-text"></i></li>
            <li class="list-inline-item"><p class="text-muted">4.5 (413)</p></li>
            </ul>
            <p class="mb-2">{this.props.oferta.provincia}</p>
            <p class="card-text">{this.props.oferta.descripcion}</p>
            <hr class="my-4"/>
            <p class="lead"><strong>Hora</strong></p>
            <ul class="list-unstyled list-inline d-flex justify-content-between mb-0">
            <li class="list-inline-item mr-0">
                <div class="chip mr-0">{this.props.oferta.hora}</div>
            </li>
            </ul>
            <a class="btn btn-flat deep-purple-text p-1 mx-0 mb-0" onClick={() => this.goOferta(this.props.oferta.id)}>Ver más</a>

        </div>

    </div>
    );
  }
}

export default BuscadorItem;

