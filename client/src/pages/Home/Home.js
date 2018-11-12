import React, { Component } from 'react';
import { Layout, Icon, Button } from 'antd';
import Wrapper from '../../components/Wrapper';
import { Row, Col } from 'antd';
import  Card from '../../components/Card';
import '../../App.css';
import './Home.css';
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
            pageIndex: 5,
            currentPage: []

        };
    }
    componentDidMount() {
        this.loadFakeArticles();
        
    }
    loadFakeArticles = () => {
        API.getFakeArticles()
        .then(res => {
            this.setState({ fakeNews: res.data })
            this.setCurrentPage();
        })
          .catch(err => console.log(err));
    }

    setCurrentPage = () => {
        let currentPage = this.state.fakeNews.filter((a, index) => index < this.state.pageIndex);
        this.setState({currentPage})
    }

    arrowRight = () => {
        if (this.state.pageIndex === 5) {
            let nPage = this.state.fakeNews.filter((a, index) => (4 < index && index < 10) );
            this.setState({currentPage: nPage, pageIndex: 10 });
        } else if (this.state.pageIndex === 10) {
            let nPage = this.state.fakeNews.filter((a, index) => (9 < index && index < 15) );
            this.setState({currentPage: nPage, pageIndex: 15 });
        } else if (this.state.pageIndex === 15) {
            let nPage = this.state.fakeNews.filter((a, index) => (14 < index && index < 20) );
            this.setState({currentPage: nPage, pageIndex: 20 });
        }
    }
    arrowLeft = () => {
        if (this.state.pageIndex === 10) {
            let nPage = this.state.fakeNews.filter((a, index) => index < 5);
            this.setState({currentPage: nPage, pageIndex: 5 });
        } else if (this.state.pageIndex === 15) {
            let nPage = this.state.fakeNews.filter((a, index) => (4 < index && index < 10) );
            this.setState({currentPage: nPage, pageIndex: 10 });
        } else if (this.state.pageIndex === 20) {
            let nPage = this.state.fakeNews.filter((a, index) => (9 < index && index < 15) );
            this.setState({currentPage: nPage, pageIndex: 15 });
        }
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
    saved = (userID, articleID, articleType) => {
        let data = {
            fakeArticleId: articleID
        }
		API.updateUserSavedArticles(userID, data, articleType)
		.then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
	}
    render() {
        console.log(this.state)
        return (

            <Wrapper>
                <Layout>
                    <Content className="main">
                        <Row>
                            <Col span={12} style={{textAlign: 'left'}}>
                                <h1 style={{color: 'white', marginLeft: '5vw'}}>Recent Articles</h1>
                            </Col>
                            <Col span={11} style={{textAlign: 'right'}}>
                            <Row>
                                <Col span={18}></Col>
                                <Col span={2} style={{paddingTop: '2vh'}}>
                                    <Button ghost="true" icon="left" style={{paddingBottom: '1vh'}} onClick={this.arrowLeft}></Button>
                                </Col>
                                
                                <Col span={2} style={{paddingTop: '2vh'}}>
                                    <Button ghost="true" icon="right" style={{paddingBottom: '1vh'}} onClick={this.arrowRight}></Button>
                                </Col>
                                <Col span={2}></Col>
                            </Row>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                            <Col span={4}></Col>
                            <Col span={16}>
                                {this.state.currentPage.map(fake => <Card fake={fake} user={this.props.user} img={fake.src} saved={this.saved} key={fake._id} displayRealNews={this.displayRealNews} />)}
                            </Col>
                            <Col span={4}>

                            </Col>
                        </Row>
                        {/*For Arrow Pagination */}
                        <Row>
                            <Col span={12} style={{textAlign: 'left'}}>
                                
                            </Col>
                            <Col span={11} style={{textAlign: 'right'}}>
                            <Row>
                                <Col span={18}></Col>
                                <Col span={2} style={{paddingTop: '2vh', paddingBottom: '2vh'}}>
                                    <Button ghost="true" icon="left" style={{paddingBottom: '1vh'}} onClick={this.arrowLeft}></Button>
                                </Col>
                                
                                <Col span={2} style={{paddingTop: '2vh', paddingBottom: '2vh'}}>
                                    <Button ghost="true" icon="right" style={{paddingBottom: '1vh'}} onClick={this.arrowRight}></Button>
                                </Col>
                                <Col span={2}></Col>
                            </Row>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </Content>
                </Layout>
            </Wrapper>

        )
    }
}

export default Home;