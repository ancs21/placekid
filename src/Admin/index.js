import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import './index.css';
import firebase from '../utils/firebase';

import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap';

import ModalForm from './ModalForm';

class AdminPage extends React.Component {
  state = {
    data: [],
    modal: false,
    clickValue: {}
  };
  componentWillMount() {
    const db = firebase.database();
    db
      .ref('data')
      .once('value')
      .then(snapshot => {
        let new_data = [];
        snapshot.forEach(childSnapshot => {
          const childData = childSnapshot.val();
          childData['key'] = childSnapshot.key;
          new_data.push(childData);
        });
        // console.log(new_data)
        this.setState({
          data: new_data
        });
      });
  }

  // modal
  toggle = id => {
    // console.log();
    this.setState({
      modal: !this.state.modal,
      clickValue: id
    });
  };
  render() {
    const columns = [
      {
        dataField: 'soThuTu',
        text: 'STT'
      },
      {
        dataField: 'tenTruong',
        text: 'Tên trường'
      },
      {
        dataField: `position.lat`,
        text: 'Latitude'
      },
      {
        dataField: `position.lng`,
        text: 'Longtitude'
      },
      {
        dataField: 'diaChi',
        text: 'Địa chỉ'
      },
      {
        dataField: 'phuong',
        text: 'Phường'
      },

      {
        dataField: 'quan',
        text: 'Quận'
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
        text: 'Web Site'
      },
      {
        dataField: 'loaiTruong',
        text: 'Loại trường'
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
        text: 'Học phí'
      },
      {
        dataField: 'doTuoiNhan',
        text: 'Độ tuổi trẻ nhận giữ'
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
        // console.log(row);
        this.toggle(row);
      }
    };
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
          <NavbarBrand href="/" style={{ color: '#fff' }}>
            {/* <img src={logo} height="59" alt="" /> */}
            Admin Page
          </NavbarBrand>
          <Nav className="ml-auto" style={{ alignItems: 'center' }} navbar>
            <NavItem>
              <NavLink
                href="#"
                style={{
                  color: '#ffffff'
                }}
              >
                Quản lý vị trí
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: '#ffffff' }}>
                Quản lý người dùng
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#" style={{ color: '#ffffff' }}>
                <Button
                  style={{
                    color: '#444',
                    background: '#fff',
                    boxShadow: ` 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
                  }}
                >
                  <img src="#" height="22" alt="" />
                  {'   '}Đăng nhập với Google
                </Button>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
        <Container>
          <Row>
            <Col>
              <BootstrapTable
                classes="table-view"
                keyField="soThuTu"
                data={this.state.data}
                columns={columns}
                pagination={paginationFactory()}
                rowEvents={rowEvents}
              />
            </Col>
          </Row>
        </Container>
        <ModalForm
          modal={this.state.modal}
          toggle={this.toggle}
          value={this.state.clickValue}
        />
      </div>
    );
  }
}
export default AdminPage;
