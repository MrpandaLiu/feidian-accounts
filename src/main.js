// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'//引入路由
import store from './vuex'//引入vuex
import qs from 'qs'
import Message from './components/UI/message/message.js'
Vue.prototype.$message = Message;
import './style.css';
Vue.prototype.$qs = qs;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
