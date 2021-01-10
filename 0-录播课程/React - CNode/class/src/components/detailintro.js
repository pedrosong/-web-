import React, {Component} from 'react';
import {Card, Tag} from "antd";
import {colorList, tabList} from "../utils/utils";
import {fromNow} from "silly-datetime";

class DetailIntro extends Component {
	render() {
		const {data} = this.props;
		return (
			<Card
				title={
					<div>
						<div className='title'>
							<Tag
								color={(data.top || data.good) ? 'green' : colorList[data.tab]}
							>
								{
									data.top ? '置顶' : data.good ? '精华' : tabList[data.tab]
								}
							</Tag>
							<span>
								{data.title}
							</span>
						</div>
						<div className='intro'>
							<span>发布于 {fromNow(data.create_at)}</span>
							<span>作者 {data.author?.loginname}</span>
							<span>{data.visit_count} 次浏览</span>
							<span>来自 {tabList[data.tab]}</span>
						</div>
					</div>
				}
			>
				<div dangerouslySetInnerHTML={{
					__html: data.content
				}}/>
			</Card>
		);
	}
}

export default DetailIntro;
