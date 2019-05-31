import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

class CrearOferta extends Component {

    constructor(props) {
        super(props)
        this.state = { titulo: "", descripcion: "", provincia:""}
        this.crearOferta = this.crearOferta.bind(this)
    }

    componentWillMount(){
        this.setState({provincia: reactLocalStorage.get("provincia")})
    }

    crearOferta() {
        var oferta = {
            titulo: this.state.titulo,
            descripcion: this.state.descripcion,
            provincia: this.state.provincia
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
                                        <input className="form-control" id="titulo" type="text" name="text-input" onChange={(event) => this.setState({ titulo: event.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Descripción</label>
                                    <div className="col-md-9">
                                        <textarea className="form-control" id="descripcion" type="text" name="textarea-input" onChange={(event) => this.setState({ descripcion: event.target.value })} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Provincia</label>
                                    <div className="col-md-9">
                                    <input className="form-control" id="provincia" type="text" name="text-input" placeholder={this.state.provincia} value={this.state.provincia} />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                            <div className="btn btn-primary" onClick={this.crearOferta}>Guardar</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CrearOferta;

