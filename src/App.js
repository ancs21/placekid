import React from "react";
import logo from "./logo.svg";
import GGIcon from "./ggicon.svg";
import MainMap from './MainMap'

import { Container, Row, Col } from "reactstrap";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

class App extends React.Component {
  state = {};

  render() {
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
          <NavbarBrand href="/" style={{color: '#fff'}}>
            {/* <img src={logo} height="59" alt="" /> */}
            Mầm non cho bé
          </NavbarBrand>
          <Nav className="ml-auto" style={{ alignItems: "center" }} navbar>
            <NavItem>
              <NavLink
                href="#"
                style={{
                  color: "#ffffff",
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
              sm="3"
              style={{
                zIndex: 1,
                paddingTop: 90,
                boxShadow: `0 0 20px rgba(0, 0, 0, 0.3)`
              }}
            >
              <FormGroup>
                <Label for="exampleEmail">Tìm theo phường</Label>
                <Input
                  type="text"
                  name="text"
                  id="phuong"
                  placeholder="Nhập địa chỉ phường"
                />
              </FormGroup>
              <FormGroup>
                <Label for="exampleEmail">Tìm kiếm tên trường</Label>
                <Input
                  type="text"
                  name="text"
                  id="tentruong"
                  placeholder="Nhập tên trường"
                />
              </FormGroup>
            </Col>
            <Col sm="9" style={{ padding: 0 }}>
              <MainMap style={{}} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
