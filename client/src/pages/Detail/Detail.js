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
            content: [],
            realNews: []
        };
    }
    componentDidMount() {
        this.loadFakeArticle(this.props.match.params.id);
    }
    loadFakeArticle = articleId => {
        API.getFakeArticleById(articleId)
        .then(res => {
            const { content } = res.data
            return this.setState({ fakeNews: res.data, content: content })
        })
          .catch(err => console.log(err));
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
        (this.state.tabColor === 'red') ? this.setState({tabColor: 'blue'}) : this.setState({tabColor: 'red'});
    }
    
    render() {
        
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
                                style={{ height: 440, marginTop: "5vh", color: 'white', overflowY: "auto", marginLeft: "5vw", marginRight: "2vw" }}
                                tabBarStyle={{color: this.state.tabColor}}
                                onChange={this.changeColor}
                                >

                                    <TabPane tab="Blue Pill" key="1">
                                    <h1>The News</h1>
                                    {this.state.content.map(p => <p style={{textAlign: "left", fontSize: "16px"}}>{p}</p>)}
                                    </TabPane>

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