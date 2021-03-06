
import React, { Component } from 'react';

import { Route, Switch, Redirect } from "react-router-dom";
import { Layout, notification } from 'antd';
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Saved from "./pages/Saved/Saved";
import NoMatch from "./pages/NoMatch";
import HeaderDiv from "./components/HeaderDiv";
import AUTH from './utils/AUTH';
import "./App.css";
import Navbar from "./components/NavBarAnt";
import SignUpDrawer from "./pages/SignupDrawer";
import LoginDrawer from "./pages/LoginDrawer";


const { Header, Footer, Sider, Content } = Layout;

class App extends Component {

	constructor() {
		super();

		this.state = {
			loggedIn: false,
			user: null,
			signUpDrawerVisibility: false,
			loginDrawerVisibility: false
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
	onCollapse = (collapsed) => {
		this.setState({ collapsed });
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
				this.loggedOutNotification();
			}
		});
	}

	loggedInNotification = () => {
		const args = {
		  message: 'You are now logged in to RFNi',
		  description: 'Bringing you the fake news that matters.',
		  placement: 'bottomLeft',
		  duration: 4,
		};
		notification.open(args);
	};

	loggedOutNotification = () => {
		const args = {
		  message: 'Reality must be calling.',
		  description: 'You are now logged out.',
		  placement: 'bottomLeft',
		  duration: 4,
		};
		notification.open(args);
	};

	showSignUpDrawer = () => {
		this.setState({ signUpDrawerVisibility: true });
	}
	hideSignUpDrawer = () => {
		this.setState({ signUpDrawerVisibility: false });
	}
	showLoginDrawer = () => {
		this.setState({ loginDrawerVisibility: true });
	}
	hideLoginDrawer = () => {
		this.setState({ loginDrawerVisibility: false });
	}
	switchDrawers = () => {
		this.setState({ signUpDrawerVisibility: false, loginDrawerVisibility: true });
	}
	login = (username, password) => {
		AUTH.login(username, password).then(response => {
			console.log(response);
			if (response.status === 200) {
				this.setState({
					loggedIn: true,
					user: response.data.user
				});
				this.loggedInNotification();
			}
		});
	}
	render() {
		return (
				<div className="App">
					{this.state.loggedIn && (
						<Layout>
							<Header>
								
								<Header style={{ textAlign: 'right' }}>
									<HeaderDiv user={this.state.user}/>
								</Header>
							</Header>
							<Layout>
								<Sider
									width={256}
									collapsible
									collapsed={this.state.collapsed}
									onCollapse={this.onCollapse} >
									<Navbar user={this.state.user} logout={this.logout} />
								</Sider>

								<Content>
									<div className="main-view">
										
											<Switch>
												<Route exact path="/" component={Home} />
												<Route exact path="/articles/:id" render={props => <Detail user={this.state.user} {...props} />} />
												<Route exact path="/saved-articles" render={() => <Saved user={this.state.user} />}/>
												<Route component={NoMatch} />
											</Switch>
										
									</div>
								</Content>
							</Layout>
							<Footer className="footer">a Team 2 Production</Footer>
						</Layout>
					)}
					{!this.state.loggedIn && (
						<div className="auth-wrapper">
							<Layout>
								<Header className="header" style={{ textAlign: 'right' }}>
									<HeaderDiv />
								</Header>
								<Layout className="content">
									<Sider
										width={256}
										collapsible
										collapsed={this.state.collapsed}
										onCollapse={this.onCollapse} >
										<Navbar clickDrawer={this.showSignUpDrawer} collapsed={this.onCollapse} clickLoginDrawer={this.showLoginDrawer} />
									</Sider>
									<Content>
										<div className="auth-wrapper">
											<Switch>
												<Route exact path="/" component={Home} />
												<Route exact path="/articles/:id" component={() => <Redirect to="/" />}/>
												<Route exact path="/saved-articles" component={() => <Redirect to="/" />}/>
												<Route component={NoMatch} />
											</Switch>
										
											<SignUpDrawer visible={this.state.signUpDrawerVisibility} hideDrawer={this.hideSignUpDrawer} triggerLogin={this.switchDrawers} login={this.login}/>
											<LoginDrawer visible={this.state.loginDrawerVisibility} hideDrawer={this.hideLoginDrawer} login={this.login} />
										</div>
									</Content>
								</Layout>
								<Footer className="footer">a Team 2 Production</Footer>
							</Layout>
						</div>
					)}
				</div>
		)
	}
}

export default App;
