import React, { Component } from 'react';
import './App.css';
import API from './API/API'
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import { reactLocalStorage } from 'reactjs-localstorage';

class Muro extends Component {

  constructor(props) {
    super(props)
    this.state = { nick: '', trabajos: []}
    this.logout = this.logout.bind(this)

  }

  componentWillMount(){
    this.setState({nick: reactLocalStorage.get('nombre')})
  }

  logout() {
    reactLocalStorage.clear()
    this.props.logout()
  }


  render() {

    let label 
    if(this.state.trabajos.length==0){
      label = <label>No tienes ofertas</label>
    }
    return (<div id="ui-view">
      <nav className="navbar navbar-light bg-light">
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

      <div className="container-fluid">
        <div id="ui-view">
          <div className="row mt-5">
          <div className="col-sm-6 col-md-4">
            <div className="card">
            <div className="card-header">Card title<span className="badge badge-success float-right">Success</span></div>
            <div className="card-body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip
            ex ea commodo consequat.</div>
            </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Muro;

