import { Row, Col, Button } from 'antd';
import './Card.css'
import React from "react";

export const Card = (props) => (
  <Row className="card-div">
    <Col span={6} className="side-info-holder">
      <div className="side-info-block my-auto">
        <img src={props.fake.src}></img>
        <Button type="primary" icon="search" className="news-btn" data-id={props.fake.id}>Real News</Button>
        <span className="fav-div" data-id={props.fake.id} fav-saved="false"><i className="fas fa-star mx-auto fav btn"></i></span>
      </div>
    </Col>
    <Col span={16}>
      <div className="fake-article-info">
        <h3 className="card-title">
          <a target="_blank" href="https://thehardtimes.net/hardstyle/why-rioting-is-the-next-big-self-care-trend-for-women/">{props.fake.title}</a>
        </h3>
        <div className="card-text p-0 excerpt">{props.fake.excerpt}</div>          
      </div>
    </Col> 
  </Row>
);
