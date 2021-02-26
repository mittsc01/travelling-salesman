import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import RoutesService from '../../services/routes-service'
export default function RouteList(props){
    const fakeData = [
        {
            id:1,
            name: 'Mail route'
        }
    ]
    const [routes,setRoutes] = useState([])
    useEffect( () => {
        
        (async () => {
            const routes =  await RoutesService.getRoutes(props)
             
    
            //routes.find(route => route.id === props.match.params.id)
        setRoutes(routes)})()
    }, [props])

    const handleDelete = async (id) => {
        await RoutesService.deleteRoute(id)
        const routes = await RoutesService.getRoutes(props)
        setRoutes(routes)
    }

    return (
        <div className='route-list'>
            <ul>
                {routes.map(item=>{
                    return (
                    <li key={`route-${item.id}`}>
                        <Link to={`/routes/${item.id}`}>{item.title}</Link>
                        <button>Edit</button>
                        <button onClick={() => handleDelete(item.id)}>Delete</button>

                    </li>
                    )
                })}
            </ul>
            <button onClick={() => props.history.push('/add-route')} type="button">Add Route</button>
        </div>
    )
}