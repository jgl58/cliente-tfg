import React from 'react'
import Login from './Login'
import Registro from './Registro'
import Muro from './Muro'
class App extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            mostrar: 'login'
        }
        this.login = this.login.bind(this)
        this.registro = this.registro.bind(this)
        this.muro = this.muro.bind(this)
    }

    registro(){
        this.setState({mostrar: 'registro'})
    }

    login(){
        this.setState({mostrar: 'login'})
    }

    muro(){
        this.setState({mostrar: 'muro'})
    }

    render() {

        switch(this.state.mostrar){

            case 'login':
                return <div>
                        <Login reg={this.registro} muro={this.muro}/>
                    </div>
            case 'registro':
                return <div>
                        <Registro log={this.login} />
                    </div>
            case 'muro':
                return <div>
                        <Muro logout={this.login}/>
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