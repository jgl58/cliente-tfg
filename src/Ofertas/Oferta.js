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
        this.state = { perfilPublico: false, oferta: {}, user: {}, fecha:"", hora:"", direccion:"", valoracion: "", rating: 0, muro: false }
        this.crearOferta = this.crearOferta.bind(this)
        this.aceptarOferta = this.aceptarOferta.bind(this)
        this.cancelarOferta = this.cancelarOferta.bind(this)
        this.borrarOferta = this.borrarOferta.bind(this)
        this.chat = this.chat.bind(this)
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
        var h = hour+":"+min

        this.setState({fecha: d})
        this.setState({hora: h})
      }
      


    componentWillMount() {
        console.log(reactLocalStorage.get("idOferta"))
        new API().getOferta(reactLocalStorage.get("idUser"),reactLocalStorage.get("idOferta")).then((json) => {
            console.log(json.oferta)

            this.setState({ oferta: json.oferta })
            

            var dir = json.oferta.direccion
            dir = dir.replace(" ","+");

            let pob = this.state.oferta.poblacion
            pob = pob.replace(" ","+");
            let src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAYS8EDyWG-GGFK80V2bwJ3atV68WninOI&q="`+pob+dir+`"`

            this.setState({direccion: src})
            
            this.formatDate(new Date(json.oferta.fecha))

            if (json.oferta.estado) {

                if(reactLocalStorage.get("isProfesional") === 'false'){
                    new API().getProfesionalOferta(reactLocalStorage.get("idUser"),reactLocalStorage.get("idOferta")).then((json) => {

                        this.setState({ user: json.profesional })
                        new API().getValoracionProfesional(json.profesional.id).then((valoracion) => {

                            this.setState({ valoracionMedia: valoracion.valoracion })
                        })
                    })
                }else{
                    new API().getClienteTrabajo(reactLocalStorage.get("idUser"),reactLocalStorage.get("idOferta")).then((json) => {

                        this.setState({ user: json.cliente })
                    })
                }
                
            }
        })
    }
    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
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
                this.setState({muro: true})
            } else {
                alert('Datos incorrectos')
            }
        })

    }

    borrarOferta() {
        new API().borrarOferta(reactLocalStorage.get("idUser"),this.state.oferta.id).then((response) => {
            if (response.ok) {
                this.setState({muro: true})
            } else {
                alert('Ha habido un problema al borrar la oferta')
            }
        })

    }

    aceptarOferta(){

        var oferta = this.state.oferta.id
        new API().aceptarOferta(reactLocalStorage.get("idUser"),oferta).then((response) => {
            if (response.ok) {
                alert('Oferta de trabajo aceptada')
                this.setState({muro: true})
            } else {
                alert('No se ha podido aceptar la oferta, revisa tu horario')
                console.log(response)
            }
        })
    }

    cancelarOferta(){

        var id
        if(reactLocalStorage.get("isProfesional") == 'true'){
            id = reactLocalStorage.get("idUser")
        }else{
            id = this.state.user.id
        }

        new API().cancelarOferta(id,this.state.oferta.id).then(function(response){
            if(response.ok){
                alert("Profesional cancelado")
            }else{
                alert("Problema al cancelar la oferta")
            }
        })
    }

    valorar(){

        var valoracion = {
            id: this.state.user.id,
            valoracion: this.state.rating
        }

        console.log(valoracion)

        new API().valorarProfesional(this.state.user.id,JSON.stringify(valoracion))
        .then(function(response){
            if(response.ok){
                alert('Valoracion realizada con exito')
            }else{
                alert('Problema al valorar')
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

        if(this.state.muro == true && reactLocalStorage.get("isProfesional") == "true"){
            return <Redirect push to='/muroProfesional'/>
        }

        if(this.state.muro == true && reactLocalStorage.get("isProfesional") == "false"){
            return <Redirect push to='/muroCliente'/>
        }

        if(this.state.perfilPublico == true){
            return <Redirect push to='/publico'/>
        }
        let btnCancelar = ""
        let estado
        if (this.state.oferta.estado) {
            btnCancelar = <button type="button" class="btn btn-outline-danger waves-effect" onClick={this.cancelarOferta}>Cancelar</button>
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
                            <label className="col-md-6 col-form-label" htmlFor="text-input">{this.state.user.nombre} {this.state.user.apellidos}</label>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label" htmlFor="text-input"> Tlf: {this.state.user.telefono}</label>
                        </div>
                        <div className="form-group row">
                            <label className="col-md-6 col-form-label" htmlFor="text-input"> Valoracion: {this.state.valoracionMedia}</label>
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

        let editar
        let borrar  
        let valorarBtn
        if(reactLocalStorage.get("isProfesional") == 'false' && reactLocalStorage.get("idUser") == this.state.oferta.user_id && this.state.oferta.estado == true){
            console.log("Esta oferta es mia")
            editar = <Link to="/editarOferta"><i className="fas fa-edit"></i></Link>
            borrar=<i class="fas fa-trash-alt" data-toggle="modal" data-target="#basicExampleModal"></i>

            valorarBtn = <div><StarRatingComponent 
                            name="rate1" 
                            starCount={5} 
                            value={this.state.rating} 
                            onStarClick={this.onStarClick.bind(this)}/><br/>
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
                        <div className="col-md-6">
                            <div className="card mt-3">
                                <div className="card-header">
                                <div class="row">
                                    <div class="col-md-10">
                                        Oferta
                                    </div>
                                    <div class="col-md-2 float-right">
                                        {editar}
                                        {borrar}
                                    </div>
                                </div>
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
                                            <div className="col-md-3">
                                                {estado}
                                            </div>
                                            <div className="col-md-3">
                                            {btnSeleccionar}
                                            </div>
                                            <div className="col-md-3">
                                            {btnCancelar}
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
                        <div className="col-md-4 mt-3">
                            <iframe
                            width="100%"
                            height="100%"
                            frameborder="0" style={{border: 0}}
                            src={this.state.direccion} allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            {profesional}
                        </div>
                        <div className="col-md-6 mt-3">
                            {valorarBtn}
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default Oferta;

