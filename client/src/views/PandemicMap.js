// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'
import {useRef, useEffect, useState, useContext} from 'react'
import MapBox from 'mapbox-gl'
import "mapbox-gl/dist/mapbox-gl.css";
import "../css/Map.css"
import {AnalyticContext} from '../contexts/analyticContext'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
MapBox.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const PandemicMap = () => {

    const {analyticState: {analytic, analyticLoading}, getAnalytic} = useContext(AnalyticContext)

    useEffect(() => getAnalytic(), [])
    
    let data = []
    let _3region = {}
    
    if(analyticLoading) {

    } else {
        analytic.map((point, index) => {
            if(point.position!=='nghean'&&point.position!=='vietnam'&&point.position!=='thegioi')
            {
                data.push({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            point.coordinates.longitude,
                            point.coordinates.latitude
                        ]
                    },
                    properties: {
                        id: index,
                        position: point.position,
                        total: point.total,
                        death: point.death,
                        cured: point.cured
                    }
                })
            } else {
                _3region[point.position]={
                    total: point.total,
                    death: point.death,
                    cure: point.cure,
                    cured: point.cured
                }
            }
        })
    }

    const [mapState, setState] = useState({
        lat: 19.229052853142463,
        lng: 104.90126244922653,
        zoom: 7.4
    })

    const mapContainer = useRef(null);  

    useEffect(() => {
        if(data) {
            const map = new MapBox.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/light-v10',
                center: [mapState.lng, mapState.lat],
                zoom: mapState.zoom
            })

            map.once("load", function() {
                console.log(data)

                map.addSource("points", {
                    type: "geojson",
                    data: {
                        type: "FeatureCollection",
                        features: data
                    }
                })

                map.addLayer({
                    id: "circles",
                    source: "points",
                    type: "circle",
                    paint: {
                        "circle-opacity": 0.75,
                        "circle-stroke-width": 1,
                        "circle-radius": [
                            "interpolate",
                            ["linear"],
                            ["get", "total"],
                            1, 3,
                            250, 10,
                            500, 20
                        ],
                        "circle-color": [
                            "interpolate",
                            ["linear"],
                            ["get", "total"],
                            1, '#deebf7',
                            250, '#9ecae1',
                            500, '#3182bd'
                        ],
                    }
                })

                const popup = new MapBox.Popup({
                    closeButton: false,
                    closeOnClick: false
                })

                let lastId;

                map.on("mousemove", "circles", e => {
                    const id = e.features[0].properties.id;
                    if (id !== lastId) {
                        lastId = id;
                        map.getCanvas().style.cursor = "pointer";
                  
                        const {total, death, cured, position} = e.features[0].properties;
                        const coordinates = e.features[0].geometry.coordinates.slice();
                
                        const HTML = `<h6>${position}</h6>
                                <h6>Ca ghi nh???n: ${total}</h6>
                                <h6>T??? Vong: ${death}</h6>
                                <h6>Ch???a kh???i: ${cured}</h6>`

                        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                        }
                  
                        popup
                            .setLngLat(coordinates)
                            .setHTML(HTML)
                            .addTo(map);
                    }
                })

                map.on("mouseleave", "circles", function() {
                    lastId = undefined;
                    map.getCanvas().style.cursor = "";
                    popup.remove();
                })
            })

            map.addControl(new MapBox.NavigationControl())
        }

    }, [analyticLoading])
    console.log(_3region)

    let table = null

    if(!analyticLoading) {
        table = <>
            <Badge bg="success" className='mt-4'>Ngh??? An</Badge>
            <Table responsive>
                <thead>
                    <tr>
                        <th>S??? CA NHI???M</th>
                        <th>??ANG ??I???U TR???</th>
                        <th>KH???I/CHUY???N TUY???N</th>
                        <th>T??? VONG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{_3region['nghean'].total}</td>
                        <td>{_3region['nghean'].cured}</td>
                        <td>{_3region['nghean'].cure}</td>
                        <td>{_3region['nghean'].death}</td>
                    </tr>
                </tbody>
            </Table>

            <Badge bg="danger" className='mt-4'>Vi???t Nam</Badge>
            <Table responsive>
                <thead>
                    <tr>
                        <th>S??? CA NHI???M</th>
                        <th>??ANG ??I???U TR???</th>
                        <th>KH???I</th>
                        <th>T??? VONG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{_3region['vietnam'].total}</td>
                        <td>{_3region['vietnam'].cured}</td>
                        <td>{_3region['vietnam'].cure}</td>
                        <td>{_3region['vietnam'].death}</td>
                    </tr>
                </tbody>
            </Table>

            <Badge bg="info" className='mt-4'>Th??? gi???i</Badge>
            <Table responsive>
                <thead>
                    <tr>
                        <th>S??? CA NHI???M</th>
                        <th>T??? VONG</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{_3region['thegioi'].total}</td>
                        <td>{_3region['thegioi'].death}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    }

    return (
        <>
            <div className='titlePost'>
                <h1>B???n ????? & S??? li???u</h1>
            </div>
            <div className="maptinhhinh">
                <div className="mapContainer m-3">
                    <div ref={mapContainer} className="mapBox" />
                </div>
                <div className="tinhhinh">
                    <h3>T??nh H??nh D???ch B???nh</h3>
                    {table}
                </div>
            </div>
        </>
    )
}

export default PandemicMap
