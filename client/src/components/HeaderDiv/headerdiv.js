import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Menu } from 'antd';
import './headerdiv.css';

const HeaderDiv = () => (
  <Row className="logo">
    <Col span={6}></Col>
    <Col className="title" span={10}><span role="img" aria-label="investigator emoji">🕵️‍</span>Fake News Network<span role="img" aria-label="investigator emoji">🕵️️</span></Col>
    <Col span={8}>
      <Row>
        <Menu
          className="menu-bar"
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={['2']}
          style={{ lineHeight: '64px' }}>
          <Menu.Item key="1">Sign Up</Menu.Item>
          <Menu.Item key="2">Sign In</Menu.Item>
          <Menu.Item key="3">Log Out</Menu.Item>
        </Menu>
      </Row>
    </Col>
  </Row>
);

export default HeaderDiv;
