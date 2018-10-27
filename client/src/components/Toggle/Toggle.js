import React from "react";
import { Menu, Icon, Switch } from 'antd';

class Toggle extends React.Component {
    state = {
      theme: 'dark',
      current: '1',
    }
  
    changeTheme = (value) => {
      this.setState({
        theme: value ? 'dark' : 'light',
      });
    }
  
    handleClick = (e) => {
      console.log('click ', e);
      this.setState({
        current: e.key,
      });
    }
  
    render() {
      return (
        <span>
          <Switch
            checked={this.state.theme === 'dark'}
            onChange={this.changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </span>
      )
    }
}

export default Toggle;