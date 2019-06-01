import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

class Perfil extends Component {

    constructor(props) {
        super(props)
        this.state = { user: {}, nombre: "", apellidos: "", direccion: "", poblacion: "", provincia: "", pais: "", telefono: "" }
        this.editarUsuario = this.editarUsuario.bind(this)
    }

    componentWillMount() {
        if(reactLocalStorage.get("isProfesional") === 'true'){
            console.log("Soy profesional")
            new API().getProfesional().then((json) => {
                this.setState({ user: json.user })
                console.log(this.state.user)
            })
        }else{
            console.log("Soy cliente")
            new API().getCliente().then((json) => {
                this.setState({ user: json.user })
                console.log(this.state.user)
            })
        }
        
        
    }

    editarUsuario() {

        var us = this.state.user;

        if(this.state.nombre !== ""){
            us.nombre = this.state.nombre
        }
        if(this.state.apellidos !== ""){
            us.apellidos = this.state.apellidos
        }
        if(this.state.direccion !== ""){
            us.direccion = this.state.direccion
        }
        if(this.state.poblacion !== ""){
            us.poblacion = this.state.poblacion
        }
        if(this.state.provincia !== ""){
            us.provincia = this.state.provincia
        }
        if(this.state.pais !== ""){
            us.pais = this.state.pais
        }
        if(this.state.telefono !== ""){
            us.telefono = this.state.telefono
        }
        var json = JSON.stringify(us)
        console.log("Enviando: "+json)

        if(reactLocalStorage.get("isProfesional") === 'true'){
            new API().updateProfesional(json).then((response) => {
                if (response.ok) {
                    this.setState({user: us})
                    reactLocalStorage.set('nombre', us.nombre)
                    reactLocalStorage.set('provincia',us.provincia)
                    alert('Datos actualizados')
                } else {
                    alert('Datos incorrectos')
                }
            })
        }else{
            new API().updateCliente(json).then((response) => {
                if (response.ok) {
                    this.setState({user: us})
                    reactLocalStorage.set('nombre', us.nombre)
                    reactLocalStorage.set('provincia',us.provincia)
                    alert('Datos actualizados')
                } else {
                    alert('Datos incorrectos')
                }
            })
        }
        

    }

    render() {

        return (
            <div>
                <div className="container-fluid">
                    <div className="card mt-3">
                        <div className="card-header">
                            Tu Perfil
                        </div>
                        <div className="card-body">
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
                                        <input className="form-control" id="provincia" type="text" name="text-input" placeholder={this.state.user.provincia} onChange={(event) => this.setState({ provincia: event.target.value })} />
                                    </div>
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
                        <div className="card-footer">
                            <div className="btn btn-primary" onClick={this.editarUsuario}>Guardar</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Perfil;
