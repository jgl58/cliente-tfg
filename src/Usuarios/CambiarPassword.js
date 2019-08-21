import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
var sha512 = require('js-sha512');

class CambiarPassword extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user:{},
            nuevaPass: "",
            cambiarPass: false,
            antigua:"",
            nueva:"",
            repetida:""
        }
        this.editarPass = this.editarPass.bind(this)
    }

    componentWillMount() {
        if (reactLocalStorage.get("isProfesional") === 'true') {
            new API().getProfesional(reactLocalStorage.get("idUser")).then((json) => {
                this.setState({ user: json.user })
            })
        } else {
            new API().getCliente(reactLocalStorage.get("idUser")).then((json) => {
                this.setState({ user: json.user })
            })
        }
    }


    editarPass() {

        var us = this.state.user

        var hashAntigua = sha512(this.state.antigua)
        if(hashAntigua != us.password){
            alert("Contraseña antigua erronea")
        }else{
            if(this.state.nueva !== this.state.repetida){
                alert("Las contraseñas no son iguales")
            }else{
                var newPass = sha512(this.state.nueva)
                us.password = newPass
                var json = JSON.stringify(us)

                if (reactLocalStorage.get("isProfesional") === 'true') {
                    console.log("Actualizando profesional")
                    new API().updateProfesional(reactLocalStorage.get("idUser"), json).then((response) => {
                        if (response.ok) {
                            alert('Contraseña actualizada')
                            response.json().then((token)=>{
                                console.log(token.token)
                                reactLocalStorage.set("token",token.token)
                                this.setState({cambiarPass: true})
                            })
                            
                        } else {
                            alert('Datos incorrectos')
                        }
                    })
                } else {
                    console.log("Actualizando user")
                    new API().updateCliente(reactLocalStorage.get("idUser"), json).then((response) => {
                        if (response.ok) {
                            alert('Contraseña actualizada')
                            response.json().then((token)=>{
                                console.log(token.token)
                                reactLocalStorage.set("token",token.token)
                                this.setState({cambiarPass: true})
                            })
                        } else {
                            alert('Datos incorrectos')
                        }
                    })
                }
            }


        }


        
    }


    render() {
        
        if(this.state.cambiarPass == true){
            return <Redirect to="/perfil"></Redirect>
        }

        return (
            <div>
                <Navbar></Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-7">
                            <div className="card mt-3">
                                <div className="card-header">
                                    Cambiar contraseña
                            </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-horizontal">
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Contraseña antigua</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="antigua" type="password" name="text-input" onChange={(event) => this.setState({ antigua: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Contraseña nueva</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="nueva" type="password" name="text-input" onChange={(event) => this.setState({ nueva: event.target.value })} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Repite la contraseña</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="repetida" type="password" name="text-input"  onChange={(event) => this.setState({ repetida: event.target.value })} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                                <div className="card-footer">
                                    <div className="btn btn-primary" onClick={this.editarPass}>Guardar</div>
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

export default CambiarPassword;

