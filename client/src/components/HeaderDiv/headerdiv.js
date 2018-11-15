import React, { Component } from 'react';
import { Row, Col } from 'antd';
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
        <Col className="title" span={6}>
          <h5 style={{textAlign: "right", paddingTop: "2vh", color: "white"}}> {(this.props.user) ? `Hello ${this.props.user.firstName}` : ""} </h5>
        </Col>
      </Row>
    )
  }
};

export default HeaderDiv;
