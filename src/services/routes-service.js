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



    deleteRoute(id){
        return fetch(`${config.API_ENDPOINT}/routes/${id}`, {
            method: 'DELETE',
            headers: {
              'authorization': `Bearer ${TokenService.getAuthToken()}`,
            },
          })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()) 
    },
    deleteScheduleItem(id){
      return fetch(`${config.API_ENDPOINT}/schedule/${id}`, {
          method: 'DELETE',
          headers: {
            'authorization': `Bearer ${TokenService.getAuthToken()}`,
          },
        }) 
  },

}



export default RoutesService