import React, {Component} from 'react';
import {Menu} from "antd";
import {Link} from "react-router-dom";

class ArticleMenu extends Component {
	state = {
		tab: 'all'
	};

	componentDidMount() {
		this.setState({
			tab: this.props.tab ?? 'all'
		})
	}

	render() {
		const {tabList} = this.props;
		const {tab} = this.state;
		return (
			<Menu
				theme="light"
				mode="vertical"
				selectedKeys={[tab]}
				style={{ border: 'none' }}
				onSelect={({key}) => {
					this.setState({
						tab: key
					})
				}}
			>
				{
					Object.entries(tabList).map(item => (
						<Menu.Item
							key={item[0]}
						>
							<Link to={`/${item[0]}`}>
								{item[1]}
							</Link>
						</Menu.Item>
					))
				}
			</Menu>
		);
	}
}

export default ArticleMenu;
