
import { reactLocalStorage } from 'reactjs-localstorage';
//const API_URL = 'http://192.168.1.120:3030/'
const API_URL = 'http://localhost:3030/'
class API {
    constructor() {
        //this.API_URL = 'http://192.168.1.120:3030/'
        this.API_URL = 'http://localhost:3030/'
    }
    login(json) {
        return fetch(API_URL+'login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: json
        })
    }

    registro(json) {
        return fetch(API_URL+'registro', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: json
        })
    }

    getProvincias() {

        return fetch(API_URL+"provincias",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        }).then(function (response) {
            return response.json()
        })
    }

    getProvincia(id) {

        return fetch(API_URL+"provincias/"+id,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        }).then(function (response) {
            return response.json()
        })
    }

    getOfertasCreadas() {

        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/ofertas",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        }).then(function (response) {
            return response.json()
        })
    }

    getTrabajos() {

        return fetch(API_URL+"profesional/" + reactLocalStorage.get('idUser') + "/trabajos",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getOferta(id) {

        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/ofertas/" + id,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getCliente() {
        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser'),{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getProfesional() {
        return fetch(API_URL+"profesionales/" + reactLocalStorage.get('idUser'),{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    updateCliente(json) {
        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser'), {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            },
            body: json
        })
    }

    updateProfesional(json) {
        return fetch(API_URL+"profesionales/" + reactLocalStorage.get('idUser'), {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            },
            body: json
        })
    }

    crearOferta(json) {
        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/ofertas", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            },
            body: json
        })
    }

    getProfesionalOferta(id) {

        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/ofertas/" + id + "/profesional",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getClienteTrabajo(id) {

        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/ofertas/" + id + "/user",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }
    getHistorialProfesionales(id) {

        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/profesionales",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getHistorialClientes(id) {

        return fetch(API_URL+"profesionales/" + reactLocalStorage.get('idUser') + "/clientes",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    buscadorPorProvincias(id) {

        return fetch(API_URL+"buscador/" + id,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    aceptarOferta(oferta) {
        return fetch(API_URL+"profesional/" + reactLocalStorage.get('idUser')+"/trabajos/"+oferta, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            },
            body: JSON.stringify({
                estado: true
            })
        })
    }

}

export default API