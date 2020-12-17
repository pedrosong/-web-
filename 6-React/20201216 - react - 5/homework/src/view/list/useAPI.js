import { NavLink } from "react-router-dom";
import data from "../../database/data"

function createNewData(type){
    let newData = [];
    if ( type === "all" ) {
        newData=[...data.good,...data.share,...data.ask]
    }else if (Object.keys(data).includes(type)) {
        switch (type) {
            case "good":
                newData = data.good
                break;
            case "share":
                newData = data.share
                break;
            case "ask":
                newData = data.ask
                break;
            default:
                break;
        };
    }
    return newData
}

function createInner(type,page,pageLen){
    let inner = [];
    for( let i = 1; i <= pageLen; i++ ){
        if(i === Number(page)){
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            inner.push(<a key={i} className="active">{i}</a>)
        } else {
            inner.push(<NavLink to={`/list/${type}/${i}`} key={i}> {i} </NavLink>)
        }
    }
    return inner
}

export {
    createNewData,
    createInner
}