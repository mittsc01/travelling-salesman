import React, {useState,useEffect} from 'react'

import RoutesService from '../../services/routes-service'
export default function RouteList(props){

    const [routes,setRoutes] = useState([])
    const [error,setError] = useState(null)
    useEffect( () => {
        
        (async () => {
            const routes =  await RoutesService.getRoutes(props)
             
    
            
        setRoutes(routes)})()
    }, [props])

    const handleDelete = async (id) => {
        try {
            await RoutesService.deleteRoute(id)
        const routes = RoutesService.getRoutes(props)
        setRoutes(routes)
        }
        catch(e){
            
            setError('Could not delete the route because schedule items are using it. Delete schedule items first.')
            
        }
    }

    return (
        <div className='route-list'>
            <ul>
                {routes.map(item=>{
                    return (
                    <li key={`route-${item.id}`}>
                        <span className="li-div">{item.title}</span>
                        <div className="li-div">
                        <button onClick={() => props.history.push(`/routes/${item.id}`)}>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>
                        </div>
                        
                    

                    </li>
                    )
                })}
            </ul>
            <span>{error}</span>
            <button className="save-button" onClick={() => props.history.push('/add-route')} type="button">New Route</button>
        </div>
    )
}