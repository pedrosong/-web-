import React, {Component} from 'react';
import {List, Avatar, Tag} from 'antd';
import axios from "axios";
import {fromNow, locate} from "silly-datetime";
import {Link} from "react-router-dom";

const {Item} = List;

locate('zh-cn');

class ArticleList extends Component {
	state = {
		data: [],
		page: 1
	};
	componentDidMount() {
		this.getData(this.props.tab ?? 'all', 1);
	}

	getData =(tab, page) => {
		axios.get(`/topics?page=${page}&tab=${tab ?? "all"}&limit=15`)
			.then(({data}) => {
				this.setState({
					data: data.data
				});
			});
	};

	shouldComponentUpdate(nextProps) {
		if (nextProps.tab !== this.props.tab) {
			this.getData(nextProps.tab);
			return false
		}
		return true
	}

	render() {
		const {data} = this.state;
		const {tabList, colorList} = this.props;
		return (
			<List
				className='list'
				dataSource={data}
				pagination={{
					pageSize: 15,
					total: 600,
					onChange: (page) => {
						this.setState({
							page
						});
						this.getData('all', page);
					}
				}}
				renderItem={(item) => (
					<Item
						className='item'
						key={item.id}
						actions={[`回复：${item.reply_count}`, `访问：${item.visit_count}`]}
					>
						<Item.Meta
							avatar={<Avatar src={item.author.avatar_url}/>}
							title={<div>
								<Tag
									color={(item.top || item.good) ? 'green' : colorList[item.tab]}
								>
									{
										item.top ? '置顶' : item.good ? '精华' : tabList[item.tab]
									}
								</Tag>
								<Link to={`/detail/${item.id}`}>
									{item.title}
								</Link>
							</div>}
							description={
								<div>
									<Link to={`/user/${item.author.loginname}`} className='username'>
										{item.author.loginname}
									</Link>
									最后回复时间：{fromNow(item.last_reply_at)}
								</div>
							}
						>

						</Item.Meta>
					</Item>
				)}
			/>
		);
	}
}

export default ArticleList;
