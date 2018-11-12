import React, { Component } from 'react';
import { Row, Col, Carousel } from 'antd';
import './headerdiv.css';
import API from "../../utils/API";

class HeaderDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fakeNews: []
    }
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



  render() {
    return (
      <Row className="logo">
        <Col className="title" span={18}>
          <div style={{textAlign: "right"}}>
            <span role="img" aria-label="investigator emoji">🕵️‍</span>Real Fake News Intel<span role="img" aria-label="investigator emoji">🕵️️</span>
          </div>
        </Col>
        <Col classname="title" span={6}>
          <p style={{textAlign: "right"}}> {(this.props.user) ? `Hello ${this.props.user.firstName}` : ""} </p>
        </Col>
      </Row>
    )
  }
};

export default HeaderDiv;
