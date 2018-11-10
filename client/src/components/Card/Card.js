import { Row, Col, Button } from 'antd';
import './Card.css'
import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: 'far'
    }
  }
  favStar = () => {
    // 'fas' is a font awesome icon of a solid star, 'far' is a hollow star
    // on clicking the star, the ternary operator switches states to the opposite
    const updateFav = (this.state.favIcon == 'fas') ? 'far' : 'fas';
    this.setState({favIcon : updateFav})
  }
  render() {
    console.log(this.state)
    return (
      <Row className="card-div">
        <Col span={6} className="side-info-holder">
          <div className="side-info-block my-auto">
            <img alt={`pic for "${this.props.fake.title}" article`} src={this.props.img}></img>
            {/* on clicking this button, it will run the function displayRealNews() and pass UP the object of the fake news article */}
            <Button type="primary" icon="search" className="news-btn" data-id={this.props.fake.id} onClick={() => this.props.displayRealNews(this.props.fake)}>Real News</Button>
            <span className="fav-div" data-id={this.props.fake.id} fav-saved="false"><i onClick={this.favStar} className={this.state.favIcon + ' fa-star mx-auto fav btn'}></i></span>
          </div>
        </Col>
        <Col span={16}>
          <div className="fake-article-info">
            <h3 className="card-title">
              <a target="_blank" href={this.props.fake.url}>{this.props.fake.title}</a>
            </h3>
            <div className="card-text p-0 summary">{this.props.fake.summary}</div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default Card;
