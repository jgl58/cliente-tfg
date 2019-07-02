import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

import './horario.css';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from '@fullcalendar/bootstrap';
import esLocale from '@fullcalendar/core/locales/es';

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
            ]
        }
    }

    componentWillMount(){
        new API().getHorario(reactLocalStorage.get("idUser")).then((response) => {
            let arrayEventos = []
            for(let i=0;i<response.horario.length;i++){
                new API().getOferta(response.horario[i].trabajo).then((response) => {
                   this.setState({
                       calendarEvents: this.state.calendarEvents.concat({
                        title: response.oferta.titulo,
                        start: new Date(response.oferta.fecha)
                       })
                   })

                })
            }
            console.log(this.state.calendarEvents[0])
        })
    }



    render() {

        return (
            <div>
                <div className="col-md-12 mt-5 mb-5">
                    <div className="card">
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
                        dateClick={this.handleDateClick}
                        themeSystem='bootstrap'
                        locales={[esLocale]}
                        locale='es'
                    />
                    </div>
                </div>
            </div>
        );
    }

}

export default Horario;

