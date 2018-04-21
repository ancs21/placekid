import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';

import './index.css';
import firebase from '../utils/firebase';
import Loading from './loading';

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
          <NavbarBrand href="#" style={{ color: '#fff' }}>
            Admin Page
          </NavbarBrand>
         
        </Navbar>
        <Container>
          <Row>
            <Col>
              {this.state.data.length !== 0 ? (
                <BootstrapTable
                  classes="table-view"
                  keyField="soThuTu"
                  data={this.state.data}
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
