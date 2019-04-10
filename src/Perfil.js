import React, { Component } from 'react';
import './App.css';
import API from './API/API'
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import { reactLocalStorage } from 'reactjs-localstorage';

class Perfil extends Component {

    constructor(props) {
        super(props)
        this.state = { nick: '', user: {} }
        this.logout = this.logout.bind(this)

    }

    componentWillMount() {
        this.setState({ nick: reactLocalStorage.get('nombre') })
        new API().getCliente().then((json) => {
            this.setState({ user: json.user })
        })
    }

    logout() {
        reactLocalStorage.clear()
        this.props.logout()
    }


    render() {


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
                    <div className="card mt-3">
                        <div className="card-header">
                            Tu Perfil
                        </div>
                        <div className="card-body">
                            <div class="form-horizontal">
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label" for="text-input">Usuario</label>
                                    <div class="col-md-9">
                                        <input class="form-control" id="text-input" type="text" name="text-input" placeholder={this.state.user.nombre} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label" for="text-input">Apellidos</label>
                                    <div class="col-md-9">
                                        <input class="form-control" id="text-input" type="text" name="text-input" placeholder={this.state.user.apellidos} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label" for="text-input">Email</label>
                                    <div class="col-md-9">
                                        <input class="form-control" id="text-input" type="text" name="text-input" placeholder={this.state.user.email} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label" for="text-input">Dirección</label>
                                    <div class="col-md-9">
                                        <input class="form-control" id="text-input" type="text" name="text-input" placeholder={this.state.user.direccion} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label" for="text-input">Población</label>
                                    <div class="col-md-9">
                                        <input class="form-control" id="text-input" type="text" name="text-input" placeholder={this.state.user.poblacion} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label" for="text-input">Provincia</label>
                                    <div class="col-md-9">
                                        <input class="form-control" id="text-input" type="text" name="text-input" placeholder={this.state.user.provincia} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label" for="text-input">Pais</label>
                                    <div class="col-md-9">
                                        <input class="form-control" id="text-input" type="text" name="text-input" placeholder={this.state.user.pais} />
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-3 col-form-label" for="text-input">Teléfono</label>
                                    <div class="col-md-9">
                                        <input class="form-control" id="text-input" type="text" name="text-input" placeholder={this.state.user.telefono} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                            <div className="btn btn-primary">Guardar</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Perfil;

