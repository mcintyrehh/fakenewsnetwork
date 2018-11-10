import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Menu } from 'antd';
import './headerdiv.css';

const HeaderDiv = () => (
  <Row className="logo">
    <Col span={8}></Col>
    <Col className="title" span={10}><span role="img" aria-label="investigator emoji">🕵️‍</span>Fake News Network<span role="img" aria-label="investigator emoji">🕵️️</span></Col>
    <Col span={8}>
      
    </Col>
  </Row>
);

export default HeaderDiv;
