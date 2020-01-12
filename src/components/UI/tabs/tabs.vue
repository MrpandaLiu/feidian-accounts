<template>
    <div class="tabs">
        <div class="tabs-title">
            <div v-for="(item,index) in navList"
                :key="index"
                :class="tabClass(item)"
                @click="handleChange(index)">
            {{item.label}}
            </div>
        </div>
        <div class="tabs-content">
            <slot></slot> 
        </div>
    </div>
</template>

<script>
export default {
    props:{
        value:{
            type:[String,Number]
        }
    },
    data(){
        return{
            currentValue:this.value,
            navList:[],
        }
    },
    methods:{
        getTabs(){//获取所有自己的名字为pane子组件
            return this.$children.filter((item) => {
                return item.$options.name === "pane";
            });
        },
        updateNav:function(){
            this.navList = [];
            var _this = this;
            this.getTabs().forEach(function(pane,index){
                _this.navList.push({
                    label:pane.label,
                    name:pane.name||index
                });
                //如果pane组件没有给出name那么默认设置是索引
                if(!pane.name)
                    pane.name = index;
                if(index === 0){
                    if(!_this.currentValue){
                        _this.currentValue = pane.name||index;
                    }
                }
            });
            this.updateStatus();
        },
        updateStatus(){//标题显示函数
            var tabs = this.getTabs();
            var _this = this;
            tabs.forEach((tab) =>{
                return tab.show = tab.name ===_this.currentValue;
            });
        },
        tabClass(item){//对选中的标题设置特殊的样式
            return [
                'tabs-tab', 
                {
                    'tabs-tab-active':item.name ===this.currentValue
                }
            ]
        },
        handleChange(index){
            var nav = this.navList[index];
            var name = nav.name
            this.currentValue = name;
            this.$emit('input',name);
        }
    },
    watch:{
        value(val){
            this.currentValue = val;
        },
        currentValue(){
            this.updateStatus();
        }
    },
    mounted(){
        
    }
}
</script>

<style scoped>
.tabs{
    font-size:14px;
    color: #657180;
    margin-top: 30px;
    width: 100%;
}
.tabs-title{
    width: 22%;
    height: 500px;
    padding-top: 40px;
    text-align: center;
    background: #333;
    float: left;
    color: #fff;
}
.tabs-title:after{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: rgb(65,186,168);
    margin-top: -1px;
}
.tabs-tab{
    padding: 12px 16px;
    cursor: pointer;
    position: relative;
    background: #333;
    margin-top: 10px;
    font-size: 16px;
}
.tabs-tab:hover{
    background-color: rgb(65,186,168);
}
.tabs-tab-active{
    background: rgb(65,186,168);
}
.tabs-tab-active:before{
    content: '';
    display: block;
   /* height: 1px;*/
   /* background: #3399ff;*/
    background: #333;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.tabs-content{
    margin-left: 60px;
    width: 65%;
    border: 1px solid /*rgb(155, 155, 155)*/ #dcdfe6;
    float: left;
    background: #fff;
    border-radius: 4px;
}
.pane{
    /*border: 1px solid green;*/
    margin-left: 30px;
    margin-top: 130px;
    line-height: 30px;
    font-size: 17px;
    padding-bottom: 40px;
}
</style>
