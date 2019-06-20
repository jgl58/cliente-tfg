import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

class Buscador extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', ofertas: [], profesionales: [] }
  }

  componentWillMount() {
  }

  render() {

    
    return (
      <div>
        <div className="container-fluid">
          <div className="col-md-12">
            <div className="card mt-3">
              <div className="card-header">
                Tus ofertas
              </div>
              <div className="card-body">
                <div className="row">
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
      </div>
    );
  }
}

export default Buscador;

