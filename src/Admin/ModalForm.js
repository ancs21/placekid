import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Input, Col, FormGroup, Label } from 'reactstrap';
import firebase from '../utils/firebase';
const db = firebase.database();

class ModalForm extends React.Component {
  state = { v: null, update: false };

  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    return {
      v: nextProps.value,
    };
  }

  handleChange = e => {
    let data = {
      chuongTrinhGiangDay: e.target.value,
      coSoVatChat: e.target.value,
      diaChi: e.target.value,
      diaChiKhuVuc: e.target.value,
      doTuoiNhan: e.target.value,
      fullAddressByGoogle: e.target.value,
      fullAddressByHand: e.target.value,
      giayChungNhan: e.target.value,
      hinhAnh: e.target.value,
      hocPhi: e.target.value,
      key: '-LAI9iq8Bvdm26ekN_bT',
      khac: e.target.value,
      loaiTruong: e.target.value,
      nhanLuc: e.target.value,
      phone: e.target.value,
      phuong: e.target.value,
      position: {
        lat: e.target.value,
        lng: e.target.value
      },
      quan: e.target.value,
      soThuTu: e.target.value,
      tenTruong: e.target.value,
      thanhPho: e.target.value,
      thoiGianGiu: e.target.value,
      website: e.target.value
    };
    const v = this.state.v;
    v[e.target.name] = e.target.value;
    this.setState({
      v
    });
  };

  handleChange1 = (e) => {
    let lat = e.target.value
    let poslat = this.state.v.position;
    poslat['lat'] = e.target.value
    console.log(poslat)
    this.setState({

    })
  }

  handleSubmit = (e) => {
    // console.log(this.state.v.key)
    e.preventDefault();
    db.ref(`data/${this.state.v.key}`).update(this.state.v)
    .then(result => this.setState({update: true}))
    .catch(err => console.log(err))
  }
  render() {
    const { modal, toggle, value, className } = this.props;
    const { v } = this.state;
    return (
      <div>
        <Modal
          size="lg"
          isOpen={modal}
          toggle={toggle}
          value={value}
          className={className}
        >
          <ModalHeader toggle={this.toggle}>Cập nhật dữ liệu</ModalHeader>
          <Form onSubmit={this.handleSubmit}>
          <ModalBody>
           
              <FormGroup row>
                <Label sm={3}>Tên trường</Label>
                <Col sm={9}>
                  <Input
                    value={v.tenTruong}
                    onChange={this.handleChange}
                    type="text"
                    name="tenTruong"
                  />
                </Col>
              </FormGroup>

              {/* <FormGroup row>
                <Label sm={3}>Latitude</Label>
                <Col sm={9}>
                  <Input
                    value=""
                    onChange={this.handleChange1}
                    type="text"
                    name="lat"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Longtitude</Label>
                <Col sm={9}>
                  <Input
                    value={v.position}
                    onChange={this.handleChange}
                    type="text"
                    name="lng"
                  />
                </Col>
              </FormGroup> */}

              <FormGroup row>
                <Label sm={3}>Địa chỉ</Label>
                <Col sm={9}>
                  <Input
                    value={v.diaChi}
                    onChange={this.handleChange}
                    type="text"
                    name="diaChi"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Phường</Label>
                <Col sm={9}>
                  <Input
                    value={v.phuong}
                    onChange={this.handleChange}
                    type="text"
                    name="phuong"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Quận</Label>
                <Col sm={9}>
                  <Input
                    value={v.quan}
                    onChange={this.handleChange}
                    type="text"
                    name="quan"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Thành Phố</Label>
                <Col sm={9}>
                  <Input
                    value={v.thanhPho}
                    onChange={this.handleChange}
                    type="text"
                    name="thanhPho"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>SĐT</Label>
                <Col sm={9}>
                  <Input
                    value={v.phone}
                    onChange={this.handleChange}
                    type="text"
                    name="phone"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Web Site</Label>
                <Col sm={9}>
                  <Input
                    value={v.website}
                    onChange={this.handleChange}
                    type="text"
                    name="website"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Loại trường </Label>
                <Col sm={9}>
                  <Input
                    value={v.loaiTruong}
                    onChange={this.handleChange}
                    type="text"
                    name="loaiTruong"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Giấy chứng nhận </Label>
                <Col sm={9}>
                  <Input
                    value={v.giayChungNhan}
                    onChange={this.handleChange}
                    type="text"
                    name="giayChungNhan"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Cơ sở vật chất </Label>
                <Col sm={9}>
                  <Input
                    value={v.coSoVatChat}
                    onChange={this.handleChange}
                    type="text"
                    name="coSoVatChat"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Nhân lực </Label>
                <Col sm={9}>
                  <Input
                    value={v.nhanLuc}
                    onChange={this.handleChange}
                    type="text"
                    name="nhanLuc"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Chương trình dạy </Label>
                <Col sm={9}>
                  <Input
                    value={v.chuongTrinhGiangDay}
                    onChange={this.handleChange}
                    type="text"
                    name="chuongTrinhGiangDay"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Học phí </Label>
                <Col sm={9}>
                  <Input
                    value={v.hocPhi}
                    onChange={this.handleChange}
                    type="text"
                    name="hocPhi"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Độ tuổi trẻ nhận giữ </Label>
                <Col sm={9}>
                  <Input
                    value={v.doTuoiNhan}
                    onChange={this.handleChange}
                    type="text"
                    name="doTuoiNhan"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Thời gian nhận giữ trẻ </Label>
                <Col sm={9}>
                  <Input
                    value={v.thoiGianGiu}
                    onChange={this.handleChange}
                    type="text"
                    name="thoiGianGiu"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Khác</Label>
                <Col sm={9}>
                  <Input
                    value={v.khac}
                    onChange={this.handleChange}
                    type="text"
                    name="khac"
                  />
                </Col>
              </FormGroup>
            
          </ModalBody>
          <ModalFooter>
            {(this.state.update && this.props.modal) && <div>Cập nhật thành công</div> }
            <Button color="primary" onClick={this.toggle}>
              Submit
            </Button>
          </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
