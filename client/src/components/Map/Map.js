// import React, { Component } from "react";
// import Map from '../components/Map/Map.js'
// import Jumbotron from "../components/Jumbotron";
// import { Col, Row, Container } from "../components/Grid";


// class Google extends Component {
//   state = {
//     latitude: "",
//     longitude: ""
//   };
  
//   currentPosition = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           this.setState({
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//           })

//         });
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   }

//   componentDidMount() {
//     this.currentPosition()
//   }

//   render() {
//     return (
//       <Container fluid>
//         <Jumbotron>
//           <Row>
//             <Col size="md-8">
//               <Map
//                 id="myMap"
//                 options={{
//                   center: { lat: this.state.latitude, lng: this.state.longitude },
//                   zoom: 8
//                 }}
//                 onMapLoad={map => {
//                     new window.google.maps.Marker({
//                     position: { lat: 40.8075, lng: -73.9626 },
//                     map: map,
//                     // title: 'Hello Istanbul!'
//                   });
//                     new window.google.maps.Marker({
//                     position: { lat: 40.7295, lng: -73.9965 },
//                     map: map,
//                     // title: 'Hello Istanbul!'
//                   });
//                 }}
//               />
//             </Col>
//             <Col size="md-4">
//               <h1>Arryvl</h1>
//               <h3>Search for your destination</h3>
//               <p> Current Lat : {this.state.latitude}</p>
//               <p> Current Long: {this.state.longitude}</p>
//             </Col>
//           </Row>
//         </Jumbotron>
//       </Container>
//     );
//   }
// }

// export default Google;
import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Polyline, Marker } from 'react-google-maps'

class Map extends React.Component {
  state = {
    progress: [],
  }

  initialLocation = () => { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        })
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getLocation = () => {
        console.log('intitial',this.state.progress)
        window.setInterval(() => {
          navigator.geolocation.watchPosition(
            (position) => {
              let location = this.state.progress.concat({lat:position.coords.latitude,lng:position.coords.longitude})
              this.setState({ progress: location })
              setTimeout(()=>{console.log('added',this.state.progress)},5000)
              }
          )}
        ,1000); 
    
       
  }

  componentDidMount = () => { 
    if(this.state.progress.length === 1) { 
      // Set initial location if none exists
      this.initialLocation()
    } 
      // Start logging locations
      this.getLocation()
    
  }
  
  render = () => {
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat:39.0921017, lng:-94.7158009 }}
        >
          { this.state.progress && (
            <>
              {/* Set path */}
              <Polyline path={this.state.progress} options={{ strokeColor: "#FF0000 "}} />
              {/* Set marker to last known location */}
              <Marker position={this.state.progress[this.state.progress.length - 1]} />
            </>
          )}
      </GoogleMap>
    )
  }
}

const MapComponent = withScriptjs(withGoogleMap(Map))

export default MapComponent
