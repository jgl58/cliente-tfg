import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from './Navbar'
import './horario.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import esLocale from '@fullcalendar/core/locales/es';

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
class Horario extends Component {

    calendarComponentRef = React.createRef();
    constructor(props) {
        super(props)
        this.state = {
            calendarWeekends: true,
            calendarEvents: [
            ],
            oferta: false
        }
        this.handleDateClick = this.handleDateClick.bind(this)
    }

    componentWillMount(){
        new API().getHorario(reactLocalStorage.get("idUser")).then((response) => {
            let arrayEventos = []
            for(let i=0;i<response.horario.length;i++){
                new API().getOferta(reactLocalStorage.get("idUser"),response.horario[i].trabajo).then((response) => {
                    var final = new Date(response.oferta.fecha)
                    final.setHours(final.getHours() + response.oferta.duracion)
                   this.setState({
                       calendarEvents: this.state.calendarEvents.concat({
                        id: response.oferta.id,
                        title: response.oferta.titulo,
                        start: new Date(response.oferta.fecha),
                        end: final
                       })
                   })

                })
            }
        })
    }

    handleDateClick(info){
        console.log(info.event)
        reactLocalStorage.set('idOferta',info.event.id)
        this.setState({oferta: true})
    }



    render() {

        if(this.state.oferta == true){
            return <Redirect push to='/oferta'/>
        }

        return (
            <div>
                <Navbar></Navbar>
                <div className="col-md-12 mt-5 mb-5">
                    <div className="card mt-1 mb-1">
                    <FullCalendar
                        defaultView="timeGridWeek"
                        header={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                        }}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
                        ref={this.calendarComponentRef}
                        weekends={this.state.calendarWeekends}
                        events={this.state.calendarEvents}
                        eventClick={this.handleDateClick}
                        themeSystem='bootstrap'
                        locales={[esLocale]}
                        locale='es'
                        height={"auto"}
                        handleWindowResize='true'
                    />
                    </div>
                </div>
            </div>
        );
    }

}

export default Horario;

