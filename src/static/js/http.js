/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from '../../store'
import * as types from './types'
import router from '../../router'

// axios 配置
axios.defaults.timeout = 60000;
console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_BASEAPIADDR);
axios.defaults.baseURL = process.env.VUE_APP_BASEAPIADDR;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    console.log('Access-Token: ' + store.state.token);
    console.log('Session-Id: ' + store.state.session);
    if (store.state.token) {
      config.headers['Access-Token'] = store.state.token;
      config.headers['Session-Id'] = store.state.session;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log(response);
    let result = response.data;
    if (result.errorCode == '999000') {
    //   console.log(result);
      console.log(result.errorCode);
      store.commit(types.LOGOUT);
      router.replace({
        path: 'login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      });
    } else {
      return response;
    }

  },
  error => {
    console.log("---------------");
    console.log(error);
    console.log(error.response)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('response.status: 401');
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace({
            path: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
      }
    }
    //判断超时原因 路由跳转页面
    console.log(JSON.stringify(error)); //console : Error: Request failed with status code 402
    return Promise.reject(error.data);
  });

export default axios;
