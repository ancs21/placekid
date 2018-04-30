import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import GGIcon from '../ggicon.svg';

import Contact from '../Contact';

class Header extends React.Component {
  state = {
    modal: false
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
  render() {
    const { user, logIn, logOut } = this.props;
    return (
      <Navbar
        fixed="top"
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
          Mầm non cho bé
        </NavbarBrand>
        <Nav className="ml-auto" style={{ alignItems: 'center' }} navbar>
          <NavItem>
            <NavLink
              href="#"
              style={{
                color: '#ffffff'
              }}
            >
              Trang chủ
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#" style={{ color: '#ffffff' }}>
              Hướng dẫn
            </NavLink>
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
          {/* <NavItem>
        <NavLink href="#" style={{ color: '#ffffff' }}>
          {user ? (
            <div>
              <img src={user.photoURL} height="35" alt="" />
              <Button onClick={logOut}>Đăng xuất</Button>
            </div>
          ) : (
            <Button
              onClick={logIn}
              style={{
                color: '#444',
                background: '#fff',
                boxShadow: ` 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
              }}
            >
              <img src={GGIcon} height="22" alt="" />
              {'   '}Đăng nhập với Google
            </Button>
          )}
        </NavLink>
      </NavItem> */}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
