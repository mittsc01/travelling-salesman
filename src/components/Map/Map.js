import React, {useState,useEffect} from 'react'
import StaticDrawing from '../StaticDrawing/StaticDrawing'
import Helmet from 'react-helmet'
import {MapContainer,TileLayer, useMap,LayersControl,} from 'react-leaflet'
import RoutesService from '../../services/routes-service'
import './Map.css'
import '../EditMap/EditMap.css'
export default function Map(props){
  //const [map,setMap] = useState(null)
  const [unit,setUnit] = useState('M')
  //GET API_ENDPOINT/routes/${props.match.params.id}
  const [points, setPoints] = useState([])
  const [run,setRun] = useState({})
  
  
  useEffect( () => {
        
    (async () => {
        const runs =  await RoutesService.getSchedule()
        const theOne = runs.find(run => {
            
            return run.id === parseInt(props.match.params.id)
          })
        setRun(theOne)
        
        
        if (runs.length !==0){
            
          const markers = await RoutesService.getPoints(theOne.route_id)
          if (markers.length !==0){
            markers.sort((a,b) => a.index-b.index)
            
          }
          
          setPoints(markers)
          
          
        }
         

        
    })()
}, [props])


const toggleUnit = () => {
  if (unit==='M'){
    setUnit('K')
  }
  else {
    setUnit('M')
  }
}

function distance(lat1, lon1, lat2, lon2, unit) {
  if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
  }
  else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
          dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
  }
}

function prettifyDate(astring){
  const [year,month,day] = astring.split('-')
  const months =['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December']
  return `${parseInt(day)} ${months[month-1]}, ${year}`
}

function computePathLength(points,unit){
  if (points.length === 0){return 0}
  let d = 0 
  for (let i=0;i<points.length-1;i++){
      d+=distance(points[i].lat,points[i].lng,points[i+1].lat,points[i+1].lng,unit)
  }
  return d
}

  return (
    <div className="edit">
      <Helmet>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin="" />
      </Helmet>
      <div className='errand-info'>
      <h2>{run.title}</h2>
        <p>{run.date?prettifyDate(run.date):null}</p>
        
        <span className="distance-display">{`Route distance: ${computePathLength(points,unit).toFixed(1)} ${unit==='M'?'mi':'km'}`}<button onClick={toggleUnit}>{unit==='M'?'Metric':'Imperial'}</button> </span>
      </div>
      
      <MapContainer id="map-container" center={{lat: 43.30, lng: -91.79}} zoom={15} scrollWheelZoom={true}>
       
        <LayersControl position="topright">
        <LayersControl.BaseLayer name="Satellite">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
        />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Streetview" checked>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        /> 
        </LayersControl.BaseLayer>
        </LayersControl>
       
        <StaticDrawing points={[...points]}/>
        
      </MapContainer>
      
      
      
    </div>
  );
}
