import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import AUTH from "../../utils/AUTH";

const { Option } = Select;

class DrawerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", username: "", password: "", confirmPassword:"", registered: false}
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({[name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { firstName, lastName, username, password } = values;
      if (!err) {
        AUTH.signup({
          firstName,
          lastName,
          username,
          password
        }).then(response => {
          console.log(response);
          if (!response.data.errmsg) {
            console.log("you're good");
            this.setState({registered: true, firstName: "", lastName: "", username: "", password: "", confirmPassword: "" });
          } else {
            console.log("duplicate");
          }
        });

      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Drawer
          title="Register"
          width={720}
          placement="right"
          onClose={this.props.hideDrawer}
          maskClosable={false}
          visible={(this.state.registered) ? false: this.props.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="First Name">
                  {getFieldDecorator('firstName', {
                    rules: [{ required: true, message: 'please provide your first name.' }],
                  })(<Input placeholder="First Name" name="firstName" onChange={this.handleInput}/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Last Name">
                  {getFieldDecorator('lastName', {
                    rules: [{ required: true, message: 'please provide your last name.' }],
                  })(<Input placeholder="Last Name" name="lastName" onChange={this.handleInput}/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Username">
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'please provide your first name.' }],
                  })(<Input placeholder="Username" name="username" onChange={this.handleInput}/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Password">
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'please provide a password.' }],
                  })(<Input placeholder="Confirm Password" type="password" name="password" onChange={this.handleInput}/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Confirm Password">
                  {getFieldDecorator('confirmPassword', {
                    rules: [{ required: true, message: 'please re-enter your password.' }],
                  })(<Input placeholder="Password" type="password" name="confirmPassword" onChange={this.handleInput}/>)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={this.props.hideDrawer}
            >
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} type="primary">Register</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const Signup = Form.create()(DrawerForm);
export default Signup;