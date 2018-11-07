
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import NoMatch from "./pages/NoMatch";
import AUTH from './utils/AUTH';
import "./App.css";


class App extends Component {

	constructor() {
		super();

		this.state = {
			loggedIn: false,
			user: null
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
		});
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
				{this.state.loggedIn && (
					<div>
						<Nav user={this.state.user} logout={this.logout} />
						<div className="main-view">
							<Switch>
								<Route exact path="/" component={() => <Home isLoggedIn={this.state.loggedIn} login={this.login} />} />
								<Route component={NoMatch} />
							</Switch>
						</div>
					</div>
				)}
				{!this.state.loggedIn && (
					<div className="auth-wrapper">
						<Switch>
							<Route exact path="/" component={() => <Home isLoggedIn={this.state.loggedIn} login={this.login} />} />
							<Route exact path="/signup" component={SignupForm} />
							<Route component={NoMatch} />
						</Switch>
					</div>
				)}
			</div>
		)
	}
}

export default App;
