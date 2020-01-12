<template>
    <div class="person" >
        <div class="personMess">
            <div class="main-info">
                <img :src="message.avatar"/>
                <p>{{message.name}}</p>
                <p>{{message.email}}</p>
                <div @click="handleChange" v-if="message.email === Login.email">修改资料</div>
                <div @click="backBefore">返回上级</div>
            </div>
            <div class="all-info">
                <h1>{{message.group}}</h1>
                <p>昵称：{{message.nickname}}</p>
                <p>性别：{{message.sex}}</p>
                <p>生日：{{message.birthday | time}}</p>
                <p>年级：{{message.grade}}</p>
                <p>大学：{{message.college}}</p>
                <p>户籍所在地：{{message.homeTown}}</p>
                <p>工作地点：{{message.company}}</p>
                <p>加入时间：{{message.inTime | time}}</p>
                <p>电话：{{message.phone}}</p>
                <p>QQ：{{message.qq}}</p>
                <p>微信：{{message.weChat}}</p>
                <p>管理员:{{message.admin}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import $ from '../../libs/util.js'
export default {
    data(){
        return{
            email:this.$route.params.email,
            message:{},
        }
    },
    filters:{
        time(value) {
            var date = new Date(value);
            var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return date.getFullYear() + '-' + month + "-" + day;
        }
    },
    computed:{
        Login:function(){
            return this.$store.state.LoginMess;
            
        }
    },
    methods:{
        getMessage() {
            $.ajax.get('/byemail?email='+this.email).then((res) => {
                if(res.status === 200 && res.data.status === 1){
                    this.message = res.data.result;
                    //console.log(this.message);
                    this.inspect();
                }
                else{
                    alert(res.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            
        },
        handleChange(){
            this.$router.push('/change/'+this.email);
        },
        inspect(){
            if(this.message.email === this.Login.email){
                for(let k in this.message){
                    if(this.message[k] === null || this.message[k]===''){
                        this.$message.warning('请您尽快完善基本信息!');
                    }
                }
            }
            
        },
        backBefore(){
            let newEmail = this.Login.email.replace('@','%40');
            if(this.Login.admin === true){
                this.$router.push('/operator?email=' + newEmail);
            }else{
                this.$router.push('/index?email=' + newEmail);
            }
        }  
    },
    mounted() {
        this.getMessage();
        //console.log(this.Login);
    }
}
</script>

<style scoped>
    .person{
        width: 70%;
        height: 560px;
        margin: 3% auto;
        background: #f0f0f0;
    }
    .main-info{
        float: left;
        width: 30%;
        height: 450px;
        padding-top: 50px;
        border-right: 1px solid #aaa;
        text-align: center;
        margin-left: 90px;
        margin-top: 40px;
        padding-right: 30px;
    }
    .main-info img{
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right:15px;
    }
    .main-info p{
        font-size: 20px;
        padding: 5px 0px;
        margin-top: 5px;
        margin-right: 15px;
        border-bottom:1px dashed #dbdbdb; 
    }
    .main-info div{
        display: block;
        margin:25px auto;
        padding: 5px 15px;
        cursor: pointer;
        color: #ffffff;
        /*background: #2d8cf0;*/
        background:rgb(65,186,168);
        border-radius: 2px;
        width:40%;
    }
    .all-info{
        float: left;
        padding-left: 40px;
        margin-left: 20px;
        margin-top: 30px;
    }
    .all-info h1{
        font-weight: 100;
        margin-bottom: 10px;
    }
    .all-info p{
        font-size: 17px;
        padding-left: 10px;
        margin-top: 10px;
        padding-bottom: 5px;
        border-bottom:1px dashed #dbdbdb; 
    }
</style>
