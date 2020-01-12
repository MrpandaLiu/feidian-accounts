<template>
    <div class="pager">
        <span>共{{totalData.length}}条数据</span>
        <button 
            class="btn btn-pager" 
            :class="{disable:current ===1}"
            :disabled="this.current === 1"
            @click="prePage"
            >上一页</button>
        <span 
            v-if="pageTitle != 0" 
            class="page-index num" 
            :class="{active:current===1}" 
            @click="goToPage(1)"
        >1</span>

        <span v-if="preClipped" class="page-index">...</span>
        <span 
            v-for="index in pages" 
            :key='index'
            class="page-index num"  
            :class="{active:current===index}"
            @click="goToPage(index)"
        >{{index}}</span>

        <span v-if="backClipped" class="page-index">...</span>
        <span   
            v-if="pageTitle != 1"
            class="page-index num" 
             id="page" 
            :class="{active:pageTitle === current}" 
            @click="goToPage(pageTitle)"
            >{{pageTitle}}</span>

        <button 
            class="btn btn-pager"
            :class="{disable:current === pageTitle}" 
            :disabled="this.current === pageTitle"
            @click="nextPage"
            
            >下一页</button>
            <!-- :disabled="this.current === pageTitle"  -->  
    </div>
</template>

<script>
export default {
    props:{
        totalData:{
            type:Array
        },
        current:{
            type:Number,
            default:1
        },
    },
    data(){
        return{
            preClipped:false,
            backClipped:true,
            currentValue:this.current
        }
    },
    methods:{
        prePage(){
            if(this.currentValue > 0){
                this.currentValue--;
            }else{
                return ;
            }
        },
        nextPage(){
            if(this.totalData.length != 0){
                this.currentValue++; 
            }else{
                return ;
            }
        },
        goToPage(index){
            this.currentValue = index;
        },
    },
    computed:{
        pageTitle:function(){//计算页数，由父组件传来的数据计算
            let arr = [...this.totalData];
            var aa = Math.ceil(arr.length/9);
            if(aa > 0){
                return aa;
            }else{
                return 1;
            }
            // return aa;
            // if(arr.length == 0){
            //      document.getElementById('page').style.display = 'none';
            //      return aa;
            // }
        },
        pages:function(){//计算那一页显示
            let arr = [];
            //添加前面显示的页码
            if(this.currentValue>3){
                arr.push(this.currentValue-2);
                arr.push(this.currentValue-1);
                if(this.currentValue>4){
                    this.preClipped = true
                }
            }else{
                this.preClipped = false;
                for(let i = 2;i<this.currentValue;i++){
                    arr.push(i);
                }
            }  
            //将当前的页码添加到显示数组中
            if(this.currentValue!==this.pageTitle && this.currentValue!==1){
                arr.push(this.currentValue);
            }
            //添加后面显示的页码
            if(this.currentValue<(this.pageTitle-2)){
                arr.push(this.currentValue+1);
                arr.push(this.currentValue+2);
                if(this.currentValue<=(this.pageTitle-3)){
                    this.backClipped = true;
                }
            }else{
                this.backClipped = false;
                for(let i =this.currentValue+1 ;i<this.pageTitle;i++){
                    arr.push(i);
                }
            }
            return arr;
        }
    },
    watch:{
        currentValue(val){
            this.$emit('handleCurrent',val);
        },
        current(val){
            this.currentValue = val;
        }
        // totalData(){
        //     this.pages();
        // }
    }
}

</script>

<style scoped>
    .pager{
        margin-top: 30px;
        margin-left: -20%;
        margin-bottom: 2%;
        text-align: center;
    }
    .btn-pager{
        margin-left: 10px;
        width: 60px;
        height: 30px;
        text-align: center;
        background: #ffffff;
        color: #504f4f;
        border: 1px solid #e3e3e3;
        border-radius: 4px;
        transition: all .5s ease;
        cursor: pointer;
        outline:none;
    }
    .btn-pager:hover,.num:hover{
        color: #ffffff;
        background: #3399ff;
    }
    .page-index{
        display: inline-block;
        margin-left: 10px;
        width: 25px;
        height: 25px;
        line-height: 25px;
        background: #ffffff;
        cursor: pointer;
        color: #3a3a3a;
        border-radius: 4px;
        transition: all .5s ease;
    }
    .active{
        color: #ffffff;
        background: #3399ff;
        border-radius: 4px;
    }
    /*.disable{
        cursor: wait;
        color: #c5c8ce;
    }*/
    #page{
        display: inline-block;
    }
</style>