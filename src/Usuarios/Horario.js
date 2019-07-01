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
              // initial event data
              { title: "Event Now", start: new Date() },
              { title: "Evento prueba", start: new Date("Wed Jul 3 2019 20:36:00 GMT+0200"), end: new Date("Wed Jul 3 2019 23:36:00 GMT+0200")}
            ]
        }
    }



    render() {
        console.log(new Date())

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

