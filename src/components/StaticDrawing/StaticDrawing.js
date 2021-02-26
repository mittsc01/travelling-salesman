import { Marker,useMapEvents, Polyline, useMap} from 'react-leaflet'
import React from 'react'
import {iconFilbert} from '../../icon'
export default function StaticDrawing(props) {
    
    const map = useMap()
    if (props.points.length){
        map.fitBounds(props.points.map(point=>[point.lat,point.lng]))
    }
    
    
    const picture = !props.points.length ? null : (
      props.points.map((point,idx) =>{ return (
        <Marker icon={iconFilbert}  key={`marker-${idx}`}  position={point}>
        </Marker>)}
      )
    )

    return (
      <div>
        {picture}
        {props.points.length?<Polyline positions={props.points}  />:null}
        
      </div>
    )
    
  }