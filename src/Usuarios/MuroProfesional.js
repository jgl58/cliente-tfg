import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

class MuroProfesional extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', ofertas: [] }
    this.crearOferta = this.crearOferta.bind(this)
    this.goOferta = this.goOferta.bind(this)
  }

  componentWillMount() {
    this.setState({ nick: reactLocalStorage.get('nombre') })

    new API().getTrabajos()
      .then((json) => {
        this.setState({ ofertas: json.ofertas })
      })

  }

  goOferta(id){
    console.log("Visitando oferta "+id)
    reactLocalStorage.set('idOferta',id)
    this.props.oferta()
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
            <div className="card-body">{this.state.ofertas[i].descripcion}<a className="float-right" onClick={() => this.goOferta(this.state.ofertas[i].id)}><i class="fa fa-plus"></i></a></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MuroProfesional;
