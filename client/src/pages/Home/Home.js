import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
import Wrapper from '../../components/Wrapper'

class Home extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            password: '',
            redirectTo: null
        };
    }

    render() {
        return (
            <Wrapper>
      
            </Wrapper>
        )
    }
}

export default Home;