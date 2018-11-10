import React from 'react';
import { Row, Col } from 'antd';
import './headerdiv.css';

const HeaderDiv = () => (
  <Row className="logo">
    <Col span={6}></Col>
    <Col className="title" span={10}><span role="img" aria-label="investigator emoji">🕵️‍</span>Real Fake News<span role="img" aria-label="investigator emoji">🕵️️</span></Col>
    <Col span={8}>
      <Row>

      </Row>
    </Col>
  </Row>
);

export default HeaderDiv;
