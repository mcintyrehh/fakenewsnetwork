
import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
// import LoginForm from './components/Auth/LoginForm';

import SignupForm from './components/Auth/SignupForm';
import { Layout } from 'antd';
import Nav from "./components/Nav";
import Home from "./pages/Home/Home";
import NoMatch from "./pages/NoMatch";
import HeaderDiv from "./components/HeaderDiv";
import AUTH from './utils/AUTH';
import "./App.css";
import Navbar from "./components/NavBarAnt";
import SigninDrawer from "./pages/SignupDrawer";
import LoginDrawer from "./pages/LoginDrawer";
import { throws } from 'assert';

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
		console.log(collapsed);
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
			}
		});
	}

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
			}
		});
	}

	render() {
		return (

			<Router>
				<div className="App">
					{this.state.loggedIn && (
						<Layout>
							<Header>
								{/* <Nav user={this.state.user} logout={this.logout} /> */}
								<Header style={{ textAlign: 'right' }}>
									<HeaderDiv></HeaderDiv>
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
											<Route exact path="/" component={() => <Home isLoggedIn={this.state.loggedIn} login={this.login} />} />
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
									<HeaderDiv></HeaderDiv>
								</Header>
								<Layout className="content">
									<Sider
										width={256}
										collapsible
										collapsed={this.state.collapsed}
										onCollapse={this.onCollapse} >
										<Navbar clickDrawer={this.showSignUpDrawer} collapsed={this.onCollapse}clickLoginDrawer={this.showLoginDrawer} />
									</Sider>
									<Content>
										<div className="auth-wrapper">
											<Switch>
												<Route exact path="/" component={() => <Home isLoggedIn={this.state.loggedIn} login={this.login} />} />
												<Route exact path="/signup" component={SignupForm} />
												<Route component={NoMatch} />
											</Switch>
										
											<SigninDrawer visible={this.state.signUpDrawerVisibility} hideDrawer={this.hideSignUpDrawer} triggerLogin={this.switchDrawers}/>
											<LoginDrawer visible={this.state.loginDrawerVisibility} hideDrawer={this.hideLoginDrawer} login={this.login} />
										</div>
									</Content>
								</Layout>
								<Footer className="footer">a Team 2 Production</Footer>
							</Layout>
						</div>
					)}
				</div>
			</Router>
		)
	}
}

export default App;
