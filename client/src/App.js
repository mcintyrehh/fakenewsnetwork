
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import LoginForm from './components/Auth/LoginForm';
// import SignupForm from './components/Auth/SignupForm';
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';
import "./App.css";
import Navbar from "./components/NavBarAnt";
import SigninDrawer from "./pages/SignupDrawer";
import { throws } from 'assert';


class App extends Component {

	constructor() {
		super();

		this.state = {
			loggedIn: false,
			user: null,
			drawerVisibility: false
		};
	}

	componentDidMount() {
		AUTH.getUser().then(response => {
			console.log(response.data);
			if (!!response.data.user) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			} else {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		})
	}

	logout = (event) => {
		event.preventDefault();

		AUTH.logout().then(response => {
			console.log(response.data);
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				});
			}
		});
	}

	showDrawer = () => {
		this.setState({drawerVisibility: true });
	}

	hideDrawer = () => {
		this.setState({drawerVisibility: false });
	}
	handleSubmit = () => {
		this.setState({drawerVisibility: false })
	}

	login = (username, password) => {
		AUTH.login(username, password).then(response => {
			console.log(response);
			if (response.status === 200) {

				this.setState({
					loggedIn: true,
					user: response.data.user
				});
			}
		});
	}

	render() {
		return (
			<div className="App">
				<Navbar clickDrawer={this.showDrawer}/>
				<SigninDrawer visible={this.state.drawerVisibility} hideDrawer={this.hideDrawer} submit={this.handleSubmit}/>
			</div>
	
		)
	}
}

export default App;
