import React, { Component } from 'react';
import { Layout } from 'antd';
import Wrapper from '../../components/Wrapper';
import { Row, Col } from 'antd';
import { Card, RealCard } from '../../components/Card';
import LoginForm from '../../components/Auth/LoginForm';
import SignupForm from '../../components/Auth/SignupForm';
import { Menu } from 'antd';
// import Toggle from '../../components/Toggle'
import '../../App.css';
import './Home.css';
import fakefake from '../../fakefake.json';
const { Header, Footer, Content } = Layout;
const fakeJSON = fakefake;

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
            redirectTo: null,
            outerColWidth: 8,
            innerColWidth: 8,
            realNews: []
        };
    }
    displayRealNews = (article) => {
        const emptyNewsArray = []
        this.setState({ outerColWidth: 2 });
        this.setState({ innerColWidth: 10 });
        const realNewsVar = article.associatedRealNews;
        console.log("whole realNews obj");
        console.log(realNewsVar);
        console.log("real news");
        realNewsVar.map(x=> console.log(x));
        console.log("fake News");
        fakeJSON.map(fake =>console.log(fake));
        realNewsVar.map(x=>emptyNewsArray.push(x))
        this.setState({ realNews: emptyNewsArray });
    }
    onChangeUserName = (e) => {
        this.setState({ userName: e.target.value });
    }
    render() {
        console.log(this.state)
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
                        {/* Here is where the main content will be displayed
                        it is comprised of four columns with variable width, depending on which view we want set*/}
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                            
                            <Col span={this.state.outerColWidth}>{!this.props.isLoggedIn && <LoginForm login={this.props.login}></LoginForm>}</Col>

                            <Col span={this.state.innerColWidth}>
                                {fakeJSON.map(fake => <Card fake={fake} key={fake.id} displayRealNews={this.displayRealNews} />)}
                            </Col>

                            <Col span={this.state.innerColWidth}>{this.state.realNews && this.state.realNews.map(real=> <RealCard real={real} key={real.id}></RealCard>)}</Col>
                            <Col span={this.state.outerColWidth}>{!this.props.isLoggedIn && <SignupForm></SignupForm>}</Col>
                        </Row>
                    </Content>
                    <Footer className="footer">a Team 2 Production</Footer>
                </Layout>
            </Wrapper>

        )
    }
}

export default Home;