import React, { Component } from 'react';
import { Table, Container, Row, Col } from 'reactstrap';
import './index.css';
import Loading from './loading';
import firebase from '../utils/firebase';
const db = firebase.database();

class LienHe extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    db.ref('contact').on('value', snapshot => {
      let new_data = [];
      snapshot.forEach(childSnapshot => {
        const childData = childSnapshot.val();
        new_data.push(childData);
      });
      this.setState({
        data: new_data
      });
    });
  }
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>
              {this.state.data.length !== 0 ? (
                <Table striped className="table-view" style={{display: 'table'}}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Email</th>
                      <th>Tiêu đề</th>
                      <th>Nội dung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.data.map((v, i) => (
                      <tr key={i}>
                        <th scope="row">{i}</th>
                        <td>{v.email}</td>
                        <td>{v.tieude}</td>
                        <td>{v.noidung}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Loading />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LienHe;
