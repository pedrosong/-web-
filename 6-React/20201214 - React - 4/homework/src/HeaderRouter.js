import { Link } from "react-router-dom";

function HeaderRouter(){
    return(
        <header class="header">
        <div class="wrap">
            <h1 id="logo">KaiKeBa</h1>
            <nav class="nav">
                <Link to="/index">首页</Link>
                <Link to="/about">关于我们</Link>
                <Link to="joinus">加入我们</Link>
            </nav>
        </div>
    </header>
    )
}

export default HeaderRouter