console.log('axios', axios);

// axios.defaults.baseURL = '/api';

// 拦截器 =》 中间件
axios.interceptors.request.use(function(config) {
    // 发送token
    console.log('axios.interceptors.request - 1');
    return config;
}, function() {

});
axios.interceptors.request.use(function(config) {
    console.log('axios.interceptors.request - 2');
    return config;
}, function() {

});

// axios => function request() => .get .post .delete

axios.interceptors.response.use(function(data) {
    console.log('axios.interceptors.response - 1');
    console.log('data', data);
    return data;
}, function() {

});
axios.interceptors.response.use(function(data) {
    console.log('axios.interceptors.response - 2');
    console.log('data', data);
    return data;
}, function() {

});

// 请求拦截器函数 => axios发送请求 => 响应拦截器函数 => 业务逻辑


(async function() {

    // let rs = await axios({
    //     method: 'get',
    //     url: '/data'
    // });

    // let rs = await axios('/data', {
    //     method: 'get'
    // });

    let rs = await axios.get('/data', {
        params: {
            a: 1
        }
    });

    console.log('rs', rs);

})()