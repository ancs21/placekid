import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Input, Col, FormGroup, Label } from 'reactstrap';
import firebase from '../utils/firebase';
const db = firebase.database();

class ModalForm extends React.Component {
  state = { v: null, update: false, delete: false };

  static getDerivedStateFromProps(nextProps, prevState) {
    // do things with nextProps.someProp and prevState.cachedSomeProp
    return {
      v: nextProps.value
    };
  }

  handleChange = e => {
    const v = this.state.v;
    v[e.target.name] = e.target.value;
    this.setState({
      v
    });
  };

  handleSubmit = e => {
    setTimeout(() => {
      if (this.state.update) {
        this.setState({
          update: !this.state.update
        });
      }
    }, 3000);
    e.preventDefault();
    db
      .ref(`data/${this.state.v.key}`)
      .update(this.state.v)
      .then(result => this.setState({ update: true }))
      .catch(err => console.log(err));
  };

  removeData = () => {
    setTimeout(() => {
      if (this.state.delete) {
        this.setState({
          delete: !this.state.delete
        });
      }
    }, 10000);
    db
      .ref(`data/${this.state.v.key}`)
      .remove()
      .then(() => this.setState({ delete: true }))
      .catch(err => console.log(err));
  };
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
          <ModalHeader toggle={this.toggle}>
            Cập nhật dữ liệu{' '}
            <Button
              color="danger"
              style={{ marginLeft: 50 }}
              onClick={this.removeData}
            >
              Xóa
            </Button>
            {this.state.delete && (
              <div style={{fontSize: '14px'}}>
                Xoá thành công! Lưu ý: Bạn cần tải lại trang mới thấy sự thay
                đổi
              </div>
            )}
          </ModalHeader>
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

              <FormGroup row>
                <Label sm={3}>Latitude</Label>
                <Col sm={9}>
                  <Input
                    value={v.lat}
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
                    value={v.lng}
                    onChange={this.handleChange}
                    type="text"
                    name="lng"
                  />
                </Col>
              </FormGroup>

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
              {this.state.update && <div>Cập nhật thành công</div>}
              <Button color="primary" onClick={this.toggle}>
                Cập nhật
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default ModalForm;
