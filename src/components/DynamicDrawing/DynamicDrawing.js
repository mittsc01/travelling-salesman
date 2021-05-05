import { Marker,useMapEvents,useMap, Polyline} from 'react-leaflet'
import React, {useState} from 'react'
import {iconFilbert} from '../../icon'
import './DynamicDrawing.css'
export default function DynamicDrawing(props) {
    const [tog,setTog] = useState(true)
    
    const map = useMapEvents({
      click(e) {

        props.handleAdd(e)

      },
      
    })

    if (props.points.length > 0 && tog) {
      map.fitBounds(props.points.map(point=>[point.lat,point.lng]))
      setTog(false)
    }
    
     
    
    
    
    
    const picture = !props.points.length ? null : (
      props.points.map((point,idx) =>{ return (
        <Marker  icon={iconFilbert} eventHandlers={{ 
          drag: (e) => props.handleDrag(e,idx),
          
          }} key={`marker-${idx}`} draggable position={point}>
        </Marker>)}
      )
    )

    return (
      <div>
        {picture}
        {props.points.length?<Polyline positions={props.points}  />:null}
        <button>Test</button>
      </div>
    )
    
  }