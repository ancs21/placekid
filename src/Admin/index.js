import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import './index.css';
import firebase from '../utils/firebase';
import Loading from './loading';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import { Container, Row, Col, Button } from 'reactstrap';

import ModalForm from './ModalForm';
import AddLocation from './AddLocation';

import GGIcon from '../ggicon.svg';

import LienHe from './LienHe';

class AdminPage extends React.Component {
  state = {
    user: null,
    data: [],
    dataAny: [],
    modal: false,
    clickValue: {},
    linkpage: 'vitri'
  };
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
    const db = firebase.database();
    // data from user anynomous
    db
      .ref('dataAny')
      .once('value')
      .then(snapshot => {
        let new_data = [];
        snapshot.forEach(childSnapshot => {
          const childData = childSnapshot.val();
          childData['key'] = childSnapshot.key;
          new_data.push(childData);
        });
        this.setState({
          dataAny: new_data
        });
      });

    db.ref('data').on('value', snapshot => {
      let new_data = [];
      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();
        childData['key'] = childSnapshot.key;
        new_data.push(childData);
      });
      this.setState({
        data: new_data
      });
    });
  }
  handleLH = () => {
    this.setState({
      linkpage: 'lienhe'
    });
  };
  handleVT = () => {
    this.setState({
      linkpage: 'vitri'
    });
  };
  handleUserAny = () => {
    this.setState({
      linkpage: 'nguoidung'
    });
  };
  // modal
  toggle = id => {
    // console.log();
    this.setState({
      modal: !this.state.modal,
      clickValue: id
    });
  };

  toggleAdd = () => {
    // console.log();
    this.setState({
      modalAdd: !this.state.modalAdd
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

  render() {
    const columns = [
      {
        dataField: 'soThuTu',
        text: 'STT',
        sort: true
      },
      {
        dataField: 'tenTruong',
        text: 'Tên trường',
        sort: true,
        filter: textFilter({
          placeholder: 'tìm tên trường',
          style: { fontSize: '13px' }
        })
      },
      {
        dataField: 'lat',
        text: 'Latitude',
        sort: true
      },
      {
        dataField: 'lng',
        text: 'Longtitude',
        sort: true
      },
      {
        dataField: 'diaChi',
        text: 'Địa chỉ',
        sort: true,
        filter: textFilter({
          placeholder: 'tìm địa chỉ',
          style: { fontSize: '13px' }
        })
      },
      {
        dataField: 'phuong',
        text: 'Phường',
        sort: true
      },
      {
        dataField: 'quan',
        text: 'Quận',
        sort: true
      },
      {
        dataField: 'thanhPho',
        text: 'Thành Phố'
      },
      {
        dataField: 'phone',
        text: 'SĐT'
      },
      {
        dataField: 'website',
        text: 'WebSite'
      },
      {
        dataField: 'loaiTruong',
        text: 'Loại trường',
        sort: true
      },
      {
        dataField: 'giayChungNhan',
        text: 'Giấy chứng nhận'
      },
      {
        dataField: 'cosSoVatChat',
        text: 'Cơ sở vật chất'
      },
      {
        dataField: 'nhanLuc',
        text: 'Nhân lực'
      },
      {
        dataField: 'chuongTrinhGiangDay',
        text: 'Chương trình dạy'
      },
      {
        dataField: 'hocPhi',
        text: 'Học phí',
        sort: true
      },
      {
        dataField: 'doTuoiNhan',
        text: 'Độ tuổi trẻ nhận giữ',
        sort: true
      },
      {
        dataField: 'thoiGianGiu',
        text: 'Thời gian nhận giữ trẻ'
      },
      {
        dataField: 'khac',
        text: 'Khác'
      }
    ];
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.toggle(row);
      }
    };
    // check admin
    const admin = this.state.user;
    return (
      <div style={{ background: '#f5f7fb', height: '100vh' }}>
        <Navbar
          style={{
            background: '#3F3E3A',
            height: 64,
            boxShadow: `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`
          }}
          light
          expand="md"
        >
          <NavbarBrand href="/admin" style={{ color: '#fff' }}>
            Admin Page
          </NavbarBrand>
          <Nav className="ml-auto" style={{ alignItems: 'center' }} navbar>
            <NavItem>
              <NavLink
                onClick={this.handleVT}
                href="#"
                style={{
                  color: '#ffffff'
                }}
              >
                Quản lý vị trí
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#"
                onClick={this.handleLH}
                style={{ color: '#ffffff' }}
              >
                Quản lý liên hệ
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                href="#"
                onClick={this.handleUserAny}
                style={{ color: '#ffffff' }}
              >
                Quản lý trường thêm bởi người dùng
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="#" style={{ color: '#ffffff' }}>
                {admin && (
                  <div>
                    <img src={this.state.user.photoURL} height="35" alt="" />
                    <Button onClick={this.logOut}>Đăng xuất</Button>
                  </div>
                )}
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        {admin ? (
          (() => {
            switch (this.state.linkpage) {
              case 'vitri':
                return (
                  <div>
                    <Container>
                      <Row>
                        <Col>
                          {this.state.data.length !== 0 ? (
                            <div>
                              <Button
                                style={{ marginTop: 20 }}
                                onClick={this.toggleAdd}
                              >
                                Thêm trường
                              </Button>
                              <BootstrapTable
                                classes="table-view"
                                keyField="soThuTu"
                                data={this.state.data}
                                columns={columns}
                                pagination={paginationFactory()}
                                rowEvents={rowEvents}
                                filter={filterFactory()}
                              />
                            </div>
                          ) : (
                            <Loading />
                          )}
                        </Col>
                      </Row>
                    </Container>

                    <ModalForm
                      modal={this.state.modal}
                      toggle={this.toggle}
                      value={this.state.clickValue}
                    />
                    <AddLocation
                      modal={this.state.modalAdd}
                      toggle={this.toggleAdd}
                    />
                  </div>
                );
              case 'nguoidung':
                return (<div>
                  <Container>
                    <Row>
                      <Col>
                        {this.state.data.length !== 0 ? (      
                            <BootstrapTable
                              classes="table-view"
                              keyField="soThuTu"
                              data={this.state.dataAny}
                              columns={columns}
                              pagination={paginationFactory()}
                              rowEvents={rowEvents}
                              filter={filterFactory()}
                            />
                        ) : (
                          <Loading />
                        )}
                      </Col>
                    </Row>
                  </Container>
                </div>)
              case 'lienhe':
                return <LienHe />
              default:
                return null;
            }
          })()
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Button
              onClick={this.logIn}
              style={{
                color: '#444',
                background: '#fff',
                boxShadow: ` 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
              }}
            >
              <img src={GGIcon} height="22" alt="" />
              {'   '}Đăng nhập với Google
            </Button>
          </div>
        )}

        
      </div>
    );
  }
}
export default AdminPage;
