import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as types from './static/js/types';
import axios from './static/js/http';
import './static/css/base.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//绑定到Vue的实例方法上
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: function () {
    console.log('App created');
    if (localStorage.token && localStorage.token != undefined) {
      this.$store.commit(types.LOGIN, {
        token: localStorage.token,
        sessionId: localStorage.session
      });
      let self = this;
      console.log('refreshToken begin!');
      setTimeout(function () {
        self.$axios.post('/auth/refreshToken.json').then(result => {
          console.log('refreshToken...');
          if (result) {
            console.log(result.data);
            console.log("token: " + result.data.data.token);
            console.log("sessionId: " + result.data.data.sessionId);
            self.$store.commit(types.LOGIN, {
              token: result.data.data.token,
              sessionId: result.data.data.sessionId
            });
            console.log('refreshToken over!');
          }
        });
      }, 200);
    } else {
      this.$store.commit(types.LOGOUT);
    }
  },
  render: h => h(App)
}).$mount('#app')
