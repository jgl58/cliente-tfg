import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../Usuarios/Navbar'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import es from 'date-fns/locale/es';
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
            direccion:"",
            poblacion:"",
            fecha: "",
            startDate: new Date()
        }
        this.editarOferta = this.editarOferta.bind(this)
    }

    componentWillMount() {
        registerLocale('es', es)
        new API().getOferta(reactLocalStorage.get("idUser"),reactLocalStorage.get("idOferta")).then(function(json){
            console.log(json.oferta)
            this.setState({ oferta: json.oferta })

            this.setState({startDate: new Date(json.oferta.fecha)})
            
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
        oferta.fecha = this.state.startDate
        if(this.state.direccion !== ""){
            oferta.direccion = this.state.direccion
        }
        if(this.state.poblacion !== ""){
            oferta.poblacion = this.state.poblacion
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
    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    render() {

        return (
            <div>
                <Navbar></Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3"></div>
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
                                            <label className="col-md-3 col-form-label">Fecha</label>
                                            <div className="col-md-9">
                                            <DatePicker
                                                locale="es"
                                                selected={this.state.startDate}
                                                onChange={this.handleChange}
                                                showTimeSelect
                                                timeFormat="HH:mm"
                                                timeIntervals={15}
                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                timeCaption="time"
                                            />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Dirección</label>
                                            <div className="col-md-9">
                                                <input className="form-control" id="descripcion" type="text" name="textarea-input" placeholder={this.state.oferta.direccion} onChange={(event) => this.setState({ direccion: event.target.value })} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Población</label>
                                            <div className="col-md-9">
                                                <input className="form-control" id="descripcion" type="text" name="textarea-input" placeholder={this.state.oferta.poblacion} onChange={(event) => this.setState({ poblacion: event.target.value })} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="card-footer">
                                    <div className="btn btn-primary" onClick={this.editarOferta}>Guardar</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-1"></div>
                    </div>


                </div>
            </div>
        );
    }
}

export default EditarOferta;

