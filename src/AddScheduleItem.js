import React from 'react'

export default function AddScheduleItem(props){
    const routes = [
        {

                id: 1,
                name: 'Test'

        },
        {
                id: 2,
                name: 'Test2'
            },
       

    ]

    return (
    <form className="add-schedule">
        <select id="route" name="route" required>
    {routes.map((item,i) => <option key={`route-${i}`} value={item}>{item.name}</option>)}
        </select>
        <input type="date" required/>
        <button type='submit'>Submit</button>

    </form>
    )
}