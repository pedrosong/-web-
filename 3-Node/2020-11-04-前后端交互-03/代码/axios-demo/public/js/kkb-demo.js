import Axios from './kkb/Axios';

let axios = new Axios({
    // .... 通用配置，通用的头信息，baseURL，多个请求都可以复用的
    baseURL: '/api'
});

axios.request({
    // 请求配置，当前请求才需要的
    url: '/'
})

// axios.get();

axios({
    url: '/data'
});