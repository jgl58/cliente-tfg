import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker'
import { reactLocalStorage } from 'reactjs-localstorage';
import es from 'date-fns/locale/es';


import "react-datepicker/dist/react-datepicker.css";

class CrearOferta extends Component {

    constructor(props) {
        super(props)
        this.state = { titulo: "", descripcion: "", provincia:"",startDate: new Date(), duracion: "1"}
        this.crearOferta = this.crearOferta.bind(this)
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        registerLocale('es', es)
        new API().getProvincia(reactLocalStorage.get("provincia")).then((json) => {
            this.setState({ provincia: json.provincia })
        })
    }
    handleChange(date) {
        this.setState({
          startDate: date
        });
      }

    crearOferta() {
        var oferta = {
            titulo: this.state.titulo,
            descripcion: this.state.descripcion,
            provincia: this.state.provincia.id,
            fecha: this.state.startDate,
            duracion: this.state.duracion
        }
        console.log(oferta.fecha)
        console.log(String(oferta.fecha))
        var json = JSON.stringify(oferta)
        console.log(json)

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
                                    <input className="form-control" id="provincia" type="text" name="text-input" value={this.state.provincia.provincia} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label className="col-md-3 col-form-label" for="text-input">Fecha inicio</label>
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
                                    <label className="col-md-3 col-form-label" for="text-input">Duración (horas)</label>
                                    <div className="col-md-9">
                                    <input className="form-control" id="duracion" type="text" name="text-input" onChange={(event) => this.setState({ duracion: event.target.value })} />
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

