import React from 'react';
import { Row, Col } from 'antd';
import './headerdiv.css';

const HeaderDiv = props => (
  <Row className="logo">
    <Col span={4}></Col>
    <Col className="title" span={12}><span role="img" aria-label="investigator emoji">🕵️‍</span>Real Fake News Intel<span role="img" aria-label="investigator emoji">🕵️️</span></Col>
    <Col span={8}>
      <Row>
        <p style={{textAlign: 'right'}}>Hello {(props.user) ?  props.user.firstName : ""}</p>
      
     
      </Row>
    </Col>
  </Row>
);

export default HeaderDiv;
