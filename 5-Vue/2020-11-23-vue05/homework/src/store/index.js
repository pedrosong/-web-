import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        addCount(state, payload) {
            console.log("state__", state);
            console.log("payload__", payload);
            return this.state.count++;
        },
        minusCount(state, payload) {
            console.log("state__", state);
            console.log("payload__", payload);
            return this.state.count--;
        }
    }

})

export default store;