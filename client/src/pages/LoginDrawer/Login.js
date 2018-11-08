import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';
import AUTH from "../../utils/AUTH";

const { Option } = Select;

class DrawerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", loggedIn: false}
  }

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({[name]: value });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { username, password } = values;
      if (!err) {
        AUTH.login(username, password).then(response => {
          console.log(response)
          this.setState({loggedIn: true});
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Drawer
          title="Login"
          width={360}
          placement="right"
          onClose={this.props.hideDrawer}
          maskClosable={false}
          visible={(this.state.loggedIn) ? false: this.props.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Username">
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'please provide your username.' }],
                  })(<Input placeholder="Username" name="username" onChange={this.handleInput}/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Password">
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'please provide your password.' }],
                  })(<Input placeholder="Password" type="password" name="password" onChange={this.handleInput}/>)}
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
            <Button onClick={this.handleSubmit} type="primary">Login</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const Login = Form.create()(DrawerForm);
export default Login;