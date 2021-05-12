import React, { useEffect, useState } from 'react'
import RoutesService from '../../services/routes-service'
import '../EditMap/EditMap.css'

export default function AddScheduleItem(props) {
    const [routes, setRoutes] = useState([])
    

    useEffect(() => {

        (async () => {
            const routes = await RoutesService.getRoutes(props)


            
            setRoutes(routes)
        })()
    }, [props])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const postBody = {
            route_id: e.target.route.value,
            title: e.target.title.value,
            date: e.target.date.value
        }

        await RoutesService.postRun(postBody)
        props.history.push('/schedule')
    }

    return (
        <form className="add-schedule" onSubmit={handleSubmit}>
            <div className="form-div">
                <label htmlFor="route">Route</label>
                <select id="route" name="route" required>
                    {routes.length ? routes.map((item, i) => <option key={`route-${i}`} value={item.id}>{item.title}</option>) : null}
                </select>
                <div>
                <label htmlFor="date">Date</label>
                <input type="date" name="date" id="date" required />
                </div>
                
                <label htmlFor="title">Title</label>
                <input type="text" name="title" id="title" required />
            </div>

            <button className="save-button" type='submit'>Submit</button>

        </form>
    )
}