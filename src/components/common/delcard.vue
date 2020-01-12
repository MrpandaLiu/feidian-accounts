<template>
    <div class="card" @click="goPerson">
        <div><img :src="datas.avatar"/></div>
        <div>
            <span>{{datas.name}}</span>
        </div>
        <div>
            <span ref="email">{{datas.email}}</span>
        </div>
        <div>
            <span>{{datas.group}}</span>
        </div>
        <div   @click.stop="handleRemove">
            <span id="del">删除</span>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object
        },
        isAdmin:{
            type:Boolean,
            default:true
        }
    },
    computed:{
        datas(){
            if(this.data.avatar === null){
                this.data.avatar = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1543984094367&di=be8a79f4c24104da594dd8fbd164a3cd&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01d1865543ec5b0000019ae91b12c1.jpg%401280w_1l_2o_100sh.png'
            }
            return this.data;
        } 
    },
    methods:{
        goPerson() {
            let email = this.data.email;
            this.$router.push('/change/'+email); 
        },
        handleRemove() {
            let btn = confirm("请确认是否删除")
            if(btn == true){
                this.$store.dispatch('removeMess',this.data.email);
            }
        },
    },
    mounted(){
        console.log(this.$refs.email.innerText.length)
        if(this.$refs.email.innerText.length > 20){
            this.$refs.email.style.fontSize = 12 + "px"
        }
    }
}
</script>

<style scoped>
    .card{
        width: 25%;
        height: 250px;
        margin: 20px 10px 0 15px;
        border: 1px solid #DCDFE6;
        border-radius: 5px;
        text-align: center;
        float: left;
        transition: box-shadow 1s ease;
        cursor: pointer;
    }
    .card:hover{
        box-shadow: 2px 2px 20px 5px #888888;
    }
    .card img{
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: inline-block;
        margin: 20px auto;
        /* border-radius: 100%; */
    }
    .card  div span{
        display: inline-block;
        padding-bottom: 6px;
    }
    #del{
        color:red;
        font-weight:bold;
        font-size:11px;
        text-decoration:underline;
    }
</style>