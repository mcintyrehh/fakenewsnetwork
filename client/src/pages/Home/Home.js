import React, { Component } from 'react';
import { Layout } from 'antd';
import Wrapper from '../../components/Wrapper'
import { Row, Col } from 'antd';
import { Card } from '../../components/Card'
import LoginForm from '../../components/Auth/LoginForm';
import SignupForm from '../../components/Auth/SignupForm';
import { Menu, Dropdown, Input, Icon } from 'antd';
import '../../App.css';
import './Home.css'
const { Header, Footer, Content } = Layout;





class Home extends Component {
    
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            redirectTo: null
        };
    }
    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    }
    render() {
        const { userName } = this.state;
        const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <Input
                        placeholder="Enter your username"
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        suffix={suffix}
                        value={userName}
                        onChange={this.onChangeUserName}
                        ref={node => this.userNameInput = node}
                    />
                </Menu.Item>
                <Menu.Item key="1">
                    <a href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="3">3rd menu item</Menu.Item>
            </Menu>
        );
        return (
            <Wrapper>
                <Layout>
                    <Header style={{ textAlign: 'right' }}>
                        <Row className="logo">
                            <Col span={8}></Col>
                            <Col className="title" span={8}>🕵️‍Fake News Network🕵️️</Col>
                            <Col span={8}>

                                <Menu
                                    className="menu-bar"
                                    theme="dark"
                                    mode="horizontal"
                                    // defaultSelectedKeys={['2']}
                                    style={{ lineHeight: '64px' }}>
                                    <Menu.Item key="1">Sign Up</Menu.Item>
                                    <Menu.Item key="2">
                                        <Dropdown overlay={menu} trigger={['click']}>
                                            <a className="ant-dropdown-link" href="#">
                                                Login <Icon type="user" />
                                            </a>
                                        </Dropdown>
                                    </Menu.Item>
                                    <Menu.Item key="3">Log Out</Menu.Item>
                                </Menu>
                            </Col>
                        </Row>


                    </Header>
                    <Content className="main">
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                            <Col span={8}></Col>
                            <Col span={8}>
                                <Card></Card>
                                <Card></Card>
                                <Card></Card>
                                <Card></Card>
                                <Card></Card>

                            </Col>
                            <Col span={8}><SignupForm></SignupForm></Col>
                        </Row>

                    </Content>
                    <Footer className="footer">a Team 2 Production</Footer>
                </Layout>
            </Wrapper>
        )
    }
}

export default Home;