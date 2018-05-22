import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Input, Col, FormGroup, Label } from 'reactstrap';
import firebase from './utils/firebase';
const db = firebase.database();

class AddSchoolAnonymous extends React.Component {
  state = { v: {}, update: false };

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
      .ref('dataAny')
      .push(this.state.v)
      .then(result => this.setState({ update: true }))
      .catch(err => console.log(err));
  };

  render() {
    const { modal, toggle } = this.props;
    return (
      <div>
        <Modal size="lg" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={this.toggle}>Thêm trường mới</ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <FormGroup row>
                <Label sm={3}>Tên trường</Label>
                <Col sm={9}>
                  <Input
                    onChange={this.handleChange}
                    type="text"
                    name="tenTruong"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Latitude</Label>
                <Col sm={9}>
                  <Input onChange={this.handleChange1} type="text" name="lat" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Longtitude</Label>
                <Col sm={9}>
                  <Input onChange={this.handleChange} type="text" name="lng" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Địa chỉ</Label>
                <Col sm={9}>
                  <Input
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
                    onChange={this.handleChange}
                    type="text"
                    name="phuong"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Quận</Label>
                <Col sm={9}>
                  <Input onChange={this.handleChange} type="text" name="quan" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Thành Phố</Label>
                <Col sm={9}>
                  <Input
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
                    onChange={this.handleChange}
                    type="text"
                    name="thoiGianGiu"
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>Khác</Label>
                <Col sm={9}>
                  <Input onChange={this.handleChange} type="text" name="khac" />
                </Col>
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              {this.state.update && <div>Thêm mới thành công</div>}
              <Button color="primary" onClick={this.toggle}>
                Gửi
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default AddSchoolAnonymous;
