import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

class Muro extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', ofertas: [] }
    this.crearOferta = this.crearOferta.bind(this)
  }

  componentWillMount() {
    this.setState({ nick: reactLocalStorage.get('nombre') })

    new API().getOfertasCreadas()
      .then((json) => {
        this.setState({ ofertas: json.ofertas })
      })

  }

  crearOferta() {
    this.props.crearOferta();
  }

  render() {

    let ofertas = []
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
            <div className="card-body">{this.state.ofertas[i].descripcion}<a className="float-right"><i class="fa fa-plus"></i></a></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Muro;

