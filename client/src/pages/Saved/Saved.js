import React, { Component } from 'react';
import { Layout } from 'antd';
import Wrapper from '../../components/Wrapper';
import { Row, Col } from 'antd';
import  Card from '../../components/Card';
import { RealCard } from '../../components/Card';
import '../../App.css';
import './Saved.css';
import API from '../../utils/API'
import axios from 'axios';
const { Content } = Layout;

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
        console.log('in display real news');
        console.log(article.keywords);
        const emptyFakeNewsArray = [];
        axios.post('/api/real-articles/generate', {
            keywords: article.keywords
        }).then(function (response) {
            console.log(response.data);
            const realNewsVar = response.data;
            const emptyNewsArray = [];
            realNewsVar.map(x=>emptyNewsArray.push(x))
            this.setState({ realNews: emptyNewsArray });
    
          })
          .catch(function (error) {
            console.log(error);
          });
        emptyFakeNewsArray.push(article);
        this.setState({ fakeNews: emptyFakeNewsArray })
        this.setState({ outerColWidth: 2 }); 
        this.setState({ innerColWidth: 10 });
        const realNewsVar = article.associatedRealNews;

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
                            
                            <Col span={this.state.outerColWidth}></Col>

                            <Col span={this.state.innerColWidth}>
                                {this.state.fakeNews.map(fake => <Card fake={fake} img={"https://www.vectorlogo.zone/logos/theonion/theonion-card.png"} key={fake._id} displayRealNews={this.displayRealNews} />)}
                            </Col>
                            <Col span={this.state.innerColWidth}>{this.state.realNews && this.state.realNews.map(real=> <RealCard real={real} key={real.id}></RealCard>)}</Col>
                            <Col span={this.state.outerColWidth}></Col>
                        </Row>
                    </Content>
                </Layout>
            </Wrapper>

        )
    }
}

export default Home;