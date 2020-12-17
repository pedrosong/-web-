// import { Fragment } from "react";
import TitleNav from "./TitleNav";
import Content from "./Content";
import PageNav from "./PageNav";

function List(){
    return <div className="wrap">
        <TitleNav />
        <Content />
        <PageNav />
    </div>
}

export default List