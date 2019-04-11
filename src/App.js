import React from 'react'
import Login from './Login'
import Registro from './Registro'
import Muro from './Muro'
import Perfil from './Perfil'
import Navbar from './Navbar'
import CrearOferta from './CrearOferta'
class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            mostrar: 'login'
        }
        this.login = this.login.bind(this)
        this.registro = this.registro.bind(this)
        this.muro = this.muro.bind(this)
        this.perfil = this.perfil.bind(this)
        this.crearOferta = this.crearOferta.bind(this)
    }

    crearOferta(){ 
        this.setState({ mostrar: 'crear-oferta' }) 
    }

    registro() {
        this.setState({ mostrar: 'registro' })
    }

    login() {
        this.setState({ mostrar: 'login' })
    }

    muro() {
        this.setState({ mostrar: 'muro' })
    }
    perfil() {
        this.setState({ mostrar: 'perfil' })
    }

    render() {

        switch (this.state.mostrar) {

            case 'login':
                return <div id="ui-view">
                    <Login reg={this.registro} muro={this.muro} />
                </div>
            case 'registro':
                return <div id="ui-view">
                    <Registro log={this.login} />
                </div>
            case 'muro':
                return <div id="ui-view">
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro}/>
                    <Muro crearOferta={this.crearOferta} />
                </div>
            case 'perfil':
                return <div id="ui-view">
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} />
                    <Perfil />
                </div>

            case 'crear-oferta':
                return <div id="ui-view">
                    <Navbar logout={this.login} perfil={this.perfil} muro={this.muro} />
                    <CrearOferta muro={this.muro}/>
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