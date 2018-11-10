import React, { Component } from 'react';
import { Layout } from 'antd';
import Wrapper from '../../components/Wrapper';
import { Row, Col } from 'antd';
import  Card from '../../components/Card';
import { RealCard } from '../../components/Card';
import LoginForm from '../../components/Auth/LoginForm';
import SignupForm from '../../components/Auth/SignupForm';
// import Toggle from '../../components/Toggle'
import '../../App.css';
import './Home.css';
import API from '../../utils/API'
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
            outerColWidth: 6,
            innerColWidth: 10,
            fakeNews:[],
            realNews: []

        };
    }
    componentDidMount() {
        this.loadFakeArticles();
    }
    loadFakeArticles = () => {
        API.getFakeArticles()
        .then(res =>
            this.setState({ fakeNews: res.data })
          )
          .catch(err => console.log(err));
    }
    displayRealNews = (article) => {
        const emptyNewsArray = []
        this.setState({ outerColWidth: 2 });
        this.setState({ innerColWidth: 10 });
        const realNewsVar = article.associatedRealNews;
        realNewsVar.map(x=> console.log(x));
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
                    <Content className="main">
                        {/* Here is where the main content will be displayed
                        it is comprised of four columns with variable width, depending on which view we want set*/}
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                            
                            <Col span={this.state.outerColWidth}>{!this.props.isLoggedIn && <LoginForm login={this.props.login}></LoginForm>}</Col>

                            <Col span={this.state.innerColWidth}>
                                {this.state.fakeNews.map(fake => <Card fake={fake} img={"https://www.vectorlogo.zone/logos/theonion/theonion-card.png"}key={fake.id} displayRealNews={this.displayRealNews} />)}
                            </Col>
                            <Col span={this.state.innerColWidth}>{this.state.realNews && this.state.realNews.map(real=> <RealCard real={real} key={real.id}></RealCard>)}</Col>
                            <Col span={this.state.outerColWidth}>{!this.props.isLoggedIn && <SignupForm></SignupForm>}</Col>
                        </Row>
                    </Content>
                </Layout>
            </Wrapper>

        )
    }
}

export default Home;