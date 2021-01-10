import {createContext, useContext} from  "react";
const context = createContext();
const {Provider} = context;
function useDispatch(){
    const {dispatch} = useContext(context); 
    return dispatch;
}
function useSelector(cb){
    const {state} = useContext(context); 
    return cb(state);
}
export default context;
export {Provider,useDispatch,useSelector};