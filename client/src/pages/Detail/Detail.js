import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
import Wrapper from '../../components/Wrapper';
import { Row, Col } from 'antd';
import DetailCard from '../../components/DetailCard';
// import { RealCard } from '../../components/Card';
// import Toggle from '../../components/Toggle'
import '../../App.css';
import './Detail.css';
import API from '../../utils/API'
import axios from 'axios';
const { Content } = Layout;
const TabPane = Tabs.TabPane;
class Detail extends Component {
    
    emitEmpty = () => {
        this.userNameInput.focus();
        this.setState({ userName: '' });
    }
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null,
            tabColor: 'red',
            outerColWidth: 6,
            innerColWidth: 10,
            fakeNews:{},
            realNews: []
        };
    }
    componentDidMount() {
        this.loadFakeArticle(this.props.match.params.id);
    }
    loadFakeArticle = userId => {
        API.getFakeArticleById(userId)
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
    saved = (userId, articleId, articleType) => {
        let data = {
            fakeArticleId: articleId
        }
		API.updateUserSavedArticles(userId, data, articleType)
		.then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
    }

    changeColor = () => {
        (this.state.tabColor === 'red') ? this.setState({tabColor: 'cyan'}) : this.setState({tabColor: 'red'});
    }
    
    render() {
        console.log("Article Object", this.state.fakeNews);
        return (

            <Wrapper>
                <Layout>
                    <Content className="main">
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                            
                            <Col span={this.state.outerColWidth}></Col>

                            <Col span={this.state.innerColWidth}>
                                <DetailCard user={this.props.user} title={this.state.fakeNews.title} id={this.state.fakeNews._id}articleType={this.state.fakeNews.articleType} img={this.state.fakeNews.src} url={this.state.fakeNews.url} summary={this.state.fakeNews.summary}/> 
                            </Col>
                        </Row>
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                            {/* <Col span={this.state.innerColWidth}>  */}
                            <div>
                                <Tabs
                                defaultActiveKey="1"
                                tabPosition="right"
                                style={{ height: 220, marginTop: "5vh", color: 'white' }}
                                tabBarStyle={{color: this.state.tabColor}}
                                onChange={this.changeColor}
                                >
                                    <TabPane tab="Blue Pill" key="1">Content of tab 1</TabPane>

                                    {/* Real Article Cards Go Here */}
                                    <TabPane tab="Red Pill" key="2">Content of tab 2</TabPane>
                                
                                </Tabs>
                            </div>
                            
                            {/*{this.state.realNews && this.state.realNews.map(real=> <RealCard real={real} key={real.id}></RealCard>)} */}
                            {/* </Col> */}
                            {/* <Col span={this.state.outerColWidth}></Col> */}
                        </Row>
                    </Content>
                </Layout>
            </Wrapper>

        )
    }
}

export default Detail;