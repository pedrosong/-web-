import React, {Component} from 'react';
import axios from "axios";
import DetailIntro from "../components/detailintro";
import ReplyList from "../components/replylist";

class Detail extends Component {
	state = {
		data: []
	};
	componentDidMount() {
		axios.get(`/topic/${this.props.match.params.id}`)
			.then(({data}) => {
				this.setState({
					data: data.data
				})
			})
	}

	render() {
		return (
			<div className='wrap'>
				<DetailIntro data={this.state.data}/>
				{
					this.state.data.replies?.length ?
						<ReplyList replies={this.state.data.replies}/> :
						''
				}
			</div>
		);
	}
}

export default Detail;
