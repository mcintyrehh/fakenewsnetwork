import { Row, Col, Button } from 'antd';
import './DetailCard.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class DetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: 'far'
    }
  }
  favStar = (userId, articleId, articleType) => {
    console.log(articleId);
    console.log(articleType);
    // 'fas' is a font awesome icon of a solid star, 'far' is a hollow star
    // on clicking the star, the ternary operator switches states to the opposite
    this.props.saved(userId, articleId, articleType)
    const updateFav = (this.props.favIcon === 'fas') ? 'far' : 'fas';
    this.setState({favIcon : updateFav});
  }

  render() {
    return (
      <Row className="card-div">
        <Col span={6} className="side-info-holder">
          <div className="side-info-block my-auto">
            <img alt={`pic for "${this.props.title}" article`} src={this.props.img}></img>
            
            <span className="fav-div"><i onClick={() => this.favStar(this.props.user._id, this.props.id, this.props.articleType)} className={this.state.favIcon + ' fa-star mx-auto fav btn'}></i></span>
          </div>
        </Col>
        <Col span={16}>
          <div className="fake-article-info">
            <h3 className="card-title">
              <a target="_blank" href={this.props.url}>{this.props.title}</a>
            </h3>
            <div className="card-text p-0 summary">{this.props.summary}</div>
          </div>
        </Col>
      </Row>
    )
  }
}

export default DetailCard;
