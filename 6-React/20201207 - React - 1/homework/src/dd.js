import { Component } from "react";

class Dd extends Component{
    state = { show: false };
    changeShow = () => {
        const {show} = this.state;
        this.setState({
            show:!show
        })
    };
    render(){
        const { title, data } = this.props;
        const { show } = this.state;
        return (
        <dl className={show?"friend-group expanded":"friend-group"}>
            <dt onClick={this.changeShow}> {title} </dt>
            {data.map((item,index)=> <dd key={index}> {item} </dd>)}
        </dl>
        )
    }
};

export default Dd;