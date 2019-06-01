import React from 'react'
import Login from './Auth/Login'
import Registro from './Auth/Registro'
import MuroCiente from './Usuarios/MuroCliente'
import MuroProfesional from './Usuarios/MuroProfesional'
import Perfil from './Usuarios/Perfil'
import Navbar from './Usuarios/Navbar'
import CrearOferta from './Ofertas/CrearOferta'
import Oferta from './Ofertas/Oferta'
import { reactLocalStorage } from 'reactjs-localstorage';
class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mostrar: 'login'
        }
        this.login = this.login.bind(this)
        this.registro = this.registro.bind(this)
        this.muro = this.muro.bind(this)
        this.muroProfesional = this.muroProfesional.bind(this)
        this.perfil = this.perfil.bind(this)
        this.crearOferta = this.crearOferta.bind(this)
        this.oferta = this.oferta.bind(this)

    }

    crearOferta() {
        this.setState({ mostrar: 'crear-oferta' })
    }

    oferta() {
        this.setState({ mostrar: 'oferta' })
    }

    registro() {
        this.setState({ mostrar: 'registro' })
    }

    login() {
        this.setState({ mostrar: 'login' })
    }

    muro() {
        if(reactLocalStorage.get('isProfesional') == 'true'){
            this.setState({ mostrar: 'muro-p' })
        }else{
            this.setState({ mostrar: 'muro' })
        }
        
    }

    muroProfesional() {
        this.setState({ mostrar: 'muro-p' })
    }
    perfil() {
        this.setState({ mostrar: 'perfil' })
    }

    render() {

        switch (this.state.mostrar) {

            case 'login':
                return <div id="ui-view">
                    <Login reg={this.registro} muro={this.muro} muroP={this.muroProfesional}/>
                </div>
            case 'registro':
                return <div id="ui-view">
                    <Registro log={this.login} />
                </div>
            case 'muro':
                return <div id="ui-view">
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} />
                    <MuroCiente crearOferta={this.crearOferta} oferta={this.oferta} />
                </div>
            case 'muro-p':
                return <div id="ui-view">
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} />
                    <MuroProfesional crearOferta={this.crearOferta} oferta={this.oferta} />
                </div>
            case 'perfil':
                return <div id="ui-view">
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} />
                    <Perfil />
                </div>

            case 'crear-oferta':
                return <div id="ui-view">
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} />
                    <CrearOferta muro={this.muro} />
                </div>

            case 'oferta':
                return <div id="ui-view">
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} />
                    <Oferta muro={this.muro} />
                </div>
            default:
                return <div>

                </div>
        }


    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default App