import { Helmet } from 'react-helmet'
import { MapContainer, TileLayer, LayersControl,LayerGroup} from 'react-leaflet'
import React, { useState,useEffect} from 'react'
import DynamicDrawing from '../DynamicDrawing/DynamicDrawing';
import RoutesService from '../../services/routes-service'
//TODO: get geolocation working

function AddMap(props) {
  //const [map,setMap] = useState(null)
  const [unit,setUnit] = useState('M')
  const [points, setPoints] = useState([])
  const [title, setTitle] = useState(null)
  const [center,setCenter] = useState([])

  

  function getLatLon(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
      
      return [latitude,longitude]
  }
  useEffect(() => {
    ;
    (async () => {
      navigator.geolocation.getCurrentPosition(getLatLon)
      
      
      
    })()
  }, [props])
const addPoint = (e) => {
    const newIndex = points.length
    ? points[points.length-1].index+1
    : 1
  setPoints([...points,{...e.latlng,index:newIndex}])
}

const handleDrag = (e,idx) => {
  points[idx] = e.target._latlng
  
  setPoints([...points])
}
const handleClear = (e,idx) => {
  setPoints([])
}

const save = (e) => {
  e.preventDefault()
  
  
  const postBody = {title: e.target.title.value, points:points}
  if (postBody.title && postBody.points.length){
    RoutesService.postRoute(postBody).then(() => {
        setPoints([])
        setTitle(null)
        props.history.push('/routes')
      })

  }
  else {
      alert('Please add points to the map in order to save a route.')
  }
  
  

}
const handleRemove = (e) => {
  if (points.length===0){
    setPoints([])
  }
  else {
    points.pop()
    setPoints([...points])
  }
}
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
      <h2>{title}</h2>
      <form onSubmit={save}>
          <label htmlFor="title">Title</label>
          <input name="title" type="text" required />
 
      <MapContainer id="map-container" center={center.length?{...center}:[43.30, -91.79]} zoom={15} scrollWheelZoom={true}>
      <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        /> 
        
        <LayersControl position="topright">
        <LayersControl.BaseLayer name="Satellite">
          <LayerGroup>
          <TileLayer zIndex={2}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png" 
        />
          <TileLayer zIndex={1}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'  
        />
        
          </LayerGroup>
        
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Streetview">
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
        /> 
        </LayersControl.BaseLayer>
        
        
        </LayersControl>
       
        <DynamicDrawing  handleDrag={handleDrag} handleAdd={addPoint} points={[...points]}/>
        
      </MapContainer>
      <button type="submit" >Add Route</button>
      </form>

      <button onClick={handleClear}>Clear</button>
      <button onClick={handleRemove}>Remove last</button>
      <button onClick={toggleUnit}>{unit==='M'?'Metric':'Imperial'}</button>
      
      
      <span>{`Route distance: ${computePathLength(points,unit).toFixed(1)} ${unit==='M'?'mi':'km'}`} </span>
    </div>
  );
}

export default AddMap;