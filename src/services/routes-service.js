import config from '../config'
import TokenService from './token-service'
const RoutesService = {
    getSchedule(){
      return fetch(`${config.API_ENDPOINT}/schedule`, {
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
    getRoutes(){
        return fetch(`${config.API_ENDPOINT}/routes/`, {
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
    getPoints(routeId){
      return fetch(`${config.API_ENDPOINT}/points/${routeId}`, {
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

        const results = await RoutesService.getMyResultsByRaceId(props.match.params.id)
        const race = await RoutesService.getRaceById(props.match.params.id)
        
        results.sort((a,b)=>a.place-b.place)
        
        return {results,...race}
    },
    async getData (props){

      const results = await RoutesService.getResultsByRaceId(props.match.params.id)
      const race = await RoutesService.getRaceById(props.match.params.id)
      
      results.sort((a,b)=>a.place-b.place)
      
      return {results,...race}
  },
    //postBody will be {"route": {"title":"example"}, "points":[...points]}
     postRoute(postBody){
         return fetch(`${config.API_ENDPOINT}/routes/`, {
             method: 'POST',
             headers: {
                 'authorization': `Bearer ${TokenService.getAuthToken()}`,
                 'content-type': 'application/json',
             },
             body: JSON.stringify({'title': postBody.title})
         })
         .then(res =>
             (!res.ok)
               ? res.json().then(e => Promise.reject(e))
               : res.json()
           )
           .then((res) => {
             //console.log(res)
            return fetch(`${config.API_ENDPOINT}/points/${res.id}`, {
              method: 'POST',
              headers: {
                  'authorization': `Bearer ${TokenService.getAuthToken()}`,
                  'content-type': 'application/json',
              },
              body: JSON.stringify(postBody.points)
          })
           })
           .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
     },
     postRun(postBody){
      return fetch(`${config.API_ENDPOINT}/schedule`, {
          method: 'POST',
          headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
              'content-type': 'application/json',
          },
          body: JSON.stringify(postBody)
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
    updateRoute(patchBody,routeId){
        return fetch(`${config.API_ENDPOINT}/routes/${routeId}`, {
            method: 'PATCH',
            headers: {
                'authorization': `Bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json',
            },
            body: JSON.stringify(patchBody),
        })
        .then(res =>
            
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res
          )
        
        
    },
    updatePoints(patchBody,routeId){
      return fetch(`${config.API_ENDPOINT}/points/${routeId}`, {
          method: 'PUT',
          headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
              'content-type': 'application/json',
          },
          body: JSON.stringify(patchBody),
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
    deleteRoute(id){
        return fetch(`${config.API_ENDPOINT}/routes/${id}`, {
            method: 'DELETE',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          }) 
    },
    deleteScheduleItem(id){
      return fetch(`${config.API_ENDPOINT}/schedule/${id}`, {
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



export default RoutesService