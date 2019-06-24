import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

class Buscador extends Component {

  constructor(props) {
    super(props)
    this.state = { provincias: [], selectedProvincia: '' }  
    this.buscar = this.buscar.bind(this)
  }

  componentWillMount() {
    new API().getProvincias().then((json) => {
      this.setState({ provincias: json.provincias })
    })
  }

  buscar(){
    
  }

  render() {

    let prov = []
    for(let i=0;i<this.state.provincias.length;i++){
      let elem = <option key={i+1} value={this.state.provincias[i].id}>{this.state.provincias[i].provincia}</option>
      prov.push(elem)
    }
    
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
            <form class="form-inline mt-5">
              <select class="browser-default custom-select" id="provincia" value={this.state.selectedProvincia} 
              onChange={(e) => this.setState({selectedProvincia: e.target.value})}>
                        {prov}
                      </select>
              <input class="form-control mr-3 w-75" type="text" placeholder="Buscar..."
                aria-label="Search"/>
              <i class="fas fa-search" aria-hidden="true" onClick={this.buscar}></i>
            </form>
            </div>
            <div className="col-md-3"></div>
          
          </div>
          
        </div>
      </div>
    );
  }
}

export default Buscador;

