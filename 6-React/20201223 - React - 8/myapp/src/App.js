import RootRoutes from "./routers/index";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./static/css/style.css";
import Header from "./component/header";
/*
  入场动画
*/
function App() {
  return <Layout>
    <Header />
    <Layout.Content>
        <RootRoutes />
    </Layout.Content>
    <Layout.Footer></Layout.Footer>
  </Layout>;
}

export default App;
