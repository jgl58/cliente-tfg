import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import BuscadorItem from '../Buscador/BuscadorItem'
import { reactLocalStorage } from 'reactjs-localstorage';
import Navbar from '../Usuarios/Navbar'

class ListaOfertas extends Component {

  constructor(props) {
    super(props)
    this.state = {ofertas: [], provincias: [], selectedProvincia: '9',selectedTitle:'' }  
    
  }

  componentWillMount() {


    if(reactLocalStorage.get("isProfesional") == 'true'){
        new API().getTrabajos(reactLocalStorage.get("idUser"))
        .then((json) => {
          this.setState({ ofertas: json.ofertas })
        })
    }else{
        new API().getOfertasCreadas(reactLocalStorage.get("idUser"))
        .then((json) => {
          this.setState({ ofertas: json.ofertas })
        })
    }
  }


  render() {

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
                <h1>Estas son tus ofertas</h1>
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

export default ListaOfertas;

