
import { reactLocalStorage } from 'reactjs-localstorage';
const API_URL = 'http://jonaygilabert.ddns.net:3030/'
class API {
    constructor() {
        this.API_URL = 'http://jonaygilabert.ddns.net:3030/'
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

    getOfertasCreadas() {

        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/ofertas")
            .then(function (response) {
                return response.json()
            })
    }

    getTrabajos() {

        return fetch(API_URL+"profesional/" + reactLocalStorage.get('idUser') + "/trabajos")
            .then(function (response) {
                return response.json()
            })
    }

    getOferta(id) {

        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/ofertas/" + id)
            .then(function (response) {
                return response.json()
            })
    }

    getCliente() {
        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser'))
            .then(function (response) {
                return response.json()
            })
    }

    getProfesional() {
        return fetch(API_URL+"profesionales/" + reactLocalStorage.get('idUser'))
            .then(function (response) {
                return response.json()
            })
    }

    updateCliente(json) {
        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser'), {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: json
        })
    }

    updateProfesional(json) {
        return fetch(API_URL+"profesionales/" + reactLocalStorage.get('idUser'), {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: json
        })
    }

    crearOferta(json) {
        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/ofertas", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: json
        })
    }

    getProfesionalOferta(id) {

        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/ofertas/" + id + "/user")
            .then(function (response) {
                return response.json()
            })
    }
    getHistorialProfesionales(id) {

        return fetch(API_URL+"users/" + reactLocalStorage.get('idUser') + "/profesionales")
            .then(function (response) {
                return response.json()
            })
    }

}

export default API