import React, {Component} from 'react';
import {Avatar, Card, List} from "antd";
import {Link} from "react-router-dom";
import {fromNow} from "silly-datetime";

const {Item} = List;

class ReplyList extends Component {
	render() {
		const {replies} = this.props;
		return (
			<Card
				type='inner'
				title={`${replies?.length}条回复`}
			>
				<List
					itemLayout='vertical'
					className='list'
					dataSource={replies}
					pagination={{
						pageSize: 5,
						total: replies.length,
						hideOnSinglePage: true
					}}
					renderItem={(item) => (
						<Item
							className='items'
							extra={item.ups.length ? `有${item.ups.length}人觉得很赞` : ''}
						>
							<Item.Meta
								avatar={<Avatar src={item.author.avatar_url}/>}
								description={
									<div>
										<Link to={`/user/${item.author.loginname}`} className='username'>
											{item.author.loginname}
										</Link>
										<span>
											发表于：{fromNow(item.create_at)}
										</span>
									</div>
								}
							/>
							<div dangerouslySetInnerHTML={{__html: item.content}}/>
						</Item>
					)}
				/>
			</Card>
		);
	}
}

export default ReplyList;
