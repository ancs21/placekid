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
import { Button, FormGroup, Label } from "reactstrap";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import { Collapse, Form } from "reactstrap";

import ListDetail from "./ListDetail";

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

import firebase from "./utils/firebase";
const db = firebase.database();

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
    markerClicked: null,

    collapse: false,

    searchAtr: {
      loaiTruong: "",
      giayChungNhan: "",
      thoiGianGiu: "",
      hocPhi: "",
      udoTuoiNhan: ""
    }
  };
  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };
  componentDidMount() {
    db.ref("data").on("value", snapshot => {
      let new_data = [];
      snapshot.forEach(function(childSnapshot) {
        const childData = childSnapshot.val();
        new_data.push(childData);
      });
      // console.log(new_data)
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
  handleSubmit = e => {
    e.preventDefault();
    const { searchAtr, data } = this.state;
    db
      .ref("data")
      .once("value")
      .then(snapshot => {
        let new_data = [];
        snapshot.forEach(function(childSnapshot) {
          const childData = childSnapshot.val();
          new_data.push(childData);
        });
        // console.log(new_data)
        this.setState({
          data: new_data
        });
      })
      .then(() => {
        this.setState({
          data: data.filter(v => {
            if (searchAtr["loaiTruong"] === "") {
              return v;
            } else {
              return v.loaiTruong === this.state.searchAtr["loaiTruong"];
            }
          })
        });
      });
  };
  render() {
    const { data, searchAtr } = this.state;
    const uLoaiTruong = [
      ...new Set(data.map(i => i.loaiTruong).filter(v => v !== "undefined"))
    ];
    const ugiayChungNhan = [
      ...new Set(data.map(i => i.giayChungNhan).filter(v => v !== "undefined"))
    ];
    const uhocPhi = [
      ...new Set(data.map(i => i.hocPhi).filter(v => v !== "undefined"))
    ];
    const udoTuoiNhan = [
      ...new Set(data.map(i => i.doTuoiNhan).filter(v => v !== "undefined"))
    ];
    const uthoiGianGiu = [
      ...new Set(data.map(i => i.thoiGianGiu).filter(v => v !== "undefined"))
    ];
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
                  <Button
                    outline
                    onClick={this.toggle}
                    style={{ marginBottom: "1rem" }}
                  >
                    Tìm kiếm theo thuộc tính
                  </Button>
                  <Collapse isOpen={this.state.collapse}>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup>
                        <Label for="loaiTruong">Loại trường</Label>
                        <Typeahead
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              this.setState(prevState => ({
                                searchAtr: {
                                  ...prevState.searchAtr,
                                  loaiTruong: selected[0]
                                }
                              }));
                            } else {
                              this.setState(prevState => ({
                                searchAtr: {
                                  ...prevState.searchAtr,
                                  loaiTruong: ""
                                }
                              }));
                            }
                          }}
                          options={uLoaiTruong}
                          selected={this.state.selected}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="gcn">Giấy chứng nhận</Label>
                        <Typeahead
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              this.setState(prevState => ({
                                searchAtr: {
                                  ...prevState.searchAtr,
                                  giayChungNhan: selected[0]
                                }
                              }));
                            }
                          }}
                          options={ugiayChungNhan}
                          selected={this.state.selected}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="hp">Học phí</Label>
                        <Typeahead
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              this.setState(prevState => ({
                                searchAtr: {
                                  ...prevState.searchAtr,
                                  hocPhi: selected[0]
                                }
                              }));
                            }
                          }}
                          options={uhocPhi}
                          selected={this.state.selected}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="dt">Độ tuổi trẻ nhận giữ</Label>
                        <Typeahead
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              this.setState(prevState => ({
                                searchAtr: {
                                  ...prevState.searchAtr,
                                  doTuoiNhan: selected[0]
                                }
                              }));
                            }
                          }}
                          options={udoTuoiNhan}
                          selected={this.state.selected}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label for="tg">Thời gian nhận giữ trẻ</Label>
                        <Typeahead
                          paginationText="Xem thêm"
                          emptyLabel="Không có dữ liệu"
                          onChange={selected => {
                            if (selected.length !== 0) {
                              this.setState(prevState => ({
                                searchAtr: {
                                  ...prevState.searchAtr,
                                  thoiGianGiu: selected[0]
                                }
                              }));
                            }
                          }}
                          options={uthoiGianGiu}
                          selected={this.state.selected}
                        />
                      </FormGroup>
                      <Button color="primary">Tìm kiếm</Button>
                    </Form>
                  </Collapse>
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
