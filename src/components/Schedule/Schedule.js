import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import RoutesService from '../../services/routes-service'


export default function Schedule(props){
    
    const [runs,setRuns] = useState([])
    useEffect( () => {
        
        (async () => {
            const myRuns = await RoutesService.getSchedule()
            
            
             
    
            
        setRuns(myRuns)})()
    }, [props])

    const handleDelete = async (e,id) => {
        await RoutesService.deleteScheduleItem(id)
        const updatedRuns = await RoutesService.getSchedule()
        setRuns(updatedRuns)
    }
    return (
        <div>
            <ul>
        {runs.map(item=><li key={`run-${item.id}`}>
            <Link to={`/schedule/${item.id}`}>{`${item.title}`}</Link>
            <button onClick={(e) => handleDelete(e,item.id)}>Delete</button>
            </li>)}
    </ul>
    <button onClick={() => props.history.push('/add-to-schedule')}>Add to Schedule</button>

        </div>
    
    )

}