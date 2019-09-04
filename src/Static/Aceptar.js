import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import queryString from 'query-string'
import {reactLocalStorage} from 'reactjs-localstorage'

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', 
    pass: '', 
    show: false , 
    profesional: true, 
    logeado: false, 
    oferta:{},
    hora:"",
    fecha:"",
    id: "",
    of:""
  }
    this.aceptarOferta = this.aceptarOferta.bind(this)
    
   
  }
  componentWillMount(){
    if(reactLocalStorage.get('token') != undefined){
      console.log("Token: "+ reactLocalStorage.get("token"))
      console.log("Hay un token guardado")
    }
    const values = queryString.parse(window.location.search)
    
    new API().getOfertaSola(values.of).then((json) => {
      this.setState({id: values.id})
      this.setState({of: values.of})
      this.setState({oferta: json.oferta})
      console.log(this.state.oferta)
      this.formatDate(new Date(json.oferta.fecha))
    })
  }

  formatDate(date) {
    var monthNames = [
        "enero", "febrero", "marzo",
        "abril", "mayo", "junio", "julio",
        "agosto", "septiembre", "octubre",
        "noviembre", "diciembre"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    var hour = date.getHours();
    var min = date.getMinutes();
    if(min == 0){min = "00"}
    var d = day + '/' + monthNames[monthIndex] + '/' + year;
    var h = hour + ":" + min

    this.setState({ fecha: d })
    this.setState({ hora: h })
}

  aceptarOferta(){

      var oferta = this.state.oferta.id
      new API().aceptarOferta(this.state.id,this.state.of).then((response) => {
          if (response.ok) {
              alert('Oferta de trabajo aceptada')
          } else {
              alert('No se ha podido aceptar la oferta, revisa tu horario')
              console.log(response)
          }
      })
  }


  render() {

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 mt-5">
            <div class="card">
              <div class="card-body float-left">
                  <h4 class="card-title font-weight-bold">{this.state.oferta.titulo}</h4>
                  <p class="card-text">{this.state.oferta.descripcion}</p>
                  <p class="card-text"><b>{this.state.oferta.precio} €</b></p>
                  <p class="card-text"><b>{this.state.oferta.duracion} horas</b></p>
                  <hr class="my-4"/>
                  <p class="card-text">{this.state.oferta.direccion} {this.state.oferta.poblacion}</p>
                  <hr class="my-4"/>
                  <p class="card-text"><div class="chip mr-0">{this.state.fecha}-{this.state.hora}</div></p>
                  
                  <a class="btn btn-default" onClick={this.aceptarOferta}>Aceptar oferta</a>

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



export default Login;

