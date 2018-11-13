import React, { Component } from 'react';
import { Layout } from 'antd';
import Wrapper from '../../components/Wrapper';
import { Row, Col } from 'antd';
import  { Card } from '../../components/Card';
import { RealCard } from '../../components/Card';
// import Toggle from '../../components/Toggle'
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
                        <Row style={{ textAlign: 'center', color: 'white' }}>
                            
                            <Col span={this.state.outerColWidth}></Col>

                            <Col span={this.state.innerColWidth}>
                                {this.state.fakeNews.map(fake => <Card fake={fake} user={this.props.user} img={fake.src} saved={this.saved} key={fake._id} displayRealNews={this.displayRealNews} />)}
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