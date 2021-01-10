import React, { lazy } from "react";
const IndexView = lazy(()=>import("../view/index/index"));
const CourseView = lazy(()=>import("../view/course/index"));
const CourseIndexView = lazy(()=>import("../view/course/home/index"));
const CourseAIView = lazy(()=>import("../view/course/ai/index"));
const CourseBigDataView = lazy(()=>import("../view/course/bigdata/index"));
const CourseJavaView = lazy(()=>import("../view/course/java/index"));
const CourseWebView = lazy(()=>import("../view/course/web/index"));
const JobView = lazy(()=>import("../view/job/index"));
const AboutView = lazy(()=>import("../view/about/index"));
const indexRoutes = [
    {
        path: "/",
        exact: true,
        Component:IndexView
    },{
        path: "/Course",
        exact: false,
        Component: CourseView
    },{
        path: "/job",
        exact: false,
        Component: JobView
    },{
        path: "/about",
        exact: true,
        Component: AboutView
    }
]; 
const IndexActiveStyle = {
    color: "red"
}
const indexNavs = [
    {
        title: "首页",
        path: "/",
        exact: true,
        activeStyle: IndexActiveStyle
    },{
        title:"课程",
        path: "/Course",
        exact: false,
        activeStyle: IndexActiveStyle
    },{
        title:"招聘",
        path: "/job",
        exact: false,
        activeStyle: IndexActiveStyle
    },{
        title:"关于",
        path: "/about",
        exact: true,
        activeStyle: IndexActiveStyle
    }
]; 

const courseRoutes = [
    {
        title:"首页",
        activeClass:"active",
        path: "/course",
        exact: true,
        Component:CourseIndexView
    },{
        title:"AI课程",
        activeClass:"active",
        path: "/course/ai",
        exact: true,
        Component: CourseAIView
    },{
        title:"大数据课程",
        activeClass:"active",
        path: "/course/bigdata",
        exact: true,
        Component: CourseBigDataView
    },{
        title:"JAVA课程",
        activeClass:"active",
        path: "/course/java",
        exact: true,
        Component: CourseJavaView
    },{
        title:"WEB课程",
        activeClass:"active",
        path: "/course/web",
        exact: true,
        Component: CourseWebView
    }
]; 



export {indexRoutes,indexNavs,courseRoutes}