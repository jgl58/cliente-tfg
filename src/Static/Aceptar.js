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
    id: "",
    of:""
  }
    this.login = this.login.bind(this)
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
    })
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


  login(event) {
    
    var pet = {
      profesional:this.state.profesional, 
      email: this.state.email, 
      pass: this.state.pass 
    };
    
    var json = JSON.stringify(pet)
    
    new API().login(json)
      .then((response) => {
        
        if (response.ok) {
          return response.json();
        } else {
          this.handleShow()
        }
      }).then((json) => {
        reactLocalStorage.set('token',json.token)
        reactLocalStorage.set('idUser',json.idUser)
        reactLocalStorage.set('isProfesional',this.state.profesional)
        reactLocalStorage.set('nombre',json.nombre)
        reactLocalStorage.set('provincia',json.provincia)
        if(!this.state.profesional)
          this.setState({logeado: true})
         // this.goToMuro()
        else
          this.setState({logeado: true})
//          this.props.muroP()
      }).catch(function(err){
        
      })
  }


  render() {

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mt-5">
              <div className="card">
                <div className="card-header">
                  Hemos encontrado esta oferta para ti
                </div>
                <div className="card-body">

                  <div className="row">
                  <div className="col-md-6">
                    <div class="card booking-card">

                      <div class="view overlay">
                          <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/8-col/img (5).jpg" alt="Card image cap"/>
                          <a href="#!">
                          <div class="mask rgba-white-slight"></div>
                          </a>
                      </div>

                      <div class="card-body">

                          <h4 class="card-title font-weight-bold"><a>{this.state.oferta.titulo}</a></h4>
                          <ul class="list-unstyled list-inline rating mb-0">
                          <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"> </i></li>
                          <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
                          <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
                          <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
                          <li class="list-inline-item"><i class="fas fa-star-half-alt amber-text"></i></li>
                          <li class="list-inline-item"><p class="text-muted">4.5 (413)</p></li>
                          </ul>
                          <p class="mb-2">{this.state.oferta.provincia}</p>
                          <p class="card-text">{this.state.oferta.descripcion}</p>
                          <hr class="my-4"/>
                          <p class="lead"><strong>Hora</strong></p>
                          <ul class="list-unstyled list-inline d-flex justify-content-between mb-0">
                          <li class="list-inline-item mr-0">
                              <div class="chip mr-0">{this.state.oferta.hora}</div>
                          </li>
                          </ul>
                      </div>

                      </div>
                    </div>
                  <div className="col-md-6">
                    <button className="btn btn-primary" onClick={this.aceptarOferta}>
                      Aceptar oferta
                    </button>

                  </div>
                  </div>
                </div>
                <div className="card-footer">
                    <div className="col-md-12">
                    </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Login;

