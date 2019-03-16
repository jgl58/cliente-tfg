
import { reactLocalStorage } from 'reactjs-localstorage';
class API {
    constructor() {
        this.API_URL = 'http://localhost:3030/'
    }
    login(json) {
        return fetch('http://localhost:3030/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: json
        })
    }

    registro(json) {
        return fetch('http://localhost:3030/registro', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: json
        })
    }

    getOfertasCreadas() {
        
        return fetch("http://localhost:3030/users/" + reactLocalStorage.get('idUser') + "/ofertas")
            .then(function (response) {
                return response.json()
            })
    }

}

export default API