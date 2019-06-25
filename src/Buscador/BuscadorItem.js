import React, { Component } from 'react';
import '../App.css';
import API from '../API/API'
import { reactLocalStorage } from 'reactjs-localstorage';

class BuscadorItem extends Component {

  constructor(props) {
    super(props)
    this.state = {oferta: {} }  
  }

  componentWillMount(){
      this.setState({oferta: this.props.oferta})
  }

  render() {
    return (
    <div class="card booking-card">

        <div class="view overlay">
            <img class="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/Food/8-col/img (5).jpg" alt="Card image cap"/>
            <a href="#!">
            <div class="mask rgba-white-slight"></div>
            </a>
        </div>

        <div class="card-body">

            <h4 class="card-title font-weight-bold"><a>La Sirena restaurant</a></h4>
            <ul class="list-unstyled list-inline rating mb-0">
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"> </i></li>
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
            <li class="list-inline-item mr-0"><i class="fas fa-star amber-text"></i></li>
            <li class="list-inline-item"><i class="fas fa-star-half-alt amber-text"></i></li>
            <li class="list-inline-item"><p class="text-muted">4.5 (413)</p></li>
            </ul>
            <p class="mb-2">$ • American, Restaurant</p>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <hr class="my-4"/>
            <p class="lead"><strong>Tonight's availability</strong></p>
            <ul class="list-unstyled list-inline d-flex justify-content-between mb-0">
            <li class="list-inline-item mr-0">
                <div class="chip mr-0">5:30PM</div>
            </li>
            <li class="list-inline-item mr-0">
                <div class="chip deep-purple white-text mr-0">7:30PM</div>
            </li>
            <li class="list-inline-item mr-0">
                <div class="chip mr-0">8:00PM</div>
            </li>
            <li class="list-inline-item mr-0">
                <div class="chip mr-0">9:00PM</div>
            </li>
            </ul>
            <a href="#" class="btn btn-flat deep-purple-text p-1 mx-0 mb-0">Button</a>

        </div>

    </div>
    );
  }
}

export default BuscadorItem;

