import config from '../config'
import TokenService from './token-service'
const RacesService = {
    getMyRaces(){
        return fetch(`${config.API_ENDPOINT}/my-races/`, {
            method: 'GET',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    async getMyData (props){

        const results = await RacesService.getMyResultsByRaceId(props.match.params.id)
        const race = await RacesService.getRaceById(props.match.params.id)
        //sort results
        results.sort((a,b)=>a.place-b.place)
        
        return {results,...race}
    },
    async getData (props){

      const results = await RacesService.getResultsByRaceId(props.match.params.id)
      const race = await RacesService.getRaceById(props.match.params.id)
      //sort results
      results.sort((a,b)=>a.place-b.place)
      
      return {results,...race}
  },

    postRace(postBody){
        return fetch(`${config.API_ENDPOINT}/my-races/`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: postBody
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    postFinisher(raceId,postBody){
        return fetch(`${config.API_ENDPOINT}/my-races/${raceId}/results`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: postBody,
        })
        .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    updateRace(patchBody,raceId){
        return fetch(`${config.API_ENDPOINT}/my-races/${raceId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: patchBody,
        })
        .then(res =>
            
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res
          )
        
    },

    getMyRaceById(id){
        return fetch(`${config.API_ENDPOINT}/my-races/${id}`, {
            method: 'GET',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    getRaceById(id){
        
        return fetch(`${config.API_ENDPOINT}/races/${id}`, {
            method: 'GET'
            
          })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
        
        
    },
    getAllRaces(){
        return fetch(`${config.API_ENDPOINT}/races/`, {
            method: 'GET'
            
          })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },

    getMyResultsByRaceId(id){
        return fetch(`${config.API_ENDPOINT}/my-races/${id}/results`, {
            method: 'GET',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    getResultsByRaceId(id){
        return fetch(`${config.API_ENDPOINT}/races/${id}/results`, {
            method: 'GET'
          })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },
    deleteRace(id){
        return fetch(`${config.API_ENDPOINT}/my-races/${id}`, {
            method: 'DELETE',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          }) 
    },
    deleteFinisher(race_id,finisher_id){
        return fetch(`${config.API_ENDPOINT}/my-races/${race_id}/results/${finisher_id}`, {
            method: 'DELETE',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          }) 
    }
}



export default RacesService