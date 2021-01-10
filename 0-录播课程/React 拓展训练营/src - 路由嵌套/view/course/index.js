import React from "react";
import SubMenu from "../../component/subMenu";
import { courseRoutes } from "../../router/routes";
import IndexRoutes from "../../router";

function CourseView(){
    return <div className="clearFix">
        <SubMenu 
            navData={courseRoutes}
        />
        <div className="content">
            <IndexRoutes 
                routes={courseRoutes}
            />
        </div>
    </div>
}

export default CourseView;