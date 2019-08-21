import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Perfil extends Component {

    constructor(props) {
        super(props)
        this.state = {
            provincias: [],
            user: {},
            nombre: "",
            apellidos: "",
            direccion: "", 
            poblacion: "", 
            newProvincia: "", 
            provincia: {}, 
            pais: "", 
            telefono: "", 
            valoracionMedia: "",
            cambiarPass: false
        }
        this.editarUsuario = this.editarUsuario.bind(this)
        this.cargarValoracion = this.cargarValoracion.bind(this)
        this.cambiarPass = this.cambiarPass.bind(this)
    }

    componentWillMount() {
        new API().getProvincias().then((json) => {
            this.setState({ provincias: json.provincias })

            new API().getProvincia(reactLocalStorage.get("provincia")).then((json) => {

                this.setState({ provincia: json.provincia })
                if (reactLocalStorage.get("isProfesional") === 'true') {
                    new API().getProfesional(reactLocalStorage.get("idUser")).then((json) => {
                        this.setState({ user: json.user })
                        console.log(json.user)
                        new API().getValoracionProfesional(json.user.id).then((valoracion) => {
                            console.log(valoracion.valoracion)
                            if (valoracion.valoracion != null)
                                this.setState({ valoracionMedia: valoracion.valoracion })
                            else
                                this.setState({ valoracionMedia: 0 })
                        })
                    })
                } else {
                    new API().getCliente(reactLocalStorage.get("idUser")).then((json) => {
                        this.setState({ user: json.user })
                    })
                }
            })



        })

    }

    cargarValoracion() {
        let valoracion = ''
        switch (this.state.valoracionMedia) {
            case 0:
                valoracion = <div>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                </div>
                break
            case 0.5:
                valoracion = <div>
                    <i class="fas fa-star-half-alt fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                </div>
                break
            case 1:
                valoracion = <div>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                </div>
                break;
            case 1.5:
                valoracion = <div>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star-half-alt fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                </div>
                break
            case 2:
                valoracion = <div>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                </div>
                break;
            case 2.5:
                valoracion = <div>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star-half-alt fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                </div>
                break
            case 3:
                valoracion = <div>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                </div>
                break;
            case 3.5:
                valoracion = <div>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star-half-alt fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                </div>
                break
            case 4:
                valoracion = <div>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="far fa-star fa-3x"></i>
                </div>
                break;
            case 4.5:
                valoracion = <div>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star-half-alt fa-3x"></i>
                </div>
                break
            case 5:
                valoracion = <div>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                    <i class="fas fa-star fa-3x"></i>
                </div>
                break;
        }
        return valoracion
    }

    cambiarPass() {
        this.setState({cambiarPass: true})
    }

    editarUsuario() {

        var us = this.state.user;
        if (this.state.nombre !== "") {
            us.nombre = this.state.nombre
        }
        if (this.state.apellidos !== "") {
            us.apellidos = this.state.apellidos
        }
        if (this.state.direccion !== "") {
            us.direccion = this.state.direccion
        }
        if (this.state.poblacion !== "") {
            us.poblacion = this.state.poblacion
        }
        if (this.state.newProvincia != "" && this.state.newProvincia != this.state.provincia.id) {
            us.provincia = this.state.newProvincia
        } else {
            us.provincia = reactLocalStorage.get("provincia")
        }
        if (this.state.pais !== "") {
            us.pais = this.state.pais
        }
        if (this.state.telefono !== "") {
            us.telefono = this.state.telefono
        }
        var json = JSON.stringify(us)

        if (reactLocalStorage.get("isProfesional") === 'true') {
            
            new API().updateProfesional(reactLocalStorage.get("idUser"), json).then((response) => {
                if (response.ok) {
                    this.setState({ user: us })
                    reactLocalStorage.set('nombre', us.nombre)
                    reactLocalStorage.set('provincia', us.provincia)
                    alert('Datos actualizados')
                } else {
                    alert('Datos incorrectos')
                }
            })
        } else {
            new API().updateCliente(reactLocalStorage.get("idUser"), json).then((response) => {
                
                if (response.ok) {
                    this.setState({ user: us })
                    reactLocalStorage.set('nombre', us.nombre)
                    reactLocalStorage.set('provincia', us.provincia)
                    alert('Datos actualizados')
                } else {
                    alert('Datos incorrectos')
                }
            })
        }
    }


    render() {
        
        if(this.state.cambiarPass == true){
            return <Redirect to="/cambiarContraseña"></Redirect>
        }

        let prov = []
        for (let i = 0; i < this.state.provincias.length; i++) {
            let elem
            if (this.state.provincias[i].provincia != this.state.user.provincia) {
                elem = <option key={i + 1} value={this.state.provincias[i].id}>{this.state.provincias[i].provincia}</option>
            }

            prov.push(elem)
        }

        let valoracion = ""
        let valoracionTitle = ""
        if (reactLocalStorage.get("isProfesional") == 'true') {
            valoracionTitle = <h4>Tienes una valoracion de:</h4>
            valoracion = this.cargarValoracion()
        }


        return (
            <div>
                <Navbar></Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="card mt-3">
                                <div className="card-header">
                                    Tu Perfil
                            </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-horizontal">
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Nombre</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="nombre" type="text" name="text-input" placeholder={this.state.user.nombre} onChange={(event) => this.setState({ nombre: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Apellidos</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="apellidos" type="text" name="text-input" placeholder={this.state.user.apellidos} onChange={(event) => this.setState({ apellidos: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Dirección</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="direccion" type="text" name="text-input" placeholder={this.state.user.direccion} onChange={(event) => this.setState({ direccion: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Población</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="poblacion" type="text" name="text-input" placeholder={this.state.user.poblacion} onChange={(event) => this.setState({ poblacion: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Provincia</label>
                                                    <div className="col-md-9">
                                                        <select class="form-control" id="provincia" value={this.state.newProvincia}
                                                            onChange={(e) => this.setState({ newProvincia: e.target.value })}>
                                                            <option selected>{this.state.provincia.provincia}</option>
                                                            {prov}
                                                        </select></div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Pais</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="pais" type="text" name="text-input" placeholder={this.state.user.pais} onChange={(event) => this.setState({ pais: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Teléfono</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="telefono" type="text" name="text-input" placeholder={this.state.user.telefono} onChange={(event) => this.setState({ telefono: event.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-2"></div>
                                                <div className="col-md-7 mt-5">
                                                    {valoracionTitle}
                                                    {valoracion}
                                                </div>
                                                <div className="col-md-2"></div>

                                            </div>


                                        </div>
                                    </div>


                                </div>
                                <div className="card-footer">
                                    <div className="btn btn-primary" onClick={this.editarUsuario}>Guardar</div>
                                    <div className="btn btn-warning" onClick={this.cambiarPass}>Cambiar contraseña</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Perfil;

