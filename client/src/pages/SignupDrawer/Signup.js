import React from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker } from 'antd';

const { Option } = Select;

class DrawerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstName: "", lastName: "", username: "", password: "", confirmPassword:""}
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/* <Button type="primary" onClick={this.showDrawer}>
          Create
        </Button> */}
        <Drawer
          title="Create"
          width={720}
          placement="right"
          onClose={this.props.hideDrawer}
          maskClosable={false}
          visible={this.props.visible}
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
                  {getFieldDecorator('LastName', {
                    rules: [{ required: true, message: 'please provide your last name.' }],
                  })(<Input placeholder="Last Name" name="lastName" onChange={this.handleInput}/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Username">
                  {getFieldDecorator('Username', {
                    rules: [{ required: true, message: 'please provide your first name.' }],
                  })(<Input placeholder="Username" name="username" onChange={this.handleInput}/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Password">
                  {getFieldDecorator('Password', {
                    rules: [{ required: true, message: 'please provide your first name.' }],
                  })(<Input placeholder="Confirm Password" name="password" onChange={this.handleInput}/>)}
                </Form.Item>
              </Col>
              <Col span={12}>
              <Form.Item label="Confirm Password">
                  {getFieldDecorator('Confirm Password', {
                    rules: [{ required: true, message: 'please provide your last name.' }],
                  })(<Input placeholder="Password" name="confirmPassword" onChange={this.handleInput}/>)}
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
            <Button onClick={this.handleSubmit} type="primary">Submit</Button>
          </div>
        </Drawer>
      </div>
    );
  }
}

const Signup = Form.create()(DrawerForm);
export default Signup;