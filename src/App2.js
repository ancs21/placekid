import React from 'react';
import { compose, withProps } from 'recompose';
// import SearchBox from './SearchBox';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import Directions from './directions';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Label } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import { Collapse, Form, Input } from 'reactstrap';

import ListDetail from './ListDetail';

import Header from './Header';
import firebase from './utils/firebase';
const db = firebase.database();

const MapComponent = compose(
  withProps({
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh` }} />,
    mapElement: <div style={{ height: `100vh` }} />
  }),
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
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.onMarkerClick(marker)}
          />
        ))}
      </div>
    )}
  </GoogleMap>
));

class App2 extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showDetail: false,
      data: [],
      isMarkerShown: true,
      zoom: 12,
      onCenterChanged: {},
      center: { lat: 10.779739, lng: 106.678926 },
      markerClicked: null,
      collapse: false,

      user: null,
      directionClick: null,
      directions: null,
      diaDiem: null,
      placeSearch: null
    };
    this.myRef = React.createRef();
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
    db.ref('data').on('value', snapshot => {
      let new_data = [];
      snapshot.forEach(function(childSnapshot) {
        const childData = childSnapshot.val();
        new_data.push(childData);
      });
      this.setState({
        data: new_data
      });
    });
  }
  handleMarkerClick = marker => {
    this.setState({ showDetail: true, markerClicked: marker });
  };

  onZoomChanged = () => {
    this.setState({
      zoom: 17,
      center: { lat: 10.7882937, lng: 106.6946765 }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.refs.typeahead1.getInstance().clear();
    this.refs.typeahead2.getInstance().clear();
    this.refs.typeahead3.getInstance().clear();
    this.refs.typeahead4.getInstance().clear();
    this.refs.typeahead5.getInstance().clear();
    db
      .ref('data')
      .once('value')
      .then(snapshot => {
        let new_data = [];
        snapshot.forEach(csnap => {
          const childData = csnap.val();
          new_data.push(childData);
        });
        this.setState({
          data: new_data
        });
      });
  };

  logIn = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        const user = result.user;
        console.log(user);
        this.setState({
          user
        });
      });
  };
  logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  };
  handelDirection = id => {
    this.setState({
      directionClick: true,
      diaDiem: {
        noiden: { tenTruong: id.tenTruong, lat: id.lat, lng: id.lng }
      }
    });
  };

  handleChiDuong = () => {
    const google = window.google;
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(
          this.state.placeSearch.lat,
          this.state.placeSearch.lng
        ),
        destination: new google.maps.LatLng(
          this.state.diaDiem.noiden.lat,
          this.state.diaDiem.noiden.lng
        ),
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  onPlacesChanged = () => {
    const places = this.myRef.current.getPlaces();
    this.setState(
      {
        placeSearch: {
          lat: places[0].geometry.location.lat(),
          lng: places[0].geometry.location.lng()
        }
      },
      () => this.handleChiDuong()
    );
  };

  render() {
    const { data, user } = this.state;
    const uLoaiTruong = [
      ...new Set(data.map(i => i.loaiTruong).filter(v => v !== 'undefined'))
    ];
    const ugiayChungNhan = [
      ...new Set(data.map(i => i.giayChungNhan).filter(v => v !== 'undefined'))
    ];
    const uhocPhi = [
      ...new Set(data.map(i => i.hocPhi).filter(v => v !== 'undefined'))
    ];
    const udoTuoiNhan = [
      ...new Set(data.map(i => i.doTuoiNhan).filter(v => v !== 'undefined'))
    ];
    const uthoiGianGiu = [
      ...new Set(data.map(i => i.thoiGianGiu).filter(v => v !== 'undefined'))
    ];

    return (
      <div>
        <Header user={user} logIn={this.logIn} logOut={this.logOut} />

        <Container fluid>
          <Row>
            <Col sm="4" className="sidebar">
              {this.state.showDetail ? (
                this.state.directionClick ? (
                  <div>
                    <div data-standalone-searchbox="">
                      <StandaloneSearchBox
                        onPlacesChanged={this.onPlacesChanged}
                        ref={this.myRef}
                      >
                        <FormGroup>
                          <Label for="noiDi">Nơi đi</Label>
                          <Input
                            type="text"
                            name="noiDi"
                            id="noiDi"
                            placeholder="Nhập nơi đi"
                          />
                        </FormGroup>
                      </StandaloneSearchBox>
                    </div>
                    <FormGroup>
                      <Label for="noiDen">Nơi đến</Label>
                      <Input
                        value={this.state.diaDiem.noiden.tenTruong}
                        type="text"
                        name="noiDen"
                        id="noiDen"
                        disabled
                      />
                    </FormGroup>
                    {/* <Button onClick={this.handleChiDuong}>Chỉ đường</Button> */}
                  </div>
                ) : (
                  <ListDetail
                    marker={this.state.markerClicked}
                    direction={this.handelDirection}
                  />
                )
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
                        if (selected.length !== 0) {
                          this.setState({
                            zoom: 16,
                            center: {
                              lat: selected[0].lat,
                              lng: selected[0].lng
                            }
                          });
                        }
                      }}
                      options={this.state.data}
                      selected={this.state.selected}
                    />
                  </FormGroup>
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
                            center: {
                              lat: selected[0].lat,
                              lng: selected[0].lng
                            }
                          });
                        }
                      }}
                      options={this.state.data}
                      selected={this.state.selected}
                    />
                  </FormGroup>
                  <Button
                    outline
                    onClick={this.toggle}
                    style={{ marginBottom: '1rem' }}
                  >
                    Tìm kiếm theo thuộc tính
                  </Button>
                  <Collapse isOpen={this.state.collapse}>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <Label for="loaiTruong">Loại trường</Label>
                        <Typeahead
                          ref="typeahead1"
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              const newData = data.filter(
                                v => v.loaiTruong === selected[0]
                              );
                              this.setState({
                                data: newData
                              });
                            }
                          }}
                          options={uLoaiTruong}
                          selected={this.state.selected}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="gcn">Giấy chứng nhận</Label>
                        <Typeahead
                          ref="typeahead2"
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              const newData = data.filter(
                                v => v.giayChungNhan === selected[0]
                              );
                              this.setState({
                                data: newData
                              });
                            }
                          }}
                          options={ugiayChungNhan}
                          selected={this.state.selected}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="hp">Học phí</Label>
                        <Typeahead
                          ref="typeahead3"
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              const newData = data.filter(
                                v => v.hocPhi === selected[0]
                              );
                              this.setState({
                                data: newData
                              });
                            }
                          }}
                          options={uhocPhi}
                          selected={this.state.selected}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="dt">Độ tuổi trẻ nhận giữ</Label>
                        <Typeahead
                          ref="typeahead4"
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              const newData = data.filter(
                                v => v.doTuoiNhan === selected[0]
                              );
                              this.setState({
                                data: newData
                              });
                            }
                          }}
                          options={udoTuoiNhan}
                          selected={this.state.selected}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="tg">Thời gian nhận giữ trẻ</Label>
                        <Typeahead
                          ref="typeahead5"
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              const newData = data.filter(
                                v => v.thoiGianGiu === selected[0]
                              );
                              this.setState({
                                data: newData
                              });
                            }
                          }}
                          options={uthoiGianGiu}
                          selected={this.state.selected}
                        />
                      </FormGroup>
                      <Button style={{ marginBottom: 25 }} color="primary">
                        Tìm lại
                      </Button>
                    </Form>
                  </Collapse>
                </div>
              )}
            </Col>

            <Col sm="8" style={{ padding: 0 }}>
              {this.state.directions ? (
                <Directions directions={this.state.directions} />
              ) : (
                <MapComponent
                  zoom={this.state.zoom}
                  center={this.state.center}
                  data={this.state.data}
                  isMarkerShown={this.state.isMarkerShown}
                  onMarkerClick={this.handleMarkerClick}
                  onZoomChanged={this.onZoomChanged}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App2;
