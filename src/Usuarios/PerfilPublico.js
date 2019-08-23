import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import './Chat.css'
import { Widget, addResponseMessage  } from 'react-chat-widget';
import io from 'socket.io-client';
import 'react-chat-widget/lib/styles.css';
import Navbar from './Navbar'

class PerfilPublico extends Component {

    constructor(props) {
        super(props)
        this.state = {user: {}, nombre: "", apellidos: "", direccion: "", poblacion: "", provincia: {}, pais: "", telefono: "",response: "",
        endpoint: "http://localhost:4001",
        valoracionMedia: ""
    }

        this.cargarValoracion = this.cargarValoracion.bind(this)
        this.socket = io("http://localhost:4001")

        this.socket.on("mensaje",(data)=>{
                addResponseMessage(data.msg)   
        })
    }

    handleNewUserMessage = (newMessage) => {
        // Now send the message throught the backend API
        //addResponseMessage(response);

        
        const {endpoint} = this.state;
        const socket = io.connect(endpoint);


        var r = ""
        if(reactLocalStorage.get("visitarProfesional") == 'true'){
            r = reactLocalStorage.get("idUser")+"-"+reactLocalStorage.get("visitar")
        }else{
            r = reactLocalStorage.get("visitar")+"-"+reactLocalStorage.get("idUser")
        }
        

        var data = {
            room: r,
            msg: newMessage
        }
        
        console.log(data)

        this.socket.emit('room', data.room);
        this.socket.emit("mensaje",JSON.stringify(data))
      }

    componentWillMount() {


        if(reactLocalStorage.get("visitarProfesional") == 'true'){
            new API().getProfesional(reactLocalStorage.get("visitar")).then((json) => {
                this.setState({ user: json.user })
                new API().getProvincia(json.user.provincia).then((prov) => {
                    this.setState({provincia: prov.provincia})

                    new API().getValoracionProfesional(json.user.id).then((valoracion) => {
                        console.log(valoracion.valoracion)
                        if (valoracion.valoracion != null)
                            this.setState({ valoracionMedia: valoracion.valoracion })
                        else
                            this.setState({ valoracionMedia: 0 })
                    })
                })
                
            })
        }else{
            new API().getCliente(reactLocalStorage.get("visitar")).then((json) => {
                this.setState({ user: json.user })

                new API().getProvincia(json.user.provincia).then((prov) => {
                    this.setState({provincia: prov.provincia})
                })
            })
        }
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

        let valoracion = ""
        let valoracionTitle = ""

        if(reactLocalStorage.get("isProfesional") == 'false'){
            valoracionTitle = <h4>Tiene una valoracion de:</h4>
            valoracion = this.cargarValoracion()
        }
        
        
        
        return (
            <div>
                <Navbar></Navbar>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <div className="card mt-3">
                                <div className="card-header">
                                    Perfil
                            </div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-horizontal">
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Nombre</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="nombre" type="text" name="text-input" placeholder={this.state.user.nombre}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Apellidos</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="apellidos" type="text" name="text-input" placeholder={this.state.user.apellidos} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Dirección</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="direccion" type="text" name="text-input" placeholder={this.state.user.direccion} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Población</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="poblacion" type="text" name="text-input" placeholder={this.state.user.poblacion} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Provincia</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="poblacion" type="text" name="text-input" placeholder={this.state.provincia.provincia} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Pais</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="pais" type="text" name="text-input" placeholder={this.state.user.pais} />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-md-3 col-form-label" for="text-input">Teléfono</label>
                                                    <div className="col-md-9">
                                                        <input className="form-control" id="telefono" type="text" name="text-input" placeholder={this.state.user.telefono} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-2"></div>
                                                <div className="col-md-7 mt-5">
                                                    {valoracionTitle}
                                                    {valoracion}
                                                </div>
                                                <div className="col-md-2"></div>

                                            </div>


                                        </div>
                                    </div>


                                </div>
                                <div className="card-footer"></div>
                            </div>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
                <Widget 
                    handleNewUserMessage={this.handleNewUserMessage}
                    title={"Chat con"}
                    subtitle={this.state.user.nombre+" "+this.state.user.apellidos}
                />
            </div>
        );
    }
}

export default PerfilPublico;

