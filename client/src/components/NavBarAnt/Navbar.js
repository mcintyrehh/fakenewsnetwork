import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false
    }
  }

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  }

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      (this.props.user) ?
        <div style={{ width: 256 }}>
          <Menu
            theme="dark"
            onClick={this.handleClick}
            // style={{ width: 256 }}
            defaultSelectedKeys={[]}
            defaultOpenKeys={['sub1', 'sub2']}
            mode="inline"
            inlineCollapsed={this.state.collapsed}
          >
          {
            (this.props.collapsed) ?
              <div style={{ textAlign: "center" }} className="logo">Menu</div>
            : <div style={{ textAlign: "center" }} className="logo"> Hello {this.props.user.firstName}</div>
          }

            <SubMenu key="sub1" title={<span><Icon type="home" /><span>FNN</span></span>}>
              <MenuItemGroup key="g1" title="Articles">
                <Menu.Item key="1">The Fake News</Menu.Item>
                <Menu.Item key="2">Just Reality</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="user" /><span>User</span></span>}>
              <SubMenu key="sub3" title={<span><Icon type="gold" /><span>My Stories To Watch</span></span>}>
                <Menu.Item key="5">Saved Fake Articles</Menu.Item>
                <Menu.Item key="6">Saved Real Articles</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title="Manage Account">
                <Menu.Item key="9"><div style={{ width: "100%" }} onClick={this.props.logout}>Logout</div></Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
        :
        <div style={{ width: 256 }}>
          <Menu
            theme="dark"
            onClick={this.handleClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={this.state.collapsed}
          >
          
          {
            (this.props.collapsed) ?
              <div style={{ textAlign: "center" }} className="logo">Menu</div>
            : <div style={{ textAlign: "center" }} className="logo">Real Fake News</div>
          }

            <SubMenu key="sub1" title={<span><Icon type="home" /><span>FNN</span></span>}>
              <MenuItemGroup key="g1" title="Articles">
                <Menu.Item key="1">The Fake News</Menu.Item>
                <Menu.Item key="2">Just Reality</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="user" /><span>User</span></span>}>
              <SubMenu key="sub3" title={<span><Icon type="gold" /><span>My Stories To Watch</span></span>}>
                <Menu.Item key="5">Saved Fake Articles</Menu.Item>
                <Menu.Item key="6">Saved Real Articles</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title="Manage Account">
                <Menu.Item key="7"><div style={{ width: "100%" }} onClick={this.props.clickDrawer}>Register</div></Menu.Item>
                <Menu.Item key="8"><div style={{ width: "100%" }} onClick={this.props.clickLoginDrawer}>Login</div></Menu.Item>
                <Menu.Item key="9"><div style={{ width: "100%" }} onClick={this.props.logout}>Logout</div></Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
    );
  }
}

export default Navbar; 