import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';
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
  // savedArticles = () => {
  //   console.log("in saved articles");
  //   <Link to="/saved-articles"></Link>
  // }
  render() {
    return (
      (this.props.user) ?
        <div style={{ width: 256 }}>
          <Menu
            theme="dark"
            onClick={this.handleClick}
            defaultSelectedKeys={[]}
            defaultOpenKeys={['sub1', 'sub2']}
            mode="inline"
            inlineCollapsed={this.state.collapsed}
          >
            <SubMenu key="sub1" title={<span><Icon type="home" /><span>RFNi</span></span>}>
              <MenuItemGroup key="g1" title="Articles">
                <Menu.Item key="1"><Link to="/">The Fake News</Link></Menu.Item>
                <Menu.Item key="2">Just Reality</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="user" /><span>User</span></span>}>
              <SubMenu key="sub3" title="Manage Account">
                <Menu.Item key="9"><div style={{ width: "100%" }} onClick={this.props.logout}>Logout</div></Menu.Item>
              </SubMenu>
            </SubMenu>
            <SubMenu key="sub4" title={<span><Icon type="gold" /><span>My Stories to Watch</span></span>}>
              <Menu.Item key="5"><Link to="/saved-articles">Saved Articles</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </div>
        :
        <div style={{ width: 256 }}>
          <Menu
            theme="dark"
            onClick={this.handleClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            inlineCollapsed={this.state.collapsed}
          >
            <SubMenu key="sub1" title={<span><Icon type="home" /><span>RFNi</span></span>}>
              <MenuItemGroup key="g1" title="Articles">
                <Menu.Item key="1">The Fake News</Menu.Item>
                <Menu.Item key="2">Just Reality</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="user" /><span>User</span></span>}>
              <SubMenu key="sub3" title="Manage Account">
                <Menu.Item key="7"><div style={{ width: "100%" }} onClick={this.props.clickDrawer}>Register</div></Menu.Item>
                <Menu.Item key="8"><div style={{ width: "100%" }} onClick={this.props.clickLoginDrawer}>Login</div></Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
        </div>
    );
  }
}

export default Navbar; 