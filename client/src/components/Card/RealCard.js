import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import './Card.css'

class RealCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favIcon: 'far',
      content: 'description'
    }
  }
  componentDidMount() {
    // this.setState({content: this.props.real.description})
  }

  loadMore = () => {
    const updateContent = (this.state.content === 'description') ? 'content' : 'description';
    this.setState({ content: updateContent });
  }
  favStar = (userId, articleId, articleType) => {
    console.log(articleId);
    console.log(articleType);
    // 'fas' is a font awesome icon of a solid star, 'far' is a hollow star
    // on clicking the star, the ternary operator switches states to the opposite
    this.props.saved(userId, articleId, articleType)
    const updateFav = (this.state.favIcon === 'fas') ? 'far' : 'fas';
    this.setState({ favIcon: updateFav });
  }

  render() {
    return (
      <Row className="card-div">
        <Col span={6} className="side-info-holder">
          <div className="side-info-block my-auto">
            <img alt={`pic for "${this.props.real.title}" article`} src={this.props.real.urlToImage}></img>
            {/* on clicking this button, it will run the function displayRealNews() and pass UP the object of the fake news article */}
            <Button type="primary" icon="search" className="news-btn" 
            onClick={this.loadMore}
            >{this.state.content == 'description' ? <span>Load More</span> : <span> Minimize</span>}</Button>
            <span className="fav-div" fav-saved="false"><i className="fas fa-star mx-auto fav btn"></i></span>
          </div>
        </Col>
        <Col span={16}>
          <div className="fake-article-info">
            <h3 className="card-title">
              <a target="_blank" href={this.props.real.url}>{this.props.real.title}</a>
            </h3>
            <div className="card-text p-0 excerpt">
              {this.state.content === 'description' ? this.props.real.description : this.props.real.content}
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}
export { RealCard };

