import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import './Chat.css'
import { Widget, addResponseMessage  } from 'react-chat-widget';
import io from 'socket.io-client';
import 'react-chat-widget/lib/styles.css';

class PerfilPublico extends Component {

    constructor(props) {
        super(props)
        this.state = {user: {}, nombre: "", apellidos: "", direccion: "", poblacion: "", provincia: {}, pais: "", telefono: "",response: "",
        endpoint: "http://localhost:4001" }

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

   /* componentDidMount(){

        

        this.socket.on('connect', function(){
            var r = ""
            if(reactLocalStorage.get("visitarProfesional") == 'true'){
                r = reactLocalStorage.get("idUser")+"-"+reactLocalStorage.get("visitar")
            }else{
                r = reactLocalStorage.get("visitar")+"-"+reactLocalStorage.get("idUser")
            }
            this.socket.emit('room', r);
            
        })
    
    
    }*/

    

    componentWillMount() {

        if(reactLocalStorage.get("visitarProfesional") == 'true'){
            new API().getProfesional(reactLocalStorage.get("visitar")).then((json) => {
                this.setState({ user: json.user })
            
            })
        }else{
            new API().getCliente(reactLocalStorage.get("visitar")).then((json) => {
                this.setState({ user: json.user })
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
                                        <input className="form-control" id="nombre" type="text" name="text-input" placeholder={this.state.user.nombre} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Apellidos</label>
                                    <div className="col-md-9">
                                        <input className="form-control" id="apellidos" type="text" name="text-input" placeholder={this.state.user.apellidos}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Dirección</label>
                                    <div className="col-md-9">
                                        <input className="form-control" id="direccion" type="text" name="text-input" placeholder={this.state.user.direccion}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Población</label>
                                    <div className="col-md-9">
                                        <input className="form-control" id="poblacion" type="text" name="text-input" placeholder={this.state.user.poblacion}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Provincia</label>
                                    <div className="col-md-9">
                                    <input className="form-control" id="provincia" type="text" name="text-input" placeholder={this.state.user.provincia}/>
                                   </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Pais</label>
                                    <div className="col-md-9">
                                        <input className="form-control" id="pais" type="text" name="text-input" placeholder={this.state.user.pais}/>
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Teléfono</label>
                                    <div className="col-md-9">
                                        <input className="form-control" id="telefono" type="text" name="text-input" placeholder={this.state.user.telefono}/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                </div>
                <Widget 
                    handleNewUserMessage={this.handleNewUserMessage}
                    title={"Hola amigo"}
                />
            </div>
        );
    }
}

export default PerfilPublico;

