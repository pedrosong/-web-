import { useReducer } from "react";
function reducer(state, action) {
    switch (action.type) {
        case "AGE":
            return {
                ...state,
                age: action.age
            }
        case "NAME":
            return {
                ...state,
                name: action.name
            }
    }
    return state;
}
function useStore() {
    let [state, dispatch] = useReducer(reducer, { age: 19, name: "kkb" });
    return { state, dispatch };
}
export { useStore };