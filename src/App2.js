import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import GGIcon from "./ggicon.svg";
import { Container, Row, Col } from "reactstrap";
import { Button, FormGroup, Label, Input } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015

import ListDetail from "./ListDetail";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import firebase from "./utils/firebase";
const MapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCeNHOAwZYe401o8yWdDyK45FKwOjsS-w8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100vh` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    center={props.center}
    zoom={props.zoom}
    onZoomChanged={props.onZoomChanged}
  >
    {props.isMarkerShown && (
      <div>
        {props.data.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            onClick={() => props.onMarkerClick(marker)}
          />
        ))}
      </div>
    )}
  </GoogleMap>
));

class App2 extends React.PureComponent {
  state = {
    showDetail: false,
    data: [],
    isMarkerShown: true,
    zoom: 12,
    defaultCenter: { lat: 10.779739, lng: 106.678926 },
    onCenterChanged: {},
    center: { lat: 10.779739, lng: 106.678926 },
    markerClicked: null
  };

  componentDidMount() {
    const db = firebase.firestore();
    db
      .collection("data")
      .limit(200)
      .get()
      .then(querySnapshot => {
        let new_data = [];
        querySnapshot.forEach(doc => {
          // console.log(`${doc.id} => ${doc.data()}`);
          const pos = doc.data();
          // console.log(pos.position)
          new_data.push(pos);
        });
        this.setState({
          data: new_data
        });
      });
  }
  handleMarkerClick = marker => {
    // console.log(marker);
    this.setState({ showDetail: true, markerClicked: marker });
    // this.delayedShowMarker();
  };

  onZoomChanged = () => {
    this.setState({
      zoom: 17,
      center: { lat: 10.7882937, lng: 106.6946765 }
    });
  };
  render() {
    return (
      <div>
        <Navbar
          fixed="top"
          style={{
            background: "#3F3E3A",
            height: 64,
            boxShadow: `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`
          }}
          light
          expand="md"
        >
          <NavbarBrand href="/" style={{ color: "#fff" }}>
            {/* <img src={logo} height="59" alt="" /> */}
            Mầm non cho bé
          </NavbarBrand>
          <Nav className="ml-auto" style={{ alignItems: "center" }} navbar>
            <NavItem>
              <NavLink
                href="#"
                style={{
                  color: "#ffffff"
                }}
              >
                Trang chủ
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#ffffff" }}>
                Hướng dẫn
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: "#ffffff" }}>
                <Button
                  style={{
                    color: "#444",
                    background: "#fff",
                    boxShadow: ` 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
                  }}
                >
                  <img src={GGIcon} height="22" alt="" />
                  {"   "}Đăng nhập với Google
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>

        <Container fluid>
          <Row>
            <Col
              sm="4"
              style={{
                zIndex: 1,
                paddingTop: 90,
                boxShadow: `0 0 20px rgba(0, 0, 0, 0.3)`,
                overflowY: "auto",
                height: "100vh"
              }}
            >
              {this.state.showDetail ? (
                <ListDetail marker={this.state.markerClicked} />
              ) : (
                <div>
                  <FormGroup>
                    <Label for="phuong">Tìm theo phường</Label>
                    <Typeahead
                      labelKey="diaChiKhuVuc"
                      placeholder="Nhập địa chỉ phường"
                      paginationText="Xem thêm"
                      emptyLabel="Không có dữ liệu"
                      onChange={selected => {
                        console.log(selected);
                        // let pos = ;
                        if (selected.length !== 0) {
                          this.setState({
                            zoom: 16,
                            center: selected[0].position
                          });
                        }
                      }}
                      options={this.state.data}
                      selected={this.state.selected}
                    />
                  </FormGroup>
                  {/* <Input
                      type="text"
                      name="text"
                      id="phuong"
                      placeholder="Nhập địa chỉ phường"
                    /> */}
                  <FormGroup>
                    <Label for="phuong">Tìm theo trường</Label>
                    <Typeahead
                      labelKey="tenTruong"
                      placeholder="Chọn tên trường"
                      paginationText="Xem thêm tên trường"
                      emptyLabel="Không có dữ liệu"
                      onChange={selected => {
                        // console.log(selected);
                        // let pos = ;
                        if (selected.length !== 0) {
                          this.setState({
                            zoom: 20,
                            center: selected[0].position
                          });
                        }
                      }}
                      options={this.state.data}
                      selected={this.state.selected}
                    />
                  </FormGroup>
                  {/* <FormGroup>
                    <Label for="tentruong">Tìm kiếm tên trường</Label>
                    <Input
                      type="text"
                      name="text"
                      id="tentruong"
                      placeholder="Nhập tên trường"
                    />
                  </FormGroup> */}
                </div>
              )}
            </Col>
            <Col sm="8" style={{ padding: 0 }}>
              <MapComponent
                zoom={this.state.zoom}
                center={this.state.center}
                data={this.state.data}
                isMarkerShown={this.state.isMarkerShown}
                onMarkerClick={this.handleMarkerClick}
                onZoomChanged={this.onZoomChanged}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App2;
