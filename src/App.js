import React from 'react'
import Login from './Auth/Login'
import Registro from './Auth/Registro'
import MuroProfesional from './Usuarios/MuroProfesional'
import Perfil from './Usuarios/Perfil'
import Navbar from './Usuarios/Navbar'
import CrearOferta from './Ofertas/CrearOferta'
import Oferta from './Ofertas/Oferta'
import Buscador from './Buscador/Buscador'
import Horario from './Usuarios/Horario'
import Chat from  './Chat/Chat'
import Aceptar from './Static/Aceptar'
import { reactLocalStorage } from 'reactjs-localstorage';
import PerfilPublico from './Usuarios/PerfilPublico';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import MuroCliente from './Usuarios/MuroCliente';
import EditarOferta from './Ofertas/EditarOferta';
import CambiarPassword from './Usuarios/CambiarPassword';
import ListaOfertas from './Usuarios/ListaOfertas';
import ListaUsuarios from './Usuarios/ListaUsuarios';
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
        this.horario = this.horario.bind(this)
        this.chat = this.chat.bind(this)

    }

    crearOferta() {
        this.setState({ mostrar: 'crear-oferta' })
    }

    oferta() {
        this.setState({ mostrar: 'oferta' })
    }

    registro() {
        this.RouterRegistro()
        //this.setState({ mostrar: 'registro' })
    }

    login() {
        this.setState({ mostrar: 'login' })
    }

    buscador() {
        this.setState({ mostrar: 'buscador' })
    }
    horario() {
        this.setState({ mostrar: 'horario' })
    }
    chat() {
        this.setState({ mostrar: 'perfil-publico' })
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

    RouterRegistro() {
        return (
            <div>
               <Registro log={this.login}/>
            </div>
          );
        
    }

    render() {


        return <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/registrar' component={Registro}/>
            <Route path='/muroCliente' component={MuroCliente}/>
            <Route path='/muroProfesional' component={MuroProfesional}/>
            <Route path='/horario' component={Horario}/>
            <Route path='/perfil' component={Perfil}/>
            <Route path='/publico' component={PerfilPublico}/>
            <Route path='/crearOferta' component={CrearOferta}/>
            <Route path='/oferta' component={Oferta}/>
            <Route path='/buscador' component={Buscador}/>
            <Route path='/aceptar' component={Aceptar}/>
            <Route path='/editarOferta' component={EditarOferta}/>
            <Route path='/cambiarContraseña' component={CambiarPassword}/>
            <Route path='/listaOfertas' component={ListaOfertas}/>
            <Route path='/listaUsuarios' component={ListaUsuarios}/>
        </Switch>


    }
}

//Exportamos el componente. Usamos el "default"
//porque no necesitamos exportar varias cosas separadas
export default App