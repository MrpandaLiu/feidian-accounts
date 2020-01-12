<template>
    <div class="change">
        <div class="change-header">
             <!-- <div>个人信息</div> -->
             <div>资料修改</div>
             <div class="save-a">
                <a @click="save" class="save">保&nbsp;存</a>
            </div>
        </div>

        <div class="allMessae">
            <tabs v-model="activeKey">
            
            <div class="remind">亲爱的盆友们，请认真修改你的信息！当所有的信息都修改完成后才能点击保存哦！</div>
            <div class="avatar">
                <div class="avatar-img">
                    <img :src="message.avatar">
                </div>
                <div class="avatar-a">
                    <a @click="showModel = true">修改头像</a>
                </div>
            </div>
            <Model v-if="showModel" @close="showModel = false" @confirm="updateAvatar">
                 <span slot="header">上传头像</span>
                <input type="file" @change="saveFile($event)" accept="image/*"  enctype="multipart/form-data" slot="body">
            </Model>

            <pane label="基本信息" name="0">
                <div>
                    <span>姓氏：</span>
                    <input type="text" v-model="message.firstName" style="margin-left: 42px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>名字：</span>
                    <input type="text" v-model="message.lastName" style="margin-left: 42px;border: 1px solid rgb(155, 155, 155);">
                </div>

                <div>
                    <span>密码：</span>
                    <input type="text" v-model="message.password" style="margin-left: 42px;border: 1px solid rgb(155, 155, 155);">
                </div>

                <div>
                    <span>昵称：</span>
                    <input type="text" v-model="message.nickname" style="margin-left: 42px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div style="display: none;">
                    <span>英文姓名： </span>
                    <input type="text" v-model="message.spell" disabled style="margin-left: 8px;border: 1px solid rgb(155, 155, 155);"> 
                </div>
                <div>
                    <span>性别:</span>
                    <input type="radio" id="one" value="男" v-model="message.sex" style="margin-left: 55px;">
                    <label for="one">男</label>
                    <input type="radio" id="two" value="女" v-model="message.sex" style="margin-left: 10px;">
                    <label for="two">女</label>
                </div>
                <div>
                    <span>出生日期:</span>
                    <input type="text" v-model="message.birthday" placeholder="输入格式1998-05-12" style="margin-left: 22px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>籍贯：</span>
                    <input type="text" v-model="message.homeTown" style="margin-left: 42px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>专业班级:</span>
                    <input type="text" v-model="message.className" style="margin-left: 22px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>学号:</span>
                    <input type="text" v-model="message.id" disabled  style="margin-left: 55px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>组别:</span>
                    <input type="text" v-model="message.group" style="margin-left: 55px;border: 1px solid rgb(155, 155, 155);background:#EBEBE4;" readonly="readonly">
                </div>
                <div>
                    <span>所属院系:</span>
                    <input type="text" v-model="message.college" style="margin-left: 22px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>入学年份:</span>
                    <input type="text" v-model="message.grade" style="margin-left: 22px;border: 1px solid rgb(155, 155, 155);">
                </div>
            </pane>
            <pane label="就业信息" name="１">
                <div>
                    <span>工作地点:</span>
                    <input type="text" v-model="message.workPlace"  style="margin-left: 22px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>工作单位:</span>
                    <input type="text" v-model="message.company" style="margin-left: 22px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>研究方向:</span>
                    <input type="text" v-model="message.job" style="margin-left: 22px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>就读高校:</span>
                    <input type="text" v-model="message.school" style="margin-left: 22px;border: 1px solid rgb(155, 155, 155);">
                </div>
            </pane>
            <pane label="联系方式" name="2">
                <div>
                    <span>QQ:</span>
                    <input type="text" v-model="message.qq" style="margin-left: 58px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>微信:</span>
                    <input type="text" v-model="message.weChat" style="margin-left: 52px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>电话:</span>
                    <input type="text" v-model="message.phone" style="margin-left: 52px;border: 1px solid rgb(155, 155, 155);">
                </div>
                <div>
                    <span>邮箱:</span>
                    <input type="text" v-model="message.email"  style="margin-left: 52px;border: 1px solid rgb(155, 155, 155);background:#EBEBE4;"  readonly="readonly">
                </div>
            </pane>
            </tabs>
        <!-- <a @click="save" class="save">保存</a> -->
        </div>
        <!-- <button @click="aaa">点击上传</button> -->
    </div>
</template>

<script>
import $ from '../../libs/util.js'
import tabs from '../UI/tabs/tabs.vue'
import pane from '../UI/tabs/pane.vue'
import Model from '../UI/model.vue'
export default {
    data(){
        return{
            email:this.$route.params.email,
            message:{},
            activeKey:'0',
            avatar:'',
            showModel:false
        }
    },
    components:{
        tabs,
        pane,
        Model
    },
    filters:{
        time(value) {
            var date = new Date(value);
            var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return date.getFullYear() + '-' + month + "-" + day;
        }
    },
    methods:{
        
        getMessage(){
            $.ajax.get('/byemail?email='+this.email).then((res) => {
                if(res.status === 200 && res.data.status === 1){
                    this.message = res.data.result;
                    this.transformTime();
                }
                else{
                    alert(res.data.error);
                }
            })
            .catch((error) => {
                console.log(error);
            })
        },
        transformTime(){
            this.message.inTime = $.getLastDate(this.message.inTime);
            this.message.birthday = $.getLastDate(this.message.birthday);
        },
        saveFile(e){
            this.avatar = e.target.files[0];
        },
        updateAvatar(){
            if(this.avatar === ''){
                this.showModel = false;
                this.$message.warning('请选择图片文件!'); 
            }     
            else{
                this.showModel = false;
                var formData = new FormData();
                formData.append('file',this.avatar);
                $.ajax.post('/upload/avatar',formData,{
                    headers:{'Content-Type':'multipart/form-data'}
                }).then((res) => {
                    if(res.status === 200)
                        //返回服务器上的图片路径
                        console.log(res);
                        this.message.avatar = res.data.result;
                })
                .catch((error)=>{
                    console.log(error);
                });
            }
            
        },
        save(){
            $.ajax.post('/change',this.$qs.stringify(this.message)).then((res) => {
                if(res.status === 200){
                    this.$message.success('修改成功!'); 
                    if(this.$store.state.LoginMess.admin === true){
                        let newEmail = this.$store.state.LoginMess.email.replace('@','%40');
                        this.$router.push('/operator?/email=' + newEmail);
                    }else{
                        let newEmail = this.$store.state.LoginMess.email.replace('@','%40');
                        this.$router.push('/index?/email=' + newEmail);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
    mounted() {
        this.getMessage();
        if(this.$route.params.email != this.$store.state.LoginMess.email  && this.$store.state.LoginMess.admin==false){
            this.$router.replace('/')
        } else{
            console.log("bingo")
        } 
    },
}
</script>

<style scoped>
    .change{
        position: relative;
        width: 80%;
        margin:3% auto;
        background: #f0f0f0;
        height: 780px;
    }
    .change-header{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        border-bottom: 2px solid rgb(155,155,155);
        margin-left: 120px;
        color: rgb(155,155,155);
        font-family:Arial,Helvetica,sans-serif;
        width: 75.7%;
        height: 2.5%;
        padding-bottom: 20px;
        padding-top: 20px;
        font-size: 24px;
        /*font-weight: 100;*/
    }
    .remind{
        margin-top: 20px;
        font-size: 15px;
        margin-left: 30px;
        text-indent: 33px;
        width: 82%;
    }
    .allMessae{
        float: left;
        margin-left: 120px;
        width: 80%;
    }
    .avatar{
        float: left;
        width: 40%;
        height: 120px;
        text-align: center;
        margin-left: 30px;
    }
    .avatar img{
        display: block;
        margin: 25px auto;
        width: 90px;
        height: 90px;
        border-radius: 5%;
        border: 1px solid rgb(155,155,155);
    }
    .avatar-img{
        width: 110px;
        height: 120px;
        margin-left: 100px;
    }
    .avatar a{
        margin-top: 10px;
        color: #fff;
        border-radius: 2px;
        cursor: pointer;
        padding: 5px 14px;
        background:rgb(65,186,168);
    }
    .avatar-a{
        float: left;
        margin-top: -100px;
    }
    span{
        padding: 5px;
        margin-top: 5px;
    }
    input{
        padding: 4px 5px;
        margin-top: 15px;
    }
    .save{
        color: #fff;
        cursor: pointer;
        padding: 6px 18px;
        background:rgb(65,186,168);
        bottom: 1px;
        margin-left: 120px;
        float: left;
        margin-bottom: 15px;
        font-size: 16px;
        margin-right: 15px;
        border-radius: 3px;
    }
    .save-a{
        margin-top: 25px;
        margin-bottom: 10px;
    }
</style>
