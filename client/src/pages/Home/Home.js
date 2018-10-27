import React, { Component } from 'react';
import { Layout } from 'antd';
import Wrapper from '../../components/Wrapper';
import { Row, Col } from 'antd';
import { Card } from '../../components/Card';
import LoginForm from '../../components/Auth/LoginForm';
import SignupForm from '../../components/Auth/SignupForm';
import { Menu, Dropdown, Input, Icon } from 'antd';
import Toggle from '../../components/Toggle'
import '../../App.css';
import './Home.css';
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
        return (

            <Wrapper>
                <Layout>
                    <Header style={{ textAlign: 'right' }}>
                        <Row className="logo">
                            <Col span={8}></Col>
                            <Col className="title" span={8}><span role="img" aria-label="investigator emoji">🕵️‍</span>Fake News Network<span role="img" aria-label="investigator emoji">🕵️️</span></Col>
                            <Col span={8}>
                                <Row>
                                    <Menu
                                        className="menu-bar"
                                        theme="dark"
                                        mode="horizontal"
                                        // defaultSelectedKeys={['2']}
                                        style={{ lineHeight: '64px' }}>
                                        <Menu.Item key="1">Sign Up</Menu.Item>
                                        <Menu.Item key="2">Sign In</Menu.Item>
                                        <Menu.Item key="3">Log Out</Menu.Item>
                                    </Menu>
                                </Row>
                            </Col>
                        </Row>
                    </Header>
                    <Content className="main">
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                        <Col span={8}><LoginForm></LoginForm></Col>
                            <Col span={8}>
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