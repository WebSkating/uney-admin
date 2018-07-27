import md5 from 'md5';
export default {
  install: function (Vue, options) {
    Vue.prototype.$md5 = md5;
  }
}
