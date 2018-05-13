import React from 'react';
import { compose, withProps } from 'recompose';
import StandaloneSearchBox from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import Directions from './directions';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { Container, Row, Col } from 'reactstrap';
import { Button, FormGroup, Label } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import { Collapse, Form, Input } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

// icons
import iconMarker16 from './icons/icon_marker16.png';
import iconMarker24 from './icons/icon_marker24.png';
import iconMarker48 from './icons/icon_marker48.png';
import Gps from './icons/gps.svg';
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
    ref={props.zoomRef}
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
            icon={props.icon}
          />
        ))}
      </div>
    )}
  </GoogleMap>
));

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      showDetail: false,
      data: [],
      isMarkerShown: true,
      zoom: 14,
      onCenterChanged: {},
      center: { lat: 10.779739, lng: 106.678926 },
      markerClicked: null,
      collapse: false,

      user: null,
      directionClick: null,
      directions: null,
      diaDiem: null,
      placeSearch: null,
      icon: {
        url: iconMarker24
      },

      quanSelect: ''
    };
    this.myRef = React.createRef();
    this.myRef2 = React.createRef();
    this.zoomRef = React.createRef();
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
    const zoomNum = this.zoomRef.current.getZoom();
    console.log(zoomNum);
    if (zoomNum < 13 && zoomNum >= 11) {
      this.setState({
        icon: iconMarker16,
        isMarkerShown: true
      });
    } else if (zoomNum < 11) {
      this.setState({
        isMarkerShown: false
      });
    } else {
      this.setState({
        zoom: 17,
        center: { lat: 10.7882937, lng: 106.6946765 },
        icon: iconMarker24,
        isMarkerShown: true
      });
    }
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
        travelMode: google.maps.TravelMode.DRIVING,
        language: 'vi'
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
          // console.log(this.state.directions.routes[0].legs[0]);
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

  onPlacesChanged2 = () => {
    const places = this.myRef2.current.getPlaces();
    this.setState(
      {
        placeSearch: {
          lat: places[0].geometry.location.lat(),
          lng: places[0].geometry.location.lng()
        }
      },
      () => {
        this.setState({
          zoom: 15,
          center: {
            lat: this.state.placeSearch.lat,
            lng: this.state.placeSearch.lng
          }
        });
      }
    );
  };

  handleGps2 = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === 'OK') {
            if (results[0]) {
              document.getElementById('vitri').value =
                results[0].formatted_address;
              // console.log(results[0].formatted_address);
            } else {
              console.log('No results found');
            }
          } else {
            console.log('Geocoder failed due to: ' + status);
          }
        });
        this.setState(
          {
            placeSearch: {
              lat: pos.lat,
              lng: pos.lng
            }
          },
          () => {
            this.setState({
              zoom: 15,
              center: {
                lat: this.state.placeSearch.lat,
                lng: this.state.placeSearch.lng
              }
            });
          }
        );
      });
    } else {
      console.log("Browser doesn't support Geolocation");
    }
  };

  handleGps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location: pos }, (results, status) => {
            if (status === 'OK') {
              if (results[0]) {
                document.getElementById('noiDi').value =
                  results[0].formatted_address;
                // console.log(results[0].formatted_address);
              } else {
                console.log('No results found');
              }
            } else {
              console.log('Geocoder failed due to: ' + status);
            }
          });
          this.setState(
            {
              placeSearch: {
                lat: pos.lat,
                lng: pos.lng
              }
            },
            () => {
              this.handleChiDuong();
            }
          );
        },
        () => {
          console.log('err gps location');
        }
      );
    } else {
      console.log("Browser doesn't support Geolocation");
    }
  };
  render() {
    const { data, user } = this.state;
    // const route = this.state.directions.routes[0].legs[0];

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

    // quan
    // const uQuan = [...new Set(data.map(i => i.quan))];
    const dataQuanSelect = data.filter(
      (v, i) => v.quan === this.state.quanSelect
    );
    function unique(array, propertyName) {
      return array.filter(
        (e, i) =>
          array.findIndex(a => a[propertyName] === e[propertyName]) === i
      );
    }
    const uniqueQuan = unique(data, 'quan');

    return (
      <div>
        <Header user={user} logIn={this.logIn} logOut={this.logOut} />

        <Container fluid>
          <Row>
            <Col sm="4" className="sidebar">
              {this.state.showDetail ? (
                this.state.directionClick ? (
                  <div>
                    <div data-standalone-searchbox="hello">
                      <StandaloneSearchBox
                        onPlacesChanged={this.onPlacesChanged}
                        ref={this.myRef}
                      >
                        <FormGroup>
                          <Label for="noiDi">Nơi đi</Label>
                          <div style={{ position: 'relative' }}>
                            <Input
                              type="text"
                              name="noiDi"
                              id="noiDi"
                              placeholder="Nhập nơi đi"
                            />
                            <img
                              onClick={this.handleGps}
                              style={{
                                width: 24,
                                height: 24,
                                position: 'absolute',
                                top: '15%',
                                right: '10px',
                                cursor: 'pointer'
                              }}
                              src={Gps}
                              alt=""
                            />
                          </div>
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
                    {this.state.directions && (
                      <div>
                        <ListGroupItem color="success">
                          Khoảng cách:{' '}
                          {
                            this.state.directions.routes[0].legs[0].distance
                              .text
                          }, Thời gian di chuyển:{' '}
                          {
                            this.state.directions.routes[0].legs[0].duration
                              .text
                          }
                        </ListGroupItem>
                        <ListGroup style={{ marginBottom: 30, marginTop: 30 }}>
                          {this.state.directions.routes[0].legs[0].steps.map(
                            (value, i) => (
                              <ListGroupItem
                                key={i}
                                dangerouslySetInnerHTML={{
                                  __html: value.instructions
                                }}
                              />
                            )
                          )}
                        </ListGroup>
                      </div>
                    )}
                  </div>
                ) : (
                  <ListDetail
                    marker={this.state.markerClicked}
                    direction={this.handelDirection}
                  />
                )
              ) : (
                <div>
                  <div data-standalone-searchbox="hola">
                    <StandaloneSearchBox
                      onPlacesChanged={this.onPlacesChanged2}
                      ref={this.myRef2}
                    >
                      <FormGroup>
                        <Label for="vitri">Tìm theo vị trí</Label>
                        <div style={{ position: 'relative' }}>
                          <Input
                            type="text"
                            name="vitri"
                            id="vitri"
                            placeholder="Nhập vị trí"
                          />
                          <img
                            onClick={this.handleGps2}
                            style={{
                              width: 24,
                              height: 24,
                              position: 'absolute',
                              top: '15%',
                              right: '10px',
                              cursor: 'pointer'
                            }}
                            src={Gps}
                            alt=""
                          />
                        </div>
                      </FormGroup>
                    </StandaloneSearchBox>
                  </div>

                  <FormGroup>
                    <Label for="phuong">Tìm theo Quận</Label>
                    <Typeahead
                      labelKey="quan"
                      placeholder="Nhập quận"
                      paginationText="Xem thêm"
                      emptyLabel="Không có dữ liệu"
                      onChange={selected => {
                        this.setState({
                          quanSelect: ''
                        });
                        if (selected.length !== 0) {
                          this.setState({
                            zoom: 15,
                            center: {
                              lat: selected[0].lat,
                              lng: selected[0].lng
                            },
                            quanSelect: selected[0].quan
                          });
                        } else {
                          this.setState({
                            quanSelect: ''
                          });
                        }
                      }}
                      options={uniqueQuan}
                      selected={this.state.selected}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label for="phuong">Tìm theo Phường</Label>
                    <Typeahead
                      labelKey="phuong"
                      placeholder="Nhập phường"
                      paginationText="Xem thêm"
                      emptyLabel="Không có dữ liệu"
                      onChange={selected => {
                        if (selected.length !== 0) {
                          this.setState({
                            zoom: 17,
                            center: {
                              lat: selected[0].lat,
                              lng: selected[0].lng
                            }
                          });
                        }
                      }}
                      options={unique(dataQuanSelect, 'phuong')}
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
                            },
                            icon: {
                              url: iconMarker48
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
                  zoomRef={this.zoomRef}
                  zoom={this.state.zoom}
                  center={this.state.center}
                  data={this.state.data}
                  isMarkerShown={this.state.isMarkerShown}
                  onMarkerClick={this.handleMarkerClick}
                  onZoomChanged={this.onZoomChanged}
                  icon={this.state.icon}
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
