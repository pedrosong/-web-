import React, {Component} from 'react';
import { Layout } from 'antd';
import "./App.css";
import axios from "axios";
import {Switch, Route} from "react-router-dom";
import HomePage from "./pages/homepage";
import Detail from "./pages/detail";
import User from "./pages/user";
import {withRouter} from "react-router-dom";

const { Header, Content } = Layout;

axios.defaults.baseURL = 'https://cnodejs.org/api/v1';

class App extends Component {
	render() {
		return (
			<Layout>
				<Header className="header">
					<div className="logo">
						<img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" onClick={() => {this.props.history.push('/');}}/>
					</div>
				</Header>
				<Layout>
					<Content
						style={{
							background: '#fff',
							padding: '0 40px'
						}}
					>
						<Switch>
							<Route exact={true} path='/:tab?' component={HomePage}/>
							<Route exact={true} path='/detail/:id' component={Detail}/>
							<Route exact={true} path='/user/:loginname' component={User}/>
						</Switch>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default withRouter(App);
