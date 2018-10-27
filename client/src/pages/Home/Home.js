import React, { Component } from 'react';
import { Layout } from 'antd';
import Wrapper from '../../components/Wrapper'
import { Row, Col } from 'antd';
import {Card} from '../../components/Card'
import { Button, Menu, SubMenu } from 'antd';
import '../../App.css';
import './Home.css'
const { Header, Footer, Content } = Layout;



class Home extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            redirectTo: null
        };
    }

    render() {
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
                                    defaultSelectedKeys={['2']}
                                    style={{ lineHeight: '64px' }}>
                                    <Menu.Item key="1">Sign Up</Menu.Item>
                                    <Menu.Item key="2">Login</Menu.Item>
                                    <Menu.Item key="3">Log Out</Menu.Item>
                                </Menu>
                            </Col>
                        </Row>


                    </Header>
                    <Content className="main">
                        <Row style={{textAlign: 'center', color: 'white'}}>
                            <Col span={8}></Col>
                            <Col span={8}>
                                <Card></Card>
                            </Col>
                            <Col span={8}></Col>
                        </Row>
                        
                    </Content>
                    <Footer className="footer">a Team 2 Production</Footer>
                </Layout>
            </Wrapper>
        )
    }
}

export default Home;