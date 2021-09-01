import React, {useRef, useEffect, useState} from 'react'
import MapBox from 'mapbox-gl'
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/Map.css"
MapBox.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const PandemicMap = () => {
    const [mapState, setState] = useState({
        lat: 19.229052853142463,
        lng: 104.90126244922653,
        zoom: 7.4
    })

    const mapContainer = useRef(null);  

    useEffect(() => {
        const map = new MapBox.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [mapState.lng, mapState.lat],
            zoom: mapState.zoom
        })

        map.addControl(new MapBox.NavigationControl());
    })
    
    return (
        <>
            <h1>Pandemic Map</h1>
            <div className="mapContainer">
                <div ref={mapContainer} className="mapBox" />
            </div>
            <h1>Hello</h1>
        </>
    )
}

export default PandemicMap
