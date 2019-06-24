import React from 'react'
import Login from './Auth/Login'
import Registro from './Auth/Registro'
import MuroCiente from './Usuarios/MuroCliente'
import MuroProfesional from './Usuarios/MuroProfesional'
import Perfil from './Usuarios/Perfil'
import Navbar from './Usuarios/Navbar'
import CrearOferta from './Ofertas/CrearOferta'
import Oferta from './Ofertas/Oferta'
import Buscador from './Buscador/Buscador'
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
        this.buscador = this.buscador.bind(this)

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

    buscador() {
        this.setState({ mostrar: 'buscador' })
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
                return <div>
                    <Login reg={this.registro} muro={this.muro} muroP={this.muroProfesional}/>
                </div>
            case 'registro':
                return <div>
                    <Registro log={this.login}/>
                </div>
            case 'muro':
                return <div >
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} buscador={this.buscador}/>
                    <MuroCiente crearOferta={this.crearOferta} oferta={this.oferta} />
                </div>
            case 'muro-p':
                return <div >
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} buscador={this.buscador}/>
                    <MuroProfesional crearOferta={this.crearOferta} oferta={this.oferta} goToPerfil={this.perfil} />
                </div>
            case 'perfil':
                return <div >
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} buscador={this.buscador}/>
                    <Perfil />
                </div>

            case 'crear-oferta':
                return <div >
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} buscador={this.buscador}/>
                    <CrearOferta muro={this.muro} />
                </div>

            case 'oferta':
                return <div >
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} buscador={this.buscador}/>
                    <Oferta muro={this.muro} />
                </div>

            case 'buscador':
                return <div >
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} buscador={this.buscador}/>
                    <Buscador/>
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