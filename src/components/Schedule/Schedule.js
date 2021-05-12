import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import RoutesService from '../../services/routes-service'
import './Schedule.css'

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
    //date is stored as yyyy/mm/dd, return -1  if date1 is later than date2, 1 o.w.
    function compareDates(date1, date2) {
        const date1Arr = date1
            .split('-')
            .map(item => parseInt(item))
        const date2Arr = date2
            .split('-')
            .map(item => parseInt(item))
        for (let i = 0; i < date1Arr.length; i++) {
            if (date1Arr[i] > date2Arr[i]) {
                return -1
            }
            else if (date1Arr[i] < date2Arr[i]) {
                return 1
            }
        }
        return 1


    }
    function prettifyDate(astring){
        const [year,month,day] = astring.split('-')
        const months =['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
        return `${parseInt(day)} ${months[month-1]}, ${year}`
      }
    

    return (
        <div >
            <ul className="route-list">
        {runs.sort((a, b) => compareDates(a.date, b.date))
            .map(item=><li key={`run-${item.id}`}>
            
            <Link to={`/schedule/${item.id}`}>{item.date?prettifyDate(item.date):null}</Link>
            
            <button onClick={(e) => handleDelete(e,item.id)}>Delete</button>
            </li>)
            
            
        }
    </ul>
    <button onClick={() => props.history.push('/add-to-schedule')}>Add to Schedule</button>

        </div>
    
    )

}