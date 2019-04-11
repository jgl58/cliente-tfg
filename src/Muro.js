import React, { Component } from 'react';
import './App.css';
import API from './API/API'
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import { reactLocalStorage } from 'reactjs-localstorage';
import { timingSafeEqual } from 'crypto';

class Muro extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', ofertas: [] }
  }

  componentWillMount() {
    this.setState({ nick: reactLocalStorage.get('nombre') })

    new API().getOfertasCreadas()
      .then((json) => {
        this.setState({ ofertas: json.ofertas })
      })

  }

  render() {

    let ofertas = []
    if (this.state.ofertas.length == 0) {
      ofertas = <label>No has creado ninguna oferta todavía</label>
    } else {
      for (let i = 0; i < this.state.ofertas.length; i++) {
        let elem = <div className="col-sm-6 col-md-4">
          <div className="card">
            <div className="card-header">{this.state.ofertas[i].titulo}<span className="badge badge-success float-right">Acabada</span></div>
            <div className="card-body">{this.state.ofertas[i].descripcion}</div>
          </div>
        </div>

        ofertas.push(elem)
      }

    }

    return (
      <div>
        <div className="container-fluid">
          <div className="card mt-3">
            <div className="card-header">
              Tus ofertas
            </div>
            <div className="card-body">
              {ofertas}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Muro;

