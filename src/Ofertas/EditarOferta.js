import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../Usuarios/Navbar'
import { func } from 'prop-types';

class EditarOferta extends Component {

    constructor(props) {
        super(props)
        this.state = {
            provincias:[], 
            oferta: {}, 
            titulo: "", 
            descripcion: "", 
            hora: "", 
            fecha: ""
        }
        this.editarOferta = this.editarOferta.bind(this)
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
        console.log(this.state.fecha)
      }

    componentWillMount() {
        new API().getOferta(reactLocalStorage.get("idUser"),reactLocalStorage.get("idOferta")).then(function(json){
            console.log(json.oferta)
            this.setState({ oferta: json.oferta })
            
            this.formatDate(new Date(json.oferta.fecha))
        }.bind(this))
        
        
    }

    

    editarOferta() {

        var oferta = this.state.oferta;
        if(this.state.titulo !== ""){
            oferta.titulo = this.state.titulo
        }
        if(this.state.descripcion !== ""){
            oferta.descripcion = this.state.descripcion
        }
        if(this.state.fecha !== "" || this.state.hora !== ""){
            oferta.fecha = this.state.fecha
        }
        console.log(oferta)
        var json = JSON.stringify(oferta)

        new API().updateOferta(reactLocalStorage.get("idUser"),oferta.id,json).then((response) => {
            if (response.ok) {
                this.setState({oferta: oferta})
                alert('Datos actualizados')
            } else {
                alert('Datos incorrectos')
            }
        })

    }

    render() {

        return (
            <div>
                <Navbar></Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mt-3">
                                <div className="card-header">
                                <div class="row">
                                    <div class="col-md-10">
                                        Oferta
                                    </div>
                                </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-horizontal">
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Titulo</label>
                                            <div className="col-md-9">
                                                <input className="form-control" id="titulo" type="text" name="text-input" placeholder={this.state.oferta.titulo} onChange={(event) => this.setState({ titulo: event.target.value })}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Descripción</label>
                                            <div className="col-md-9">
                                                <textarea className="form-control" id="descripcion" type="text" name="textarea-input" placeholder={this.state.oferta.descripcion} onChange={(event) => this.setState({ descripcion: event.target.value })} />
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
                            <div className="btn btn-primary" onClick={this.editarOferta}>Guardar</div>
                        </div>

                    </div>


                </div>
            </div>
        );
    }
}

export default EditarOferta;

