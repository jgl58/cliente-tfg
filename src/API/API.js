
import { reactLocalStorage } from 'reactjs-localstorage';

const API_URL = 'https://jonaygilabert.ddns.net:3030/'
//const API_URL = 'http://192.168.1.49:3030/'
class API {
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

        return fetch(API_URL+"provincias").then(function (response) {
            return response.json()
        })
    }

    getProvincia(id) {

        return fetch(API_URL+"provincias/"+id).then(function (response) {
            return response.json()
        })
    }

    getOfertasCreadas(idUser) {

        return fetch(API_URL+"users/" + idUser + "/ofertas",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        }).then(function (response) {
            return response.json()
        })
    }

    getTrabajos(idUser) {

        return fetch(API_URL+"profesionales/" + idUser + "/trabajos",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getOferta(idUser,id) {

        return fetch(API_URL+"users/" + idUser + "/ofertas/" + id,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getOfertaSola(id) {

        return fetch(API_URL+"ofertas/" + id,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getCliente(idUser) {
        return fetch(API_URL+"users/" + idUser,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getProfesional(idUser) {
        return fetch(API_URL+"profesionales/" + idUser,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    updateCliente(idUser,json) {
        return fetch(API_URL+"users/" + idUser, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            },
            body: json
        })
    }

    updateProfesional(idUser,json) {
        return fetch(API_URL+"profesionales/" + idUser, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            },
            body: json
        })
    }

    crearOferta(idUser,json) {
        return fetch(API_URL+"users/" + idUser + "/ofertas", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            },
            body: json
        })
    }

    updateOferta(idUser,idOferta,json) {
        return fetch(API_URL+"users/" + idUser+"/ofertas/"+idOferta, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            },
            body: json
        })
    }

    borrarOferta(idUser,idOferta) {
        return fetch(API_URL+"users/" + idUser+"/ofertas/"+idOferta, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            }
        })
    }

    getProfesionalOferta(idUser,id) {

        return fetch(API_URL+"users/" + idUser + "/ofertas/" + id + "/profesional",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getClienteTrabajo(idUser,id) {

        return fetch(API_URL+"profesionales/" + idUser + "/trabajos/" + id + "/user",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }
    getHistorialProfesionales(idUser) {

        return fetch(API_URL+"users/" + idUser + "/profesionales",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    getHistorialClientes(idUser) {

        return fetch(API_URL+"profesionales/" + idUser + "/clientes",{
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

    buscadorPorProvinciasTitulo(id,title) {

        return fetch(API_URL+"buscador/" + id+"?title="+title,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
            .then(function (response) {
                return response.json()
            })
    }

    aceptarOferta(idUser,oferta) {
        return fetch(API_URL+"profesionales/" + idUser+"/trabajos/"+oferta, {
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

    getHorario(id){
        return fetch(API_URL+"profesionales/" + id+"/horario",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
        .then(function (response) {
            return response.json()
        })
    }

    getNotificaciones(id){
        return fetch(API_URL+"profesionales/" + id+"/notificaciones",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
        .then(function (response) {
            return response.json()
        })
    }


    valorarProfesional(idUser,json) {
        return fetch(API_URL+"profesionales/" + idUser, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            },
            body: json
        })
    }

    getValoracionProfesional(id){
        return fetch(API_URL+"profesionales/" + id+"/valoracion",{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
        .then(function (response) {
            return response.json()
        })
    }

    cancelarOferta(idUser,idTrabajo) {
        return fetch(API_URL+"profesionales/" + idUser+'/trabajos/'+idTrabajo+'/cancelar', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            }
        })
    }
    
    cancelarNotificacion(idUser,idNotificacion) {
        return fetch(API_URL+"profesionales/" + idUser+"/notificaciones/"+idNotificacion, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': reactLocalStorage.get('token')
            }
        })
    }

    getMensajesProfesional(id,idUser){
        return fetch(API_URL+"profesionales/" + id+"/mensajes/"+idUser,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
        .then(function (response) {
            return response.json()
        })
    }

    getMensajesCliente(id,idProfesional){
        return fetch(API_URL+"users/" + id+"/mensajes/"+idProfesional,{
            headers: {
                'Authorization': reactLocalStorage.get('token')   
            }
        })
        .then(function (response) {
            return response.json()
        })
    }

}

export default API