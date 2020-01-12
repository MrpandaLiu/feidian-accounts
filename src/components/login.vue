<template>
<div class="login-body">
    <div class="login">
        <div class="logo">
            <img src="../assets/logo.png"/>
        </div>
        <h3 class="title">Welcome to feidian</h3>
        <div class="user-info">
            <div class="login-message">
                <input type="text" v-model="email" placeholder="请输入邮箱" class="login-name" :class="{error:this.errorEmail}"/>
                <span>*</span>
                <p v-if="errorEmail">内容不能为空</p>
            </div>
            <div class="login-message">
                <input type="password" v-model="password" placeholder="请输入密码" class="login-password" :class="{error:this.errorPassWord}" @keyup.enter="handleLogin"/>
                <span>*</span>
                <p v-if="errorPassWord">内容不能为空</p>
            </div>
            
        </div>
        <div class="checkbox">
            <input type="checkbox" v-model="checked"/>
            <span>记住密码</span>
        </div>
        
        <div class="DIVbutton">
            <a class="button" @click="handleLogin">登 录</a>
        </div>
        
        <div class="goToReg">
            <span>还没有沸点账号？</span>
            <router-link to="/register" >立即注册</router-link>
        </div>
    </div>
</div>
</template>

<script>
import $ from '../libs/util.js'
export default {
    data () {
        return {
            email:'',
            password:'',
            errorEmail:false,
            errorPassWord:false,
            checked:false,
        }
    },
    computed:{
        form:function() {
            return {
                email:this.email,
                password:this.password
            }
        }
    },
    methods:{
        handleLogin () {
            if(this.email === '' || this.password === ''){
                if(this.email === '') this.errorEmail = true;
                if(this.password === '') this.errorPassWord = true;
            }else{
                this.errorEmail = false;
                this.errorPassWord = false;
                $.ajax.post('/login',this.$qs.stringify(this.form) ).then((res) => {
                    if(res.status === 200){
                        if(res.data.status === 0){
                            this.$message.warning(res.data.error)
                        } else{
                            console.log(res.data.token)
                            console.log(this.$store.state)
                            this.$store.dispatch('setToken',res.data.token)
                            this.$store.dispatch('getLoginMess',this.form.email)
                            if(res.data.user == "admin"){
                                this.$router.push({path:'/operator',query:{email:this.email}})
                            } else{
                                this.$router.push({path:'/index',query:{email:this.email}})
                            } 
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        },
        setChecked() {
            this.checked = document.cookie.length > 0
        },
        setCookie(c_name, c_pwd, exdays) {
            var exdate = new Date(); //获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
            window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        },
        getCookie: function() {
            if (document.cookie.length > 0) {
                var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                for (var i = 0; i < arr.length; i++) {
                    var arr2 = arr[i].split('='); //再次切割
                    //判断查找相对应的值
                    if (arr2[0] == 'userName') {
                        this.email = arr2[1]; //保存到保存数据的地方
                    } else if (arr2[0] == 'userPwd') {
                        this.password = arr2[1];
                    }
                }
            }
        },
        clearCookie: function() {
            this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
        },
    },
    watch:{
        checked(val){
            if(val){
                this.setCookie(this.email, this.password, 7);
            }else{
                this.clearCookie();
            }
            //console.log(val);
        },
    }, 
    mounted (){
        this.setChecked();
        this.getCookie();
    }
    
}

</script>

<style scoped>
    *{
        /*margin-top: 10px;*/
        margin: 0;
        padding: 0;
    }
    .login-body{
        width: 99%;
        height: 100%;
    }
    .login {
        width: 450px;
        height: 600px;
        font-size: 14px;
        margin: auto;
        text-align: center;
        border-radius: 6px;
        background:#ffffff;
    }
    .login .logo img{
        width: 140px;
        padding-left: 30px;
        margin: 60px auto 0;
    }
    .user-info .login-message{
        padding: 10px 10px;
    }
    .login .title{
        font-weight: 600;
        font-size: 30px;
    }
    .login-password,.login-name {
        width: 250px;
        height: 40px;
        padding: 0 18px;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        color: #657180;
        outline: none;
        font-size: 18px;

    }
    input:focus {
        border: 1px solid #3399ff;
    }
    .user-info span,.user-info p{
        
        color: red; 
    }
    .checkbox{
        width: 297px;
        /* height: 40px; */
        display: inline-block;
        text-align: left;
        color: #17233d;
        font-size: 16px;
        margin-top: 10px;
    }
    .button {
        display: inline-block;
        cursor: pointer;
        border-radius: 4px;
        color: #fff;
        background: #2d8cf0;
        margin-top: 20px;
        padding: 8px 80px;
    }
    .button:hover{
        background:#5cadff;
    }
    .goToReg {
        margin-top: 20px;
        padding-right: 86px;
        text-align: right;
        color: #9ea7b4;
        font-size: 16px;
    }
    .goToReg a:hover{
        color: #027efad8;
        text-decoration: underline;
    }
    .error{
        border: 1px solid red;
    }
</style>
