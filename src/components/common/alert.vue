<template>
    <transition name="fade">
        <div v-if="!closed" :class="wrapClasses">
            <!--警告提示-->
            <span :class="messageClasses"><slot></slot></span>
            <!--警告提示辅助性文字-->
            <!-- <span :class="descClasses"><slot name="desc"></slot></span> -->
            <span :class="closeClasses" v-if="closabled" @click="close">x</span>
        </div>        
    </transition>
</template>

<script>
const prefixCls = 'alert';
export default {
    props:{
        type:{
            type:String,
            default:'success'
        },
        closabled:{
            type:Boolean,
            default:true
        },
        closed:{
            type:Boolean,
            default:false
        }
    },  
    data(){
        return{
            
            desc: false
        }
    },
    computed:{
        wrapClasses(){
            return[
                `${prefixCls}`,
                `${prefixCls}-${this.type}`,//类型样式
                // {
                //     [`${prefixCls}-with-desc`]: this.desc,
                // }
            ]
        },
        messageClasses () {
            return `${prefixCls}-message`;
        },
        // descClasses () {
        //     return `${prefixCls}-desc`;
        // },
        closeClasses () {
            return `${prefixCls}-close`;
        }
    },
    methods:{
        close (e) {
            this.closed = true;
            //this.$emit('close', e);
        }
    },
    // watch:{
    //     closed(val){
    //         if(val === false){
    //             setInterval(() => {
    //                 this.closed = true;
    //             },3000);
    //         }
    //         this.$emit('change',true);
    //     }
    // },
    mounted(){
        this.desc = this.$slots.desc !== undefined;
        // if(this.closed === false){
        //     setInterval(() => {
        //         this.closed = true;
        //     },2000);
        // }
    }
}
</script>

<style scoped>
    .fade-enter-active, .fade-leave-active {
        transition: all .3s ease;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateY(-20px);
        opacity: 0;
    }
    .alert{
        position: fixed;
        top: 15px;
        right: 36%;
        width: 25%;
        border-radius:4px; 
        padding: 10px 15px;
        color: #616060;
        font-size: 15px;
    }
    .alert-close{
        position: absolute;
        top: 25%;
        right: 10px;
        color: rgba(153, 152, 152, 0.774);
        cursor: pointer;
        font-size: 17px;
    }
    .alert-close:hover{
        color: #0c0c0c;
    }
    .alert-success{
        background: #cbecddd3;
        color: rgb(64, 179, 93);
    }
    .alert-info{
        background: #2db7f5;
    }
    .alert-warning{
        color: #fcb140;
        background: #fce5d7;
    }
    .alert-error{
        background: #ffe2e2;
        color: rgb(255, 108, 108);
    }
</style>
