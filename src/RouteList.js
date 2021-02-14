import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
export default function RouteList(props){
    const fakeData = [
        {
            id:1,
            name: 'Mail route'
        }
    ]
    const [routes,setRoutes] = useState(fakeData)
    return (
        <div className='route-list'>
            <ul>
                {routes.map(item=>{
                    return (
                    <li key={`route-${item.id}`}>
                        <Link to={`/routes/${item.id}`}>{item.name}</Link>
                        <button>Edit</button>
                        <button>Delete</button>

                    </li>
                    )
                })}
            </ul>
        </div>
    )
}