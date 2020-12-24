
import IndexPage from "./index/index";
import UndefinedPage from "./404/index";
import LoginPage from "./login";
import AboutPage from "./about/index";
import GetStartPage from "./getstart";
import { lazy, Suspense } from "react";
const APIPage = lazy(()=>import("./api/index"));
const router_list = [
  {
    path: "/",
    exact: true,
    render(props) {
      return <IndexPage {...props} />
    }
  }, {
    path: "/getstart",
    exact: true,
    render(props) {
      return <GetStartPage {...props} />
    }
  }, {
    path: "/api",
    exact: true,
    render(props) {
      return <Suspense fallback={<h1>视图请求中</h1>}>
          <APIPage {...props} />
      </Suspense>
    }
  }, {
    path: "/about",
    exact: true,
    render(props) {
      return <AboutPage {...props} />
    }
  }, {
    path: "/login",
    exact: true,
    render(props) {
      return <LoginPage {...props} />
    }
  }, {
    path: "",
    render(props) {
      return <UndefinedPage {...props} />
    }
  }
];

const navs = [
  {
    to: "/",
    title: "首页"
  },{
    to: "/getstart",
    title: "新手入门"
  },{
    to: "/api",
    title: "API"
  },{
    to: "/about",
    title: "关于"
  }
];

export { router_list,navs };