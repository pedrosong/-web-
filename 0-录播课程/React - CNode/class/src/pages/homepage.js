import React, {Component} from 'react';
import {Col, Row} from "antd";
import ArticleList from "../components/articlelist";
import ArticleMenu from "../components/articlemenu";
import {colorList, tabList} from "../utils/utils";

class HomePage extends Component {
	render() {
		const {match} = this.props;
		const {tab} = match.params;
		return (
			<Row>
				<Col span={6}>
					<ArticleMenu tab={tab} tabList={tabList}/>
				</Col>
				<Col span={18}>
					<ArticleList tab={tab} tabList={tabList} colorList={colorList}/>
				</Col>
			</Row>
		);
	}
}

export default HomePage;
