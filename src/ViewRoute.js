import { Helmet } from 'react-helmet'
import { MapContainer, TileLayer} from 'react-leaflet'
import React, { useState,useEffect} from 'react'
import Drawing from './DynamicDrawing';

function EditRoute(props) {
  const [map,setMap] = useState(null)
  const [unit,setUnit] = useState('M')
  const [points, setPoints] = useState([])
  /*
  useEffect(() => {
    setMarkers([{lat: 40.0126278281893,
      lng: -90.00823974609376},{}])
  })
  */

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
      <MapContainer id="map-container" center={{lat: 43.30, lng: -91.79}} zoom={15} scrollWheelZoom={true} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Drawing handleDrag={handleDrag} handleAdd={addPoint} points={points}/>
        
      </MapContainer>

      <button onClick={toggleUnit}>{unit==='M'?'Metric':'Imperial'}</button>
      <button onClick={save}>Save</button>
      <span>{`Route distance: ${computePathLength(props.points,unit).toFixed(1)} ${unit==='M'?'mi':'km'}`} </span>
    </div>
  );
}

export default EditRoute;