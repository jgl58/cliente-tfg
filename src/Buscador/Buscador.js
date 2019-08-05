import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import BuscadorItem from './BuscadorItem'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../Usuarios/Navbar'

class Buscador extends Component {

  constructor(props) {
    super(props)
    this.state = {ofertas: [], provincias: [], selectedProvincia: '9' }  
    this.buscar = this.buscar.bind(this)
  }

  componentWillMount() {
    new API().getProvincias().then((json) => {
      this.setState({ provincias: json.provincias })
    })
  }


  buscar(){
    let elem = this.state.provincias.find(element => element.id == this.state.selectedProvincia)
    new API().buscadorPorProvincias(elem.id).then((json) => {
      console.log(json.ofertas)
      this.setState({ ofertas: json.ofertas })
    })
  }


  render() {

    let prov = []
    for(let i=0;i<this.state.provincias.length;i++){
      let elem = <option key={i+1} value={this.state.provincias[i].id}>{this.state.provincias[i].provincia}</option>
      prov.push(elem)
    }
    

    let ofertas = []
    for(let i=0;i<this.state.ofertas.length;i++){
      
      let elem = <div className="col-md-4 mb-2">
          <BuscadorItem oferta={this.state.ofertas[i]} goOferta={this.props.oferta}></BuscadorItem>
        </div> 
        ofertas.push(elem)
      
      
      
    }
    return (
      <div>
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-md-2"></div>
            <div className="col-md-8">
            <form className="form-inline mt-5 mb-3">
              <select className="browser-default custom-select" id="provincia" value={this.state.selectedProvincia} 
              onChange={(e) => this.setState({selectedProvincia: e.target.value})}>
                        {prov}
                      </select>
              <input className="form-control mr-3 w-75" type="text" placeholder="Buscar..."
                aria-label="Search"/>
              <i className="fas fa-search" aria-hidden="true" onClick={this.buscar}></i>
            </form>
            </div>
            <div className="col-md-2"></div>
          
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <div className="row">
                {ofertas}
              </div>
              
            </div>
            <div className="col-md-2"></div>
           
          </div>
        </div>
      </div>
    );
  }
}

export default Buscador;

