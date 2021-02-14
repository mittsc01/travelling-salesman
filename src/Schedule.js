import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'


export default function Schedule(props){
    const fakeData = [
        {
            id: 0,
            route: {
                id: 1,
                name: 'Test'
            },
            date: "2021-11-13"
        },
        {
            id: 1,
            route: {
                id: 2,
                name: 'Test2'
            },
            date: "2021-11-15"
        },

    ]
    const [runs,setRuns] = useState(fakeData)
    return (
        <div>
            <ul>
        {runs.map(item=><li key={`run-${item.id}`}>
            <Link to={`/schedule/${item.id}`}>{`${item.route.name}`}</Link>
            <button>Edit</button>
            <button>Delete</button>
            </li>)}
    </ul>
    <button onClick={() => props.history.push('/schedule/add')}>Add to Schedule</button>

        </div>
    
    )

}