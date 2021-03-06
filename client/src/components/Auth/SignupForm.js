import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Container, Row, Col } from '../../components/Grid';
// import { Card } from '../../components/Card';
import { Input, FormBtn } from '../../components/Form';
// import { Auth } from 'antd';
import AUTH from '../../utils/AUTH';

class SignupForm extends Component {

    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
            redirectTo: null
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        AUTH.signup({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            password: this.state.password
        }).then(response => {
            console.log(response);
            if (!response.data.errmsg) {
                console.log('You are registerd');
                this.setState({
                    redirectTo: '/'
                });
            } else {
                console.log('Already registered');
            }
        });
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        }

        return (

            <Container>
                <Row>
                    <Col size="md-1"></Col>
                    <Col size="md-10">
                        <div title="Sign Up for the best Fake/Real News">
                            <form style={{ marginTop: 10 }}>
                                <label htmlFor="username">First name: </label>
                                <Input
                                    type="text"
                                    name="firstName"
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="username">Last name: </label>
                                <Input
                                    type="text"
                                    name="lastName"
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="username">Username: </label>
                                <Input
                                    type="text"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="password">Password: </label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="confirmPassword">Confirm Password: </label>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                />
                                <Link to="/">Login</Link>
                                <FormBtn onClick={this.handleSubmit}>Sign Up</FormBtn>
                            </form>
                        </div>
                    </Col>
                    <Col size="md-1"></Col>
                </Row>
            </Container>

        )
    }
}

export default SignupForm;
