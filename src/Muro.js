import React, { Component } from 'react';
import './App.css';
import API from './API/API'
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import { reactLocalStorage } from 'reactjs-localstorage';

class Muro extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', ofertas: [] }
    this.logout = this.logout.bind(this)

  }

  componentWillMount() {
    this.setState({ nick: reactLocalStorage.get('nombre') })

    new API().getOfertasCreadas()
      .then((json) => {
        this.setState({ ofertas: json.ofertas })
      })

  }

  logout() {
    reactLocalStorage.clear()
    this.props.logout()
  }


  render() {

    let ofertas = []
    if (this.state.ofertas.length == 0) {
      ofertas = <label>No has creado ninguna oferta todavía</label>
    } else {
      for (let i = 0; i < this.state.ofertas.length; i++) {
        console.log(this.state.ofertas[i].titulo)
        let elem = <div className="col-sm-6 col-md-4">
          <div className="card">
            <div className="card-header">{this.state.ofertas[i].titulo}<span className="badge badge-success float-right">Acabada</span></div>
            <div className="card-body">{this.state.ofertas[i].descripcion}</div>
          </div>
        </div>

        ofertas.push(elem)
      }

    }

    let nav = <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">Navbar</span>
      <div className="dropdown pull-right">
        <div className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Hola {this.state.nick}
        </div>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a className="dropdown-item" href="#">Perfil</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" onClick={this.logout} href="#">Cerrar sesión</a>
        </div>
      </div>
    </nav>
    return (
      <div id="ui-view">
        {nav}
        <div className="container-fluid">
          <div className="row mt-5">
            {ofertas}
          </div>
        </div>
      </div>
    );
  }
}

export default Muro;

