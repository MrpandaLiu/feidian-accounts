import axios from 'axios';
import store from '../vuex/index'

const Util = {
    apiPath: 'http://218.199.68.208:8081/api',
    //apiPath: 'http://192.168.43.105:8081/api',
    //apiPath: 'http://192.168.3.141:8081/api'
    //读取cookie
    }

Util.ajax = axios.create({
    baseURL: Util.apiPath,
    headers:{'Content-Type':'application/x-www-form-urlencoded'}
});

 // http request 拦截器
Util.ajax.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
Util.ajax.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: '/',
                        //query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        //return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    }); 
Util.getLastDate = function(time) {
    var date = new Date(time);
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + month + "-" + day;
}


export default Util;