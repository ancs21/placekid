import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import Contact from './Contact';
import HuongDan from './HuongDan';
class Header extends React.Component {
  state = {
    modal: false,
    modalHD: false
  };

  showContact = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };
  showHD = () => {
    this.setState({
      modalHD: !this.state.modalHD
    });
  };
  toggleHD = () => {
    this.setState({
      modalHD: !this.state.modalHD
    });
  };

  render() {
    return (
      <Navbar
        fixed="top"
        style={{
          background: '#2506A0',
          height: 64,
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 2px 5px, rgba(0, 0, 0, 0.2) 0px 1px 2px'
        }}
        light
        expand="md"
      >
        <NavbarBrand href="/" style={{ color: '#fff' }}>
          {/* <img src={logo} height="59" alt="" /> */}
          Mầm non cho bé
        </NavbarBrand>
        <Nav className="ml-auto" style={{ alignItems: 'center' }} navbar>
          <NavItem>
            <NavLink
              href="/"
              style={{
                color: '#ffffff'
              }}
            >
              Trang chủ
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              onClick={this.showHD}
              style={{ color: '#ffffff' }}
            >
              Hướng dẫn
            </NavLink>
            <HuongDan modalHD={this.state.modalHD} toggleHD={this.toggleHD} />
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              onClick={this.showContact}
              style={{ color: '#ffffff' }}
            >
              Liên hệ
            </NavLink>
            <Contact modal={this.state.modal} toggle={this.toggle} />
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
