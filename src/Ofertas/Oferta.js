import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import StarRatingComponent from 'react-star-rating-component';
import Navbar from '../Usuarios/Navbar'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Oferta extends Component {

    constructor(props) {
        super(props)
        this.state = { perfilPublico: false, oferta: {}, user: {}, fecha: "", hora: "", direccion: "", valoracion: "", rating: 0, muro: false }
        this.crearOferta = this.crearOferta.bind(this)
        this.aceptarOferta = this.aceptarOferta.bind(this)
        this.cancelarOferta = this.cancelarOferta.bind(this)
        this.borrarOferta = this.borrarOferta.bind(this)
        this.chat = this.chat.bind(this)
        this.cargarValoracion = this.cargarValoracion.bind(this)
        this.valorar = this.valorar.bind(this)
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

        var d = day + '/' + monthNames[monthIndex] + '/' + year;
        var h = hour + ":" + min

        this.setState({ fecha: d })
        this.setState({ hora: h })
    }



    componentWillMount() {
        console.log(reactLocalStorage.get("idOferta"))
        new API().getOferta(reactLocalStorage.get("idUser"), reactLocalStorage.get("idOferta")).then((json) => {
            console.log(json.oferta)

            this.setState({ oferta: json.oferta })


            var dir = json.oferta.direccion
            dir = dir.replace(" ", "+");

            let pob = this.state.oferta.poblacion
            pob = pob.replace(" ", "+");
            let src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAYS8EDyWG-GGFK80V2bwJ3atV68WninOI&q="` + pob + dir + `"`

            this.setState({ direccion: src })

            this.formatDate(new Date(json.oferta.fecha))

            if (json.oferta.estado) {

                if (reactLocalStorage.get("isProfesional") === 'false') {
                    new API().getProfesionalOferta(reactLocalStorage.get("idUser"), reactLocalStorage.get("idOferta")).then((json) => {

                        this.setState({ user: json.profesional })
                        new API().getValoracionProfesional(json.profesional.id).then((valoracion) => {
                            if (valoracion.valoracion != null)
                                this.setState({ valoracionMedia: valoracion.valoracion })
                            else
                                this.setState({ valoracionMedia: 0 })
                        })
                    })
                } else {
                    new API().getClienteTrabajo(reactLocalStorage.get("idUser"), reactLocalStorage.get("idOferta")).then((json) => {

                        this.setState({ user: json.cliente })
                    })
                }

            }
        })
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({ rating: nextValue });
    }
    crearOferta() {
        var oferta = {
            titulo: this.state.titulo,
            descripcion: this.state.descripcion
        }
        var json = JSON.stringify(oferta)

        new API().crearOferta(reactLocalStorage.get("idUser"), json).then((response) => {
            if (response.ok) {
                alert('Oferta creada')
                this.setState({ muro: true })
            } else {
                alert('Datos incorrectos')
            }
        })

    }

    borrarOferta() {
        new API().borrarOferta(reactLocalStorage.get("idUser"), this.state.oferta.id).then((response) => {
            if (response.ok) {
                this.setState({ muro: true })
            } else {
                alert('Ha habido un problema al borrar la oferta')
            }
        })

    }

    aceptarOferta() {

        var oferta = this.state.oferta.id
        new API().aceptarOferta(reactLocalStorage.get("idUser"), oferta).then((response) => {
            if (response.ok) {
                alert('Oferta de trabajo aceptada')
                this.setState({ muro: true })
            } else {
                alert('No se ha podido aceptar la oferta, revisa tu horario')
                console.log(response)
            }
        })
    }

    cancelarOferta() {

        var id
        if (reactLocalStorage.get("isProfesional") == 'true') {
            id = reactLocalStorage.get("idUser")
        } else {
            id = this.state.user.id
        }

        new API().cancelarOferta(id, this.state.oferta.id).then(function (response) {
            if (response.ok) {
                alert("Profesional cancelado")
            } else {
                alert("Problema al cancelar la oferta")
            }
        })
    }

    valorar() {

        var valoracion = {
            id: this.state.user.id,
            valoracion: this.state.rating
        }

        console.log(valoracion)

        new API().valorarProfesional(this.state.user.id, JSON.stringify(valoracion))
            .then(function (response) {
                if (response.ok) {
                    alert('Valoracion realizada con exito')
                } else {
                    alert('Problema al valorar')
                }
            })

    }

    chat(id) {
        if (reactLocalStorage.get("isProfesional") === 'false') {
            reactLocalStorage.set("visitarProfesional", true)
        } else {
            reactLocalStorage.set("visitarProfesional", false)
        }
        reactLocalStorage.set("visitar", id)
        this.setState({ perfilPublico: true })
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

    render() {

        if (this.state.muro == true && reactLocalStorage.get("isProfesional") == "true") {
            return <Redirect push to='/muroProfesional' />
        }

        if (this.state.muro == true && reactLocalStorage.get("isProfesional") == "false") {
            return <Redirect push to='/muroCliente' />
        }

        if (this.state.perfilPublico == true) {
            return <Redirect push to='/publico' />
        }


        let btnSeleccionar = ""
        if (this.state.oferta.estado == false && reactLocalStorage.get("isProfesional") === 'true') {
            btnSeleccionar = <button type="button" class="btn btn-primary" onClick={this.aceptarOferta}>Aceptar Oferta</button>
        }

        let estado
        if (this.state.oferta.estado) {
            btnSeleccionar = <button type="button" class="btn btn-outline-danger waves-effect" onClick={this.cancelarOferta}>Cancelar</button>
            estado = <span className="badge badge-success ">Seleccionada</span>
        } else {
            estado = <span className="badge badge-danger ">No seleccionada</span>
        }

        let titulo = ""
        if (reactLocalStorage.get("isProfesional") === 'false') {
            titulo = "Profesional"
        } else {
            titulo = "Cliente"
        }




        let profesional
        if (this.state.user.nombre !== undefined) {
            let valoracion = ""
            let valoracionTitle =""
            if (reactLocalStorage.get("isProfesional") == 'false') {
                valoracionTitle = <h4>Tiene una valoracion de:</h4>
                valoracion = this.cargarValoracion()
            }
            profesional = <div className="card mt-3">
                <div className="card-header"><b>{titulo}</b></div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p class="card-text"><b>{this.state.user.nombre} {this.state.user.apellidos}</b></p>
                            <p class="card-text">Tlf: {this.state.user.telefono}</p>
                        </div>
                        <div className="col-md-6">
                            {valoracionTitle}
                            {valoracion}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="btn btn-primary" onClick={() => this.chat(this.state.user.id)}>Contactar</div>
                        </div>

                    </div>
                </div>
            </div>

        }

        let menu
        let valorarBtn
        if (reactLocalStorage.get("isProfesional") == 'false' && reactLocalStorage.get("idUser") == this.state.oferta.user_id) {
            console.log("Esta oferta es mia")
            menu = <div><a data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-v float-right"></i></a>

                <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="/editarOferta">Editar</a>
                    <a className="dropdown-item" href="#" data-toggle="modal" data-target="#basicExampleModal">Borrar</a>
                </div>
            </div>

        }
        if (reactLocalStorage.get("isProfesional") == 'false' && reactLocalStorage.get("idUser") == this.state.oferta.user_id && this.state.oferta.estado == true) {
            console.log("Esta oferta es mia")

            valorarBtn = <div><StarRatingComponent
                name="rate1"
                starCount={5}
                value={this.state.rating}
                onStarClick={this.onStarClick.bind(this)} /><br />
                <button className="btn btn-primary" onClick={this.valorar}>Valorar servicio</button></div>

        }

        return (
            <div>
                <Navbar></Navbar>
                <div class="modal fade" id="basicExampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Borrar oferta</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                ¿Quieres borrar esta oferta?
                    </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">NO</button>
                                <button type="button" class="btn btn-primary" onClick={this.borrarOferta} data-dismiss="modal">Si</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <div className="card mt-3">
                                <div className="card-header">
                                    <div className="row">
                                    <div className="col-md-12">
                                            {menu}
                                            {estado}
                                            <b> Oferta</b>    
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">


                                    <h4 class="card-title font-weight-bold">{this.state.oferta.titulo}</h4>
                                    <p class="card-text">{this.state.oferta.descripcion}</p>
                                    <p class="card-text"><b>{this.state.oferta.precio} €</b></p>
                                    <p class="card-text">{this.state.oferta.direccion}</p>
                                    <p class="card-text">{this.state.oferta.poblacion}</p>
                                    <p class="card-text">{this.state.hora} {this.state.fecha}</p>
                                    <p class="card-text">Duración: {this.state.oferta.duracion}</p>
                                </div>

                                <div className="card-footer">
                                    <div className="row">
                                        {btnSeleccionar}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 mt-3">
                            <iframe
                                width="100%"
                                height="100%"
                                frameborder="0" style={{ border: 0 }}
                                src={this.state.direccion} allowfullscreen>
                            </iframe>
                        </div>
                        <div className="col-md-1"></div>
                    </div>

                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            {profesional}
                        </div>
                        <div className="col-md-5 mt-3">
                            {valorarBtn}
                        </div>
                        <div className="col-md-1"></div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Oferta;

