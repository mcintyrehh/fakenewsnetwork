import React, { Component } from 'react';
import { Layout, Tabs } from 'antd';
import Wrapper from '../../components/Wrapper';
import { Row, Col, Icon } from 'antd';
import axios from 'axios';
import DetailCard from '../../components/DetailCard';
import { RealCard } from '../../components/Card';
import '../../App.css';
import './Detail.css';
import API from '../../utils/API'
// import language from '@google-cloud/language';
// const client = new language.LanguageServiceClient();
const { Content } = Layout;
const TabPane = Tabs.TabPane;

class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null,
            tabColor: 'red',
            outerColWidth: 6,
            innerColWidth: 10,
            fakeNews: {},
            content: [],
            keywords: [],
            realNews: [],
            favIcon: 'far'
        };
    }
    componentDidMount() {
        this.loadFakeArticle(this.props.match.params.id)

        // this.checkIfFakeArticleSaved(this.props.user._id)
    }
    loadFakeArticle = articleId => {
        API.getFakeArticleById(articleId)
            .then(res => {
                const { content } = res.data
                console.log(res.data);
                const text = res.data.content[0]
                console.log(text);
                this.setState({ fakeNews: res.data, content: content })
                const keywordsArray = res.data.keywords;
                return axios.post("/api/real-articles/generate", {
                    keywords: keywordsArray
                })
                    .then(res => {
                        console.log(res.data);
                        const realNewsArray = res.data;
                        this.setState({ realNews: realNewsArray })
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            })
            .catch(err => console.log(err));
    }

    checkIfFakeArticleSaved = userId => {
        API.getAllUserSavedArticles(userId)
            .then(result => {
                console.log("All Saved", result);
            })
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
        (this.state.tabColor === 'red') ? this.setState({ tabColor: 'blue' }) : this.setState({ tabColor: 'red' });
    }

    render() {

        return (

            <Wrapper>
                <Layout>
                    <Content className="main">
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                            <Col span={this.state.outerColWidth}></Col>
                            <Col span={this.state.innerColWidth}>
                                <DetailCard user={this.props.user} title={this.state.fakeNews.title} id={this.state.fakeNews._id} articleType={this.state.fakeNews.articleType} img={this.state.fakeNews.src} url={this.state.fakeNews.url} summary={this.state.fakeNews.summary} favIcon={this.state.favIcon} />
                            </Col>
                        </Row>
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                            {/* <Col span={this.state.innerColWidth}>  */}
                            <div>
                                <Tabs
                                    defaultActiveKey="1"
                                    tabPosition="right"
                                    style={{ height: 440, marginTop: "5vh", color: 'white', overflowY: "auto", marginLeft: "5vw", marginRight: "2vw" }}
                                    tabBarStyle={{ color: this.state.tabColor }}
                                    onChange={this.changeColor}
                                >

                                    <TabPane tab="Satire" key="1">
                                        <h1>The News</h1>
                                        {this.state.content.map((p, index) => <p key={index} style={{ textAlign: "left", fontSize: "16px" }}>{p}</p>)}
                                    </TabPane>

                                    {/* Real Article Cards Go Here */}
                                    <TabPane tab="Real News" key="2">
                                        {this.state.realNews ?
                                            (this.state.realNews.map(savedArticle => <RealCard real={savedArticle} saved={this.saved} img={savedArticle.urlToImage} key={savedArticle._id} />))
                                            : <div><Icon type="loading" /></div>
                                        }

                                    </TabPane>

                                </Tabs>
                            </div>

                        </Row>
                    </Content>
                </Layout>
            </Wrapper>

        )
    }
}

export default Detail;