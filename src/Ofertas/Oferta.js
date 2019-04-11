import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

class Oferta extends Component {

    constructor(props) {
        super(props)
        this.state = { oferta: {}, user: {} }
        this.crearOferta = this.crearOferta.bind(this)
    }


    componentWillMount() {
        new API().getOferta(reactLocalStorage.get("idOferta")).then((json) => {

            this.setState({ oferta: json.oferta })

            if (json.oferta.estado) {
                new API().getProfesionalOferta(reactLocalStorage.get("idOferta")).then((json) => {

                    this.setState({ user: json.profesional })
                })
            }
        })
    }
    crearOferta() {
        var oferta = {
            titulo: this.state.titulo,
            descripcion: this.state.descripcion
        }
        var json = JSON.stringify(oferta)

        new API().crearOferta(json).then((response) => {
            if (response.ok) {
                alert('Oferta creada')
                this.props.muro();
            } else {
                alert('Datos incorrectos')
            }
        })

    }


    render() {

        let estado
        if (this.state.oferta.estado) {
            estado = <span className="badge badge-success ">Seleccionada</span>
        } else {
            estado = <span className="badge badge-danger ">No seleccionada</span>
        }

        let profesional
        if (this.state.user.nombre != undefined) {
            profesional = <div className="card mt-3">
                <div className="card-header">Profesional</div>
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
                            <div className="btn btn-primary">Contactar</div>
                        </div>

                    </div>
                </div>
            </div>

        }


        return (
            <div>
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
                                            <label className="col-md-3 col-form-label" for="text-input">Titulo</label>
                                            <div className="col-md-9">
                                                <input className="form-control" id="titulo" type="text" name="text-input" placeholder={this.state.oferta.titulo} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label" for="text-input">Descripción</label>
                                            <div className="col-md-9">
                                                <textarea className="form-control" id="descripcion" type="text" name="textarea-input" placeholder={this.state.oferta.descripcion} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label" for="text-input">Estado</label>
                                            <div className="col-md-9">
                                                {estado}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            {profesional}
                        </div>
                        <div className="col-md-3"></div>

                    </div>


                </div>
            </div>
        );
    }
}

export default Oferta;

