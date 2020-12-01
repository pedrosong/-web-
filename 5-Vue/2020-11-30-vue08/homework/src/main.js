import App from './App.vue'
import {getRootContainer} from './init/index';
import {createApp} from './runtime-canvas/index'

createApp(App).mount(getRootContainer());