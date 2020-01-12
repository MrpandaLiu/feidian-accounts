<template>
<div class="overall">
    <div class="register">
        <div class="register-img">
            <img src="../assets/1.png" />
        </div>

        <div class="register-right">
            <div class="registerNav">
                <a href="http://www.52feidian.com"><!-- <img src="../images/logo.png"/> -->沸点官网</a>
                <span @mouseover="handleDisplay" @mouseout="handleMiss">沸点交流群</span>
                <a href="http://wiki.feidian.hzau.edu.cn/">wiki账户</a>
                <span><router-link to="/login">登录</router-link></span>
            </div>

            <img src="../assets/feidian.png" id="myDiv">

            <div class="register-h">
                 <h1>欢迎加入沸点</h1>
                 <h3>每一天,都要进步!</h3>  
            </div>

        <div class="register-message">
           <div class="form">
                <div>
                    <input 
                        type="text" 
                        class="form-input" 
                        placeholder="邮箱" 
                        :class="{error:error.email}"
                        @blur="handleError('email'),sendEmail('email')"                       
                        v-model="registerForm.email"/>
                    <transition name="display">
                        <i v-show="error.email"><span class="icon">!</span>邮箱不能为空</i>
                    </transition>
                </div>
                <div>
                    <input 
                        type="password" 
                        class="form-input" 
                        placeholder="密码"
                        :class="{error:error.password}"
                        @blur="handleError('password')"
                        v-model="registerForm.password"/>
                    <transition name="display">
                        <i v-show="error.password"><span class="icon">!</span>密码不能为空</i>
                    </transition>
                </div>
                <div>
                    <input 
                        type="password" 
                        class="form-input" 
                        :class="{error:confirmPassError}"
                        placeholder="确认密码" 
                       
                        v-model="registerForm.confirmPass"/>
                    <transition name="display">    
                        <i v-show="confirmPassError"><span class="icon">!</span>密码不匹配</i>
                    </transition>
                </div>

                <div>
                    <input 
                        type="text" 
                        class="form-input"
                        :class="{error:error.firstName}"
                        placeholder="姓氏"
                        v-model="registerForm.firstName"
                        @blur="handleError('firstName')"/>
                    <transition name="display">
                        <i v-show="error.firstName"><span class="icon">!</span>姓氏不能为空</i>
                    </transition>
                </div>

                <div>
                    <input 
                        type="text" 
                        class="form-input"
                        :class="{error:error.lastName}"
                        placeholder="名字"
                        v-model="registerForm.lastName"
                        @blur="handleError('lastName')"/>
                    <transition name="display">
                        <i v-show="error.lastName"><span class="icon">!</span>名字不能为空</i>
                    </transition>
                </div>

                <div>
                    <input 
                        type="text" 
                        class="form-input"
                        :class="{error:error.spell}"
                        placeholder="姓名的拼音(全拼)"
                        v-model="registerForm.spell"
                        @blur="handleError('spell')"/>
                    <transition name="display">
                        <i v-show="error.spell"><span class="icon">!</span>内容不能为空</i>
                    </transition>
                </div>

                <div>
                    <input 
                        type="text" 
                        class="form-input"
                        :class="{error:error.id}"
                        placeholder="学号"
                        v-model="registerForm.id"
                        @blur="handleError('id')"/>
                    <transition name="display">
                        <i v-show="error.id"><span class="icon">!</span>学号不能为空</i>
                    </transition>
                </div>
                <div>
                    <select name="select" class="select" v-model="registerForm.group">
                        <!-- <option value="预备成员">预备成员</option> -->
                        <option value="大前端">大前端</option>
                        <option value="java">java</option>
                        <option value="ios">ios</option>
                        <option value="信息安全">信息安全</option>
                    </select>
                </div>
               
            </div>
            <a href="#" @click="handleReg">立即注册</a>
        </div>
        
    </div> 
    </div>
</div>
</template>

<script>
import $ from '../libs/util.js'
export default {
    data() {
        return{
            registerForm:{
                email:'',
                password:'',
                confirmPass:'',
                firstName:'',
                lastName:'',
                spell:'',
                id:'',
                group:'预备成员',
            },
            error:{
                email:false,
                password:false,
                firstName:false,
                lastName:false,
                spell:false,
                id:false,
                group:false
            },
        }
    },
    computed:{
        confirmPassError:function() {
            return this.registerForm.password != this.registerForm.confirmPass;
        },
    },
    methods:{
        handleError (value) {
            if(this.registerForm[value] === '') this.error[value] = true;
            else this.error[value] = false;
        },
        handleReg () {
            
            if(this.registerForm.email ==='' || this.registerForm.password === '' || this.registerForm.confirmPass === ''|| this.registerForm.firstName === '' || this.registerForm.spell === '' || this.registerForm.lastName === ''|| this.registerForm.group === ''){

                this.$message.warning('请完善您的基本信息!')
            }
            else if(this.registerForm.password != this.registerForm.confirmPass){
                this.$message.warning('请确认密码输入是否一致!');
            }
            else{
                $.ajax.post('/register',this.$qs.stringify(this.registerForm)).then((res) =>{
                    if(res.status === 200  && res.data.status ===1){
                        //alert('注册成功，请登录！');
                        this.$message.success('注册成功,请登录!')
                    }else{
                        this.$message.warning(res.data.error);
                    }
                    // console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
            }
                // this.$store.dispatch('handleReg',this.registerForm);
        },
        handleDisplay () {
            //this.$refs.qq.style.display = 'inline';
            // var bigImg = document.createElement("img");
            // big.src = "../assets/feidian.png/";
            // var myDiv = document.getElementById("myDiv");
            // myDiv.appendChild(bigImg);
            var myDiv1 = document.getElementById('myDiv');
            myDiv1.style.display = 'block';
        },
        handleMiss () {
            //this.$refs.qq.style.display = 'none';
            document.getElementById('myDiv').style.display = 'none';
        },
        sendEmail () {
            var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var domains= ["qq.com","163.com","vip.163.com","263.net","yeah.net","sohu.com","sina.cn","sina.com","eyou.com","gmail.com","hotmail.com","42du.cn","126.com"];
            if(pattern.test(this.registerForm.email)) {
                var domain = this.registerForm.email.substring(this.registerForm.email.indexOf("@")+1);
                for(var i = 0; i< domains.length; i++) {
                    if(domain == domains[i]) {
                        return true;
                    }
                }
            }
            //return this.registerForm.email.false;
            this.$message.warning('提醒：请输入正确的邮箱格式！')
        }

    },
}
</script>

<style scoped>
    *{
        margin: 0px;
        padding: 0px;
    }
    .overall {
        width: 100%;
        height: 100%;
    }
    .register {
        height: 99.6%;
        /*border:  1px solid green;*/
        width: 100%;
    }

    .register-img {
        width: 35%;
        display: inline-block;
        height: 99.5%;
        position: fixed;
    }
    .register-img img{
        width: 100%; 
        height: 100.3%;
        /* height: 678px; */
        /* display: block;
        float: left;    */
    }

    .register-right{
        width: 58%;
        height: 99%;
        float: right;
        margin-right: 8px;
    }

    .registerNav {
        margin-top: 20px;
        margin-left: 50px; 
        width: 94%;
        height: 5%;
        display: inline-flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        font-size: 20px;
        position: relative;
    }
    .registerNav img {
        vertical-align: middle;
        width: 21px;
        padding-right: 5px;
    }
    .registerNav .feidian{
        position: absolute;
        top:60px;
        width: 150px;
        display: none;
    }
    .registerNav span,.registerNav a{
        /*font-size:17px; */
        font-weight:100px; 
        padding-right: 25px;
        color: rgb(116, 107, 107);
        cursor: pointer;
        /*background-color: #2d8cf0;
        border-radius: 3px;*/
    }
    .registerNav span:hover,.registerNav a:hover{
        color: black;
    }
    
    .register-h{
        margin-left: 75px; 
        width: 70%;
        height: 12%;
    }
    h3{
        padding: 15px 0 0 10px;
        font-weight: 100;
        /*margin-left: 30px;*/
    }
    h1{
        padding: 50px 0 0 10px;
        font-weight: 100;
    }

    .register-message {
        width: 55%;
        height: 66%;
        float: left;
        margin-top: 10px;
        margin-left: 180px;
        overflow: hidden;
    }
     /*.register-message{
        float: right;
        padding: 30px 120px 0px 0px;
        width: 40%;
        /*overflow: scroll;
    }*/
    .register-message div{
        padding-top:10px;
    }
    .register-message .select{
        width: 200px;
        height: 49px;
        background: #fff;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        -moz-appearance: none;
        padding-left: 10px;
        outline: none;
        color: #657180;
        font-size: 16px;
    }
    .register-message div i{
        display: block;
        color: red; 
        font-size: 14px;
        padding: 5px 0 0 5px;
    }
    .form-input{
        width: 88%;
        height: 35px;
        font-size: 16px;
        padding: 6px 10px;
        border: 1px solid #d7dde4;
        border-radius: 4px;
        color: #657180;
        outline: none;
        background: #fff;
    }
    .form-input:focus {
        border: 1px solid #3399ff;
    }
    .register-message a{
        display: inline-block;
        padding: 5px 28%;
        margin-top: 30px;
        margin-bottom: 50px;
        margin-left: 40px;
        cursor: pointer;
        border-radius: 4px;
        font-size: 22px;
        color: #fff;
        background: #2d8cf0;
        transition: background .3s ease;
    }
    .register-message a:hover{
        background:#1a7fec;
    }
    .error{
        border: 1px solid #ff5500;
    }
    .icon{
        display: inline-block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 50%;
        background: #ff5500;
        color: #fff;
        font-size: 16px;
        margin-right: 5px;
    }
    .display-enter-active{
        animation: display-in .3s;
    }
    .display-leave-active{
        animation: display-in .3s reverse;
    }
    @keyframes display-in{
        0%{
            height: 0;
        }
        25%{
            height: 5px;
        }
        50%{
            height: 10px;
        }
        75%{
            height: 15px;
        }
        100%{
            height: 20px;
        }
    }
    #myDiv{
        width: 162px;
        height: 222px;
        display: none;
        margin-left: 31%;
    }
</style>
