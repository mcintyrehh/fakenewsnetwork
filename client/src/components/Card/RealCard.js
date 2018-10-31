import { Row, Col, Button } from 'antd';
import './Card.css'
import React from "react";

export const RealCard = (props) => (
  <Row className="card-div">
    <Col span={6} className="side-info-holder">
      <div className="side-info-block my-auto">
        <img alt={`pic for "${props.real.realNewsArticle.title}" article`} src={props.real.realNewsArticle.src}></img>
        {/* on clicking this button, it will run the function displayRealNews() and pass UP the object of the fake news article */}
        <Button type="primary" icon="search" className="news-btn" data-id={props.real.realNewsArticle.id} 
        // onClick={() => props.displayRealNews(props.fake)}
        >Real News</Button>
        <span className="fav-div" data-id={props.real.realNewsArticle.id} fav-saved="false"><i className="fas fa-star mx-auto fav btn"></i></span>
      </div>
    </Col>
    <Col span={16}>
      <div className="fake-article-info">
        <h3 className="card-title">
          <a target="_blank" href={props.real.realNewsArticle.url}>{props.real.realNewsArticle.title}</a>
        </h3>
        <div className="card-text p-0 excerpt">{props.real.realNewsArticle.summary}</div>          
      </div>
    </Col> 
  </Row>
);
