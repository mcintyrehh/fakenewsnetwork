import React, { Component } from 'react';
import { Layout } from 'antd';
import Wrapper from '../../components/Wrapper';
import { Row, Col, Icon } from 'antd';
import  { Card } from '../../components/Card';
// import { RealCard } from '../../components/Card';
import '../../App.css';
import './Saved.css';
import API from '../../utils/API'
// import axios from 'axios';
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
            outerColWidth: 6,
            innerColWidth: 10,
            usersSaved: []
        };
    }
    componentDidMount() {
        const userID = this.props.user._id;
        this.grabUserSaved(userID);
        console.log(this.props.user._id);
    }
    grabUserSaved = ID => {
        console.log(ID);
        API.getAllUserSavedArticles(ID)
        .then(res => {
            console.log(res.data);
            const { savedFake, savedReal, votedOn } = res.data;
            this.setState({savedFake, savedReal, votedOn})
        })
          .catch(err => console.log(err));
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
                                {this.state.savedFake ? this.state.savedFake.map(savedArticle => <Card fake={savedArticle} img={"https://www.vectorlogo.zone/logos/theonion/theonion-card.png"} key={savedArticle._id} />) : <div><Icon type="loading" /></div>}
                            </Col>
                            <Col span={this.state.innerColWidth}></Col>
                            <Col span={this.state.outerColWidth}></Col>
                        </Row>
                    </Content>
                </Layout>
            </Wrapper>

        )
    }
}

export default Home;