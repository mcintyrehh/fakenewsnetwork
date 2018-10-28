import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import { Col } from '../Grid';
import './Nav.css';

const Nav = (props) => {
  let greeting;

  if (props.user === null) {
    greeting = <p>Welcome</p>
  } else if (props.user.firstName) {
    greeting = (
      <Fragment>
        Ready for more crazy news <strong>{props.user.firstName} {props.user.lastName} ? </strong>
      </Fragment>
    )
  } else if (props.user.username) {
    greeting = (
      <Fragment>
        Ready for more crazy news <strong>{props.user.username} ? </strong>
      </Fragment>
    )
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Col size="md-2">
        <Link to="/" className="navbar-brand">Fake News</Link>
      </Col>
      <Col size="md-7"></Col>
      <Col size="md-3">
        <div className="float-right">
          {greeting} - <Link to="#" className="logout" onClick={props.logout}>Logout</Link>
        </div>
      </Col>
    </nav>
  )
};

export default Nav;
