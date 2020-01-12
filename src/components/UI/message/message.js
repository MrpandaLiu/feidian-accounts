import Vue from 'vue'

const NoticeConstructor = Vue.extend(require('./message.vue').default) // 直接将Vue组件作为Vue.extend的参数,z在vue-loader13以上需要添加上.default

let nId = 1

const Message = (options) => {
  let id = 'notice-' + nId++;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }

  const NoticeInstance = new NoticeConstructor({
    data:options
  }) // 实例化一个带有content内容的Notice
  NoticeInstance.id = id
  NoticeInstance.vm = NoticeInstance.$mount() // 挂载但是并未插入dom，是一个完整的Vue实例
  NoticeInstance.vm.visible = true
  NoticeInstance.dom = NoticeInstance.vm.$el
  document.body.appendChild(NoticeInstance.dom) // 将dom插入body
  //NoticeInstance.dom.style.zIndex = nId + 1001 // 后插入的Notice组件z-index加一，保证能盖在之前的上面
  return NoticeInstance.vm
};
['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
      if (typeof options === 'string') {
        options = {
          message: options
        };
      }
      options.type = type;
      return Message(options);
    };
  });

export default  Message;
