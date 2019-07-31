import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { Button } from "react-bootstrap"
import { Modal } from "react-bootstrap"
import { reactLocalStorage } from 'reactjs-localstorage';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Registro extends Component {

  constructor(props) {
    super(props)
    this.state = { email: '', pass: '', confirmpassword: '', nombre: '', apellidos: '', provincias:[],selectedProvincia: '',poblacion:'', direccion: '', pais: '', isProfesional: true }
    this.registrar = this.registrar.bind(this)
    this.goToLogin = this.goToLogin.bind(this);
    this.registroCliente = this.registroCliente.bind(this);
    this.registroProfesional = this.registroProfesional.bind(this);
  }

  componentWillMount(){

    new API().getProvincias().then((json) => {
      this.setState({ provincias: json.provincias })
    })
  }

  goToLogin() {
    this.props.log()
  }
  registroProfesional() {
    this.setState({ isProfesional: true })
  }

  registroCliente() {
    this.setState({ isProfesional: false })
  }

  registrar(event) {
    if (this.state.pass === '' && this.state.confirmpassword === '' && this.state.email === '' && this.state.nombre === '' 
    && this.state.poblacion === ''&& this.state.selectedProvincia === ''&& this.state.direccion === ''&& this.state.pais === '') {
      alert("Introduce todos los datos")
    }
    else if (this.state.pass !== this.state.confirmpassword) {
      alert("Las contraseñas son distintas")
    } else {

      let elem = this.state.provincias.find(element => element.id == this.state.selectedProvincia)
      var pet = { isProfesional: this.state.isProfesional, email: this.state.email, pass: this.state.pass, nombre: this.state.nombre, apellidos: this.state.apellidos,
      provincia: elem.id, poblacion: this.state.poblacion, pais: this.state.pais, direccion: this.state.direccion };

      var json = JSON.stringify(pet)

      new API().registro(json)
        .then((response) => {
          if (response.ok) {
            this.props.log()
          } else {
            alert("Email ya en uso")
          }
        })
    }

  }

  render() {
    let titulo
    let enlace
    let prov = []
    if (this.state.isProfesional) {
      titulo = <strong>Registro profesionales</strong>
      enlace = <a href="#" onClick={this.registroCliente}>Registrarse como cliente</a>
    } else {
      titulo = <strong>Registro clientes</strong>
      enlace = <a href="#" onClick={this.registroProfesional}>Registrarse como profesional</a>
    }

    for(let i=0;i<this.state.provincias.length;i++){
      let elem = <option key={i+1} value={this.state.provincias[i].id}>{this.state.provincias[i].provincia}</option>
      prov.push(elem)
    }

    return <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mt-5">

            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Error al registrarse</Modal.Title>
              </Modal.Header>
              <Modal.Body>El usuario o la contraseña ya existen</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.handleClose}>
                  Cerrar
              </Button>
              </Modal.Footer>
            </Modal>

            <div className="card">
              <div className="card-header">
                {titulo}
              </div>
              <div className="card-body">
                <div className="form-horizontal">
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                      <label className="">Email</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input id="hf-email" name="hf-email" placeholder="" type="email" className="form-control" onChange={(event) => this.setState({ email: event.target.value })} />
                      
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                      <label className="">Contraseña</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" type="password" className="form-control" onChange={(event) => this.setState({ pass: event.target.value })} />
                      
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                      <label className="">Repite la contraseña</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" type="password" className="form-control" onChange={(event) => this.setState({ confirmpassword: event.target.value })} />
                      
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                      <label className="">Nombre</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" type="text" className="form-control" onChange={(event) => this.setState({ nombre: event.target.value })} />
                     
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                      <label className="">Apellidos</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" type="text" className="form-control" onChange={(event) => this.setState({ apellidos: event.target.value })} />
                      
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                      <label className="">Dirección</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" type="text" className="form-control" onChange={(event) => this.setState({ direccion: event.target.value })} />  
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                      <label className="">Población</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" type="text" className="form-control" onChange={(event) => this.setState({ poblacion: event.target.value })} />  
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                      <label className="">Provincia</label>
                    </div>
                    <div className="col-12 col-md-9">
                    <div data-role="fieldcontain">
                      <select className="form-control" id="provincia" value={this.state.selectedProvincia} 
              onChange={(e) => this.setState({selectedProvincia: e.target.value})}>
                        {prov}
                      </select>
                      </div>
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                      <label className="">Pais</label>
                    </div>
                    <div className="col-12 col-md-9">
                      <input id="hf-password" name="hf-password" placeholder="" type="text" className="form-control" onChange={(event) => this.setState({ pais: event.target.value })} />  
                    </div>
                  </div>
                  <div className="position-relative row form-group">
                    <div className="col-md-3">
                    </div>
                    <div className="col-12 col-md-9">
                      <button className="btn btn-primary" onClick={(event) => this.registrar(event)}>
                        <i className="fa fa-dot-circle-o">
                        </i> Registrarse</button>
                    </div>
                  </div>

                </div>
              </div>
              <div className="card-footer">
                <div className="col-md-12">
                <Link to='/'><button type="reset" className="btn btn-info">Ir a inicio de sesion</button></Link>
                </div>
                <div className="col-md-12 mt-2">
                  {enlace}
                </div>
                
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  }
}

export default Registro;

