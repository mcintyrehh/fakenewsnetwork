import { Row, Col, Button } from 'antd';
import './Card.css'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Card extends Component {
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
    const updateFav = (this.state.favIcon === 'fas') ? 'far' : 'fas';
    this.setState({favIcon : updateFav});
  }

  render() {
    return (
      <Row className="card-div">
        <Col span={6} className="side-info-holder">
          <div className="side-info-block my-auto">
            <img alt={`pic for "${this.props.fake.title}" article`} src={this.props.img}></img>
            {/* on clicking this button, it will run the function displayRealNews() and pass UP the object of the fake news article */}
            <Link to={`/articles/${this.props.fake._id}`}>
              <Button type="primary" icon="search" className="news-btn">Intel</Button>
            </Link>
            
            <span className="fav-div"><i onClick={() => this.favStar(this.props.user._id, this.props.fake._id, this.props.fake.articleType)} className={this.state.favIcon + ' fa-star mx-auto fav btn'}></i></span>
          </div>
        </Col>
        <Col span={16}>
          <div className="fake-article-info">
            <h3 className="card-title">
              <a target="_blank" href={this.props.fake.url}>{this.props.fake.title}</a>
            </h3>
            <div className="card-text summary">{this.props.fake.summary}</div>
          </div>
        </Col>
      </Row>
    )
  }
}

export { Card };
