import { Marker,useMapEvents, Polyline, useMap} from 'react-leaflet'
import React from 'react'
import { Icon } from 'leaflet';
export default function StaticDrawing(props) {
    
    const map = useMap()
    map.fitBounds(props.points.map(point=>[point.lat,point.lng]))
    
    const picture = !props.points.length ? null : (
      props.points.map((point,idx) =>{ return (
        <Marker  key={`marker-${idx}`}  position={point}>
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