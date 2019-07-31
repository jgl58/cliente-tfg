import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../Usuarios/Navbar'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

class Oferta extends Component {

    constructor(props) {
        super(props)
        this.state = { perfilPublico: false, oferta: {}, user: {}, fecha:"", hora:"" }
        this.crearOferta = this.crearOferta.bind(this)
        this.aceptarOferta = this.aceptarOferta.bind(this)
        this.chat = this.chat.bind(this)
    }

    formatDate(date) {
        var monthNames = [
          "Enero", "Febrero", "Marzo",
          "Abril", "Mayo", "Junio", "Julio",
          "Agosto", "Septiembre", "Octubre",
          "Noviembre", "Diciembre"
        ];
      
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        var hour = date.getHours();
        var min = date.getMinutes();

        var d = day + '/' + monthNames[monthIndex] + '/' + year;
        var h = hour+":"+min

        this.setState({fecha: d})
        this.setState({hora: h})
      }
      


    componentWillMount() {
        console.log(reactLocalStorage.get("idOferta"))
        new API().getOferta(reactLocalStorage.get("idUser"),reactLocalStorage.get("idOferta")).then((json) => {

            console.log("Oferta: "+json.oferta)

            this.setState({ oferta: json.oferta })
            
            
            this.formatDate(new Date(json.oferta.fecha))

            if (json.oferta.estado) {

                if(reactLocalStorage.get("isProfesional") === 'false'){
                    new API().getProfesionalOferta(reactLocalStorage.get("idUser"),reactLocalStorage.get("idOferta")).then((json) => {

                        this.setState({ user: json.profesional })
                    })
                }else{
                    new API().getClienteTrabajo(reactLocalStorage.get("idUser"),reactLocalStorage.get("idOferta")).then((json) => {

                        this.setState({ user: json.cliente })
                    })
                }
                
            }
        })
    }
    crearOferta() {
        var oferta = {
            titulo: this.state.titulo,
            descripcion: this.state.descripcion
        }
        var json = JSON.stringify(oferta)

        new API().crearOferta(reactLocalStorage.get("idUser"),json).then((response) => {
            if (response.ok) {
                alert('Oferta creada')
                this.props.muro();
            } else {
                alert('Datos incorrectos')
            }
        })

    }

    aceptarOferta(){

        var oferta = this.state.oferta.id
        new API().aceptarOferta(reactLocalStorage.get("idUser"),oferta).then((response) => {
            if (response.ok) {
                alert('Oferta de trabajo aceptada')
                this.props.muro();
            } else {
                alert('No se ha podido aceptar la oferta, revisa tu horario')
                console.log(response)
            }
        })
    }

    chat(id){
        if(reactLocalStorage.get("isProfesional") === 'false'){
            reactLocalStorage.set("visitarProfesional", true)
        }else{
            reactLocalStorage.set("visitarProfesional", false)
        }
        reactLocalStorage.set("visitar",id)
        this.setState({perfilPublico: true})
    }

    render() {

        if(this.state.perfilPublico == true){
            return <Redirect push to='/publico'/>
          }

        let estado
        if (this.state.oferta.estado) {
            estado = <span className="badge badge-success ">Seleccionada</span>
        } else {
            estado = <span className="badge badge-danger ">No seleccionada</span>
        }

        let titulo = ""
        if(reactLocalStorage.get("isProfesional") === 'false'){
            titulo = "Profesional"
        }else{
            titulo = "Cliente"
        }

        let btnSeleccionar = ""
        if(this.state.oferta.estado == false && reactLocalStorage.get("isProfesional") === 'true'){
            btnSeleccionar = <button type="button" class="btn btn-primary" onClick={this.aceptarOferta}>Aceptar Oferta</button>
        }

        let profesional
        if (this.state.user.nombre !== undefined) {
            profesional = <div className="card mt-3">
                <div className="card-header">{titulo}</div>
                <div className="card-body">
                    <div className="form-horizontal">
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label" for="text-input">{this.state.user.nombre} {this.state.user.apellidos}</label>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label" for="text-input"> Tlf: {this.state.user.telefono}</label>
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


        return (
            <div>
                <Navbar></Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mt-3">
                                <div className="card-header">
                                    Oferta
                        </div>
                                <div className="card-body">
                                    <div className="form-horizontal">
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Titulo</label>
                                            <div className="col-md-9">
                                                <input className="form-control" id="titulo" type="text" name="text-input" placeholder={this.state.oferta.titulo} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Descripción</label>
                                            <div className="col-md-9">
                                                <textarea className="form-control" id="descripcion" type="text" name="textarea-input" placeholder={this.state.oferta.descripcion} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Estado</label>
                                            <div className="col-md-6">
                                                {estado}
                                            </div>
                                            <div className="col-md-3">
                                            {btnSeleccionar}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Hora</label>
                                            <div className="col-md-9">
                                                <label className="col-md-3 col-form-label">{this.state.hora}</label>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Fecha</label>
                                            <div className="col-md-9">
                                                <label className="col-md-3 col-form-label">{this.state.fecha}</label>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {profesional}
                        </div>

                    </div>


                </div>
            </div>
        );
    }
}

export default Oferta;

