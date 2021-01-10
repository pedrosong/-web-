import React, {Component} from 'react';
import {Avatar, Card, List} from "antd";
import Item from "antd/es/list/Item";
import {Link} from "react-router-dom";
import {fromNow} from "silly-datetime";

class TopicList extends Component {
	render() {
		let {title, data} = this.props;
		return (
			<Card
				title={title}
				type='inner'
			>
				<List
					dataSource={data}
					pagination={{
						total: data?.length,
						pageSize: 5,
						hideOnSinglePage: true
					}}
					renderItem={item => (
						<Item
							className='item'
							key={item.id}
							extra={`最后回复时间：${fromNow(item.last_reply_at)}`}
						>
							<Item.Meta
								avatar={<Avatar src={item.author.avatar_url}/>}
								title={<div>
									<Link to={`/detail/${item.id}`}>
										{item.title}
									</Link>
								</div>}
							>

							</Item.Meta>
						</Item>
					)}
				/>
			</Card>
		);
	}
}

export default TopicList;
