<template>
  <transition name="message-fade">
    <div v-if="visible" :class="wrapClasses">
        <img class="message_img" :src="typeImg"/>
        <span style="">
          {{message}}
        </span>
    </div>        
  </transition>
</template>

<script>
  const prefixCls = 'message'
  export default {
    name: 'message',
    data () {
      return {
        visible: false,
        type:'info',
        message: '',
        duration: 3000
      }
    },
    computed:{
      typeImg(){
        return require(`./assets/${this.type}.png`);
      },
      wrapClasses(){
        return[
          `${prefixCls}`,
          `${prefixCls}-${this.type}`
        ]
      }
    },
    methods: {
      setTimer() {
        setTimeout(() => {
          this.close() // 3000ms之后调用关闭方法
        }, this.duration)
      },
      close() {
        this.visible = false
        setTimeout(() => {
          this.$destroy(true)
          this.$el.parentNode.removeChild(this.$el) // 从DOM里将这个组件移除
        }, 500)
      }
    },
    mounted() {
      this.setTimer() // 挂载的时候就开始计时，3000ms后消失
    }
  }
</script>

<style scoped>
    .message-fade-enter-active, .message-fade-leave-active {
        transition: all .3s ease;
    }
    .message-fade-enter, .message-fade-leave-to  {
        transform: translateY(-20px);
        opacity: 0;
    }
    .message{
        position: fixed;
        top: 15px;
        right: 36%;
        width: 25%;
        height: 50px;
        line-height: 50px;
        border-radius:4px; 
        color: #616060;
        font-size: 15px;
    }
    .message-close{
        position: absolute;
        top: 25%;
        right: 10px;
        color: rgba(153, 152, 152, 0.774);
        cursor: pointer;
        font-size: 14px;
    }
    .message-close:hover{
        color: #0c0c0c;
    }
    .message_img{
      vertical-align:middle;
      margin-left: 20px;
      padding-bottom: 5px;
      width:17px;
      margin-right: 4px;
    }
    .message-success{
        background: #ebfcf4d3;
        color: rgb(48, 194, 104);
    }
    .message-info{
        background: #dbe4e9c5;
        color: #909399;
    }
    .message-warning{
        color: #ecae51;
        background: #ffdec9;
    }
    .message-error{
        background: #ffe2e2;
        color: rgb(255, 108, 108);
    }
</style>
