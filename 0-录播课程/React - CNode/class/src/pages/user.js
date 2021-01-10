import React, {Component} from 'react';
import axios from "axios";
import {Avatar, Card, Descriptions} from "antd";
import {fromNow} from "silly-datetime";
import TopicList from "../components/topiclist";

const {Item} = Descriptions;

class User extends Component {
	state = {
		data: []
	};
	componentDidMount() {
		let {match} = this.props;
		let {loginname} = match.params;
		axios.get(`/user/${loginname}`)
			.then(({data}) => {
				console.log(data.data);
				this.setState({
					data: data.data
				});
			});
	}

	render() {
		let {data} = this.state;
		return (
			<Card
				title={<Descriptions title={<Avatar src={data.avatar_url}/>}>
					<Item label='用户名'>
						{data.loginname}
					</Item>
					<Item label='积分'>
						{data.score}
					</Item>
					<Item label='创建时间'>
						{fromNow(data.create_at)}
					</Item>
				</Descriptions>}
			>
				<TopicList
					title='最近创建的话题'
					data={data.recent_topics}
				/>
				<TopicList
					title='最近回复的话题'
					data={data.recent_replies}
				/>
			</Card>
		);
	}
}

export default User;
