import React, {useEffect,useState} from 'react'
import RoutesService from '../../services/routes-service'


export default function AddScheduleItem(props){
    const [routes,setRoutes] = useState([])
    const [schedule,setSchedule] = useState([])
    
    useEffect( () => {
        
        (async () => {
            const routes =  await RoutesService.getRoutes(props)
             
    
            //routes.find(route => route.id === props.match.params.id)
        setRoutes(routes)})()
    }, [props])

    const handleSubmit =  async (e) => {
        e.preventDefault()
        const postBody = {
            route_id: e.target.route.value,
            title: e.target.title.value,
            date: e.target.date.value
         }
         //console.log(postBody)
         await RoutesService.postRun(postBody)
         props.history.push('/schedule')
    }

    return (
    <form className="add-schedule" onSubmit={handleSubmit}>
        <select id="route" name="route" required>
    {routes.length?routes.map((item,i) => <option key={`route-${i}`} value={item.id}>{item.title}</option>):null}
        </select>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" required/>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" required/>
        <button type='submit'>Submit</button>

    </form>
    )
}