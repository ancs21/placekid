import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, Input, Col, FormGroup, Label } from 'reactstrap';
import AddSchoolAnonymous from '../AddSchoolAnonymous';
import firebase from '../utils/firebase';
const db = firebase.database();

class Contact extends React.Component {
  state = {
    value: {
      email: '',
      tieude: '',
      noidung: ''
    },
    send: false,
    modalAdd: false
  };
  toggleAdd = () => {
    this.setState({
      modalAdd: !this.state.modalAdd
    });
  };
  handleChange = e => {
    const value = this.state.value;
    value[e.target.name] = e.target.value;
    this.setState({
      value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      send: !this.state.send
    });
    db
      .ref('contact')
      .push(this.state.value)
      .then(result => {
        setTimeout(() => {
          if (this.state.send) {
            this.setState({
              send: !this.state.send
            });
          }
        }, 3000);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.toggle}
        className={this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Liên hệ</ModalHeader>
        <Form onSubmit={this.handleSubmit}>
          <ModalBody>
            <FormGroup row>
              <Label sm={3}>Email</Label>
              <Col sm={9}>
                <Input
                  value={this.state.value.email}
                  onChange={this.handleChange}
                  type="text"
                  name="email"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label sm={3}>Tiêu đề</Label>
              <Col sm={9}>
                <Input
                  value={this.state.value.tieude}
                  onChange={this.handleChange}
                  type="text"
                  name="tieude"
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label sm={3}>Nội dung</Label>
              <Col sm={9}>
                <Input
                  value={this.state.value.noidung}
                  onChange={this.handleChange}
                  type="textarea"
                  name="noidung"
                />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={this.toggleAdd}
            >
              Thêm trường mới
            </Button>
            <AddSchoolAnonymous
              modal={this.state.modalAdd}
              toggle={this.toggleAdd}
            />
            {this.state.send && <div>Gửi thành công</div>}
            <Button color="primary">Gửi yêu cầu</Button>{' '}
          </ModalFooter>
        </Form>
      </Modal>
    );
  }
}

export default Contact;
