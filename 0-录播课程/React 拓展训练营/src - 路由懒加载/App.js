import React, { Fragment, lazy, Suspense } from 'react';
import "./index.css";
import { Switch, Route } from 'react-router-dom';;
const View404 = lazy(()=>import(`./view404`));
const IndexView = lazy(()=>import(`./view/index`));
const DetailView = lazy(()=>import(`./view/details/index`));
const types = ["all","good","share","ask"];
function App() {
  return (<div className="wrap">
        <Switch>
            <Route 
                path="/detail/:id"
                render = {()=>{
                    return <Suspense fallback={<div>loading……</div>}>
                        <DetailView />
                    </Suspense>
                }}
            />
            <Route 
                path={["/","/:type","/:type/:page"]} 
                exact
                render={(props)=>{
                    let {params} = props.match;
                    let {type="all",page=1} = params;
                    if(types.includes(type)&&page>=1){
                      return  <Suspense fallback={<div>loading……</div>}><IndexView /></Suspense>
                    }
                    return  <Suspense fallback={<div>loading……</div>}><View404 /></Suspense>
                }}
            />
            <Route render={()=>{
              return <Suspense fallback={<div>loading……</div>}><View404 /></Suspense>
            }} />
        </Switch>
  </div>);
}

export default App;
