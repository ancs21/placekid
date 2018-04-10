import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

import firebase from "../utils/firebase";
const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCeNHOAwZYe401o8yWdDyK45FKwOjsS-w8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100vh` }} />
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      // console.log("fsgdfhsdfg")
      // state = {
      //   data: []
      // }
      const db = firebase.firestore();
      db
        .collection("data")
        .get()
        .then(querySnapshot => {
          let new_data = [];
          querySnapshot.forEach(doc => {
            // console.log(`${doc.id} => ${doc.data()}`);
            const pos = doc.data();
            // console.log(pos.position)
            new_data.push(pos.position);
          });
          this.setState({
            data: new_data
          });
        });
    }
  })
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    onBoundsChanged={props.onBoundsChanged}
    defaultZoom={props.defaultZoom}
    defaultCenter={props.defaultCenter}
  >
    {props.isMarkerShown && (
      <div>
        {/* <Marker
          position={{ lat: 10.7546664, lng: 106.4150246 }}
          onClick={props.onMarkerClick}
        />
        <Marker
          position={{ lat: 10.8021443, lng: 106.6465693 }}
          onClick={props.onMarkerClick}
        /> */}
        {props.data.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}

        {/* <Marker key={index} position={marker} /> */}
      </div>
    )}
  </GoogleMap>
));

class MainMap extends React.PureComponent {
  state = {
    data: [],
    isMarkerShown: true,
    defaultZoom: 12,
    defaultCenter: { lat: 10.779739, lng: 106.678926 }
  };

  // componentDidMount() {
  //   this.delayedShowMarker();
  // }

  // delayedShowMarker = () => {
  //   setTimeout(() => {
  //     this.setState({ isMarkerShown: true });
  //   }, 3000);
  // };

  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false });
  //   this.delayedShowMarker();
  // };
  clickhello = () => {
    this.setState({
      defaultZoom: 15,
      defaultCenter: { lat: 11.779739, lng: 106.678926 },
      onMapMounted: ref => {
        this.refs.map = ref;
      },
      onBoundsChanged: () => {
        this.setState({
          bounds: this.refs.map.getBounds(),
          center: this.refs.map.getCenter()
        });
      }
    });
  };
  render() {
    return (
      <div>
        <MapComponent
          defaultZoom={this.state.defaultZoom}
          defaultCenter={this.state.defaultCenter}
          data={this.state.data}
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
        <button onClick={this.clickhello}>Hello</button>
      </div>
    );
  }
}
export default MainMap;
