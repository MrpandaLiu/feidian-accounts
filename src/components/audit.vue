<template>
    <div class="index">
        <div class="index-introduce" :style="{height}">
            <img src="../assets/tianyi.jpg"/>
            <!-- <img src="../assets/logo.png"/> -->
            <div class="write">
                   Write The Code, Change The World
            </div>
            <div class="introduction">
                <p>沸腾的心</p>
                <p>飞扬的梦</p>
                <p>点滴积累</p>
                <p>共码未来</p>
            </div>
            <div>
                <ul>
                    <!-- <a @click="backCenter"><li>返回上级</li></a> -->
                    <a @click="backCenter"><li>返回上级</li></a>
                </ul>
            </div>
        </div>
        <div class="index-content">
            <div class="search">
                <input type="text" placeholder="输入搜索人姓名" v-model="search" @keydown.enter="handleSearch"/>
                <a @click="handleSearch">
                    <div class="input_search">
                    </div>
                </a>
            </div>
            <div class="main-text">
                <h4>关 键 词</h4>
                <div class="icon">
                    <span
                        v-for="(item,index) in keyCode"
                        :key="index"
                        @click="handleFilterByKey(item)">
                        {{item}}
                    </span>
                </div>
            </div>
            <div class="person-message">
                <h4>成 员 档 案</h4>
                <div class="person-message-content">
                    <div v-for="(data,index) in pageData" :key="index" >
                        <Addcard  v-if="!data.del && !data.pass" :data="data" ></Addcard>
                    </div>
                </div>
            </div>
            <Page :total-data="filterData" :current="current" @handleCurrent="changeCurrent"></Page>
        </div>
    </div>
</template>

<script>
import $ from '../libs/util.js'
import Addcard from './common/addcard.vue'
import Page from './common/page.vue'
export default {
    data(){
        return{
            search:'',
            keyCode:[
                '大前端',
                'java',
                'ios',
                '信息安全',
                /* '预备成员' */
            ],
            searchCode:'',
            current:1,
            email:this.$route.query.email
        }
    },
    components:{
        Addcard,
        Page
    },
    computed :{
        filterData:function(){
            let arr = [...this.datas];
            arr = arr.filter((item) => item.pass == false && item.del == false);
            if(this.searchCode != ''){
                arr = arr.filter((item) => item.group === this.searchCode);
            }
            return arr;
        },
        height:function(){
            return window.innerHeight+'px';
        },
        datas:function() {
            return this.$store.state.allMessage;
        },
        pageData:function(){
            let arr = [...this.filterData];
            let pageArr = arr.slice((this.current-1)*9,this.current*9);
            return pageArr; 
        },
        LoginMessage:function(){
           return this.$store.state.LoginMess;
        }
    },
    methods:{
        handleFilterByKey(keyCode){
             this.searchCode = keyCode;
        },
        handleSearch(){
            $.ajax.get('/search/name/'+this.search).then((res) => {
                if(res.status === 200){
                    if(res.data.status === 0){
                        this.$message.error('不存在该用户!');
                    }else{
                        this.$router.push('/person/'+res.data.result.email);
                    }
                }
            }).catch(error => {
                console.log(error);
            })
        },
        changeCurrent(val){
            this.current = val;
        },
        backCenter(){
            let newEmail = this.$store.state.LoginMess.email.replace('@','%40');
            this.$router.push('/operator?/email=' + newEmail);
        },
    },
    watch:{
        searchCode(){
            this.current = 1;
        }
    },
    mounted(){
        this.$store.dispatch('getAllMessage');
    }
}
</script>

<style scoped>
    .index{
        position: relative;
    }
    .index-introduce{
        /*background: #66CCCC;*/
        background: #333;
        color: #fff;
        text-align: center;
        float: left;
        width: 28%;
        /*height: 100%;*/
        padding: 0 40px;
        position: fixed;
        border-radius: 5px;
    }
    .index-introduce img{
        background: #ffffff;
        margin: 70px auto 30px auto;
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .index-introduce .introduction{
        font-weight: 300;
        width: 95%;
        text-indent: 40px;
        line-height: 28px;
        margin-top: 35px;
        margin-left: 15px;
        text-align: justify;
        font-family: Cursive ;
    }
    .index-introduce p{
        padding: 15px 0 7px 40px;
        font-size: 32px;
        text-indent: 33px;
        letter-spacing: 15px;
    }
    .index-introduce a {
        display: block;
        color: #fff;
        padding: 6px 14px;
        background: rgb(65,186,168);
        border-radius: 25px;
        margin-top: 30px;
        cursor: pointer;
        font-family: Cursive ;
        /*margin-left: -43px;*/
        margin-right: 2%;
        list-style-type:none;
    }
    .write{
        width:100%;
        font-size: 20px;
        margin-top: 45px;
    }
    .index-content{
        position: absolute;
        right: 0px;
        float: left;
        width: 55%;
        top: 60px;
       /* overflow:hidden;*/
    }
    .index-content h4{
        padding-left: 5px;
        margin-top: 20px;
        margin-bottom: 15px;
        font-weight: 200;
        color: #17233d;
        border-left: 3px solid rgb(65,186,168);
    }
    .index-content .search{
       /* width: 78%;*/
       width: 85%;
        height: 40px;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        background-color: #fff
    }
    .index-content .search input{
        width: 80%;
        height: 33px;
        padding: 1px 10px; 
        margin-top: 2px;   
        margin-left: 2px;
        border: 1px solid #fff;
        border-radius: 4px;
        color: #657180;
        outline: none;
    }
    .input_search{
        background-position: 0 -40px;
        background-image: url(https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite.png?max_age=2592000&v=f5857796791605d0757c4a057644a4de);
        width: 20px;
        height: 20px;
        float: right;
        margin-right: 12px;
        margin-top: 12px;
    }
    .input_search:hover{
        background-position: 0 -60px;
        background-image: url(https://y.gtimg.cn/mediastyle/yqq/img/icon_sprite.png?max_age=2592000&v=f5857796791605d0757c4a057644a4de);
    }
    .index-content .search a{
        color: #ffffff;
        background: #277fdd;
    }
    .index-content .main-text .icon{
        margin: 22px 0 15px 25px;
    }
    .index-content .main-text .icon span{
        padding:8.5px 20px;
        margin-right: 30px;
       /* background: #2db7f5;*/
       background: rgb(65,186,168);
        color: #ffffff; 
        border-radius: 4px;
        cursor:pointer;
    }
    .index-content .main-text .icon span:hover{
        background: #c0c0c0;
        /*background: rgb(142,130,138);*/
    }
    .person-message {
        margin-bottom: 5%;
    }
    .index-content .person-message .person-message-content{
        overflow: auto;
        padding-bottom: 16px;
        margin-left: -8px;
    }

</style>
