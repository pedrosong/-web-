import {Affix, Col, Layout, Row} from "antd"
import { Link } from "react-router-dom"
import Nav from "./nav";
import { navs } from "../routers/router.config";
function Header() {
    return <Affix offsetTop={0}>
        <Layout.Header>
            <Row className="wrap">
                <Col span={4}>
                   <h1 id="logo">
                      <Link to="/">KKB-CNode</Link>
                   </h1>
                </Col>
                <Col span={20}>
                    <Nav 
                      data={navs}
                      style={{
                        float:"right"
                      }}
                      getSelectedKey={({pathname})=>{
                        return navs.findIndex(item=>item.to === pathname)
                      }}
                      theme="dark"
                    />
                </Col>
            </Row>
        </Layout.Header>
    </Affix>
}

export default Header;