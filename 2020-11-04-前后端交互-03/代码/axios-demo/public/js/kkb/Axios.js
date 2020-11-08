class Axios {

    constructor(instanceConfig) {
        this.defaults = instanceConfig;

        this.interceptors = {
            // InterceptorManager 管理 interceptors，类似Array
            // request: new InterceptorManager(),
            // response: new InterceptorManager()

            request: [],
            response: []
        };
    }

    request(config) {
        // 合并配置
        config = Object.assign(this.defaults, config);

        // 任务链，给Promise使用的，为什么要使用两个值
        // Promise.resolve(//).then(chain[0], chain[1]);
        // dispatchRequest => axios封装的用于发送ajax请求的函数
        var chain = [dispatchRequest, undefined];

        // promise.then(chain[0], chain[1]).....
        var promise = Promise.resolve(config);
        // promise.then(function(c) {// c=> config})

        // this.interceptors.request.push(resolve1, reject1);
        // this.interceptors.request.push(resolve2, reject2);
        // request => [ resolve1, reject1, resolve2, reject2 ]
        this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
            chain.unshift(interceptor.fulfilled, interceptor.rejected);
        });
        // chain => [resolve2, reject2, resolve1, reject1, dispatchRequest, undefined]

        // this.interceptors.response.push(resolve3, reject3);
        // this.interceptors.response.push(resolve4, reject4);
        // response => [ resolve3, reject3, resolve4, reject4 ]
        this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
            chain.push(interceptor.fulfilled, interceptor.rejected);
        });
        // chain => [resolve2, reject2, resolve1, reject1, dispatchRequest, undefined, resolve3, reject3, resolve4, reject4]

        while (chain.length) {
            promise = promise.then(chain.shift(), chain.shift());
        }
        
        return promise;
    }

}