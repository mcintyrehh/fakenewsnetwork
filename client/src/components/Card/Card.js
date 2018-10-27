import { Row, Col, Button } from 'antd';
import './Card.css'
import React from "react";

export const Card = (props) => (
  <div className="card-div mx-auto">
    <Col span={6} className="side-info-block">
      <div className="side-info-block">
        <img src="https://thehardtimes.net/wp-content/uploads/2018/10/shutterstock_258165035-1024x538.jpg"></img>
        <Button type="primary" icon="search" className="news-btn">Real News</Button>
        <span class="fav-div" data-id="5bd3b519e033ca001545b1f2" fav-saved="false"><i class="fas fa-star mx-auto fav btn"></i></span>
      </div>
    </Col>
    <Col span={16}>
      <div className="fake-article-info">
        <h3 class="card-title">
          <a href="https://thehardtimes.net/hardstyle/why-rioting-is-the-next-big-self-care-trend-for-women/">Why Rioting Is the Next Big Self-Care Trend for Women</a>
        </h3>
        <div class="card-text p-0 excerpt">In our never-ending quest to uplift and heal ourselves, it’s easy to get overwhelmed by all the different types of self-care that exist: from drinking…</div>          
      </div>
    </Col> 
  </div>
);
