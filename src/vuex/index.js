import Vue from 'vue'
import Vuex from 'vuex'
import qs from 'qs'
import $ from '../libs/util.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        allMessage:[],
        LoginMess:JSON.parse(localStorage.getItem('loginMess')),
        token:""
    },
    getters:{
       
    },
    mutations:{
        setToken (state,token){
            state.token = token
        },
        setAllMess (state,arr){
            state.allMessage = arr;
        },
        setLoginMess (state){
            state.LoginMess = JSON.parse(localStorage.getItem('loginMess'));
        },
        updateAllMess(state,arr){
            state.allMessage = arr;
        },

    },
    actions:{
        setToken(context,token){
            context.commit('setToken',token)
        },
        getLoginMess(context,email){
            
            $.ajax.get('/byemail?email='+email).then((res) => {
                if(JSON.stringify(res.data.result)!=undefined){
                    localStorage.setItem('loginMess',JSON.stringify(res.data.result));
                }
                else{
                    localStorage.setItem('loginMess','naa');
                }
                
                context.commit('setLoginMess');
            })
            .then((error) => {
                console.log(error)
            })
        },
        getAllMessage (context){
            $.ajax.post('/all').then((res) => {
                if(res.status === 200)
                    context.commit('setAllMess',res.data.result);
                    console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
        },
        removeMess (context,str){
            $.ajax.post('/delete',qs.stringify({email:str})).then((res) => {
                if(res.status === 200){
                    location.reload()
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        addMess (context,str){
            $.ajax.post('/review',qs.stringify({email:str})).then((res) => {
                if(res.status === 200){
                    location.reload()
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        RefuseMess (context,str){
            $.ajax.post('/refuse',qs.stringify({email:str})).then((res) => {
                if(res.status === 200){
                    console.log(res)
                    location.reload()
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        },
        downloadNew(){
            $.ajax({
                method: 'post',
                url: '/downloadexcel',
                // headers里面设置token
                headers: {
                  loginCode: 'xxx',
                  authorization: 'xxx'
                },
                data: {
                  name: "panda",
                },
                // 二进制流文件，一定要设置成blob，默认是json
                responseType: 'blob'
              }).then(res => {
                const link = document.createElement('a')
                const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
                link.style.display = 'none'
                link.href = URL.createObjectURL(blob)
                link.setAttribute('download', `沸点成员表.xlsx`)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              })
        }
 
    }
});
export default store;