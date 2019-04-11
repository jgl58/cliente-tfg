import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

class Oferta extends Component {

    constructor(props) {
        super(props)
        this.state = { oferta: {} }
        this.crearOferta = this.crearOferta.bind(this)
    }


    componentWillMount() {
        new API().getOferta(reactLocalStorage.get("idOferta")).then((json) => {
            console.log(json.oferta)
            this.setState({ oferta: json.oferta })
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

        return (
            <div>
                <div className="container-fluid">
                    <div className="card mt-3">
                        <div className="card-header">
                            Crear oferta
                        </div>
                        <div className="card-body">
                            <div className="form-horizontal">
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Titulo</label>
                                    <div className="col-md-9">
                                        <input className="form-control" id="titulo" type="text" name="text-input" placeholder={this.state.oferta.titulo}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Descripción</label>
                                    <div className="col-md-9">
                                        <textarea className="form-control" id="descripcion" type="text" name="textarea-input" placeholder={this.state.oferta.descripcion}/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Oferta;

