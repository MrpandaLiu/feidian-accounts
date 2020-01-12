import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/index'

Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path:'/login',
      meta:{
          title:'登录',
          
      },
        component: (resolve) => require(['../components/login.vue'],resolve)
    },
    {
        path:'*',
        redirect:'/login'
    },
    {
        path:'/register',
        meta:{
            title:'注册',
        },
        component: (resolve) => require(['../components/register.vue'],resolve)
    },
    {
        path:'/operator',
        meta:{
            requireAuth: true,
            title:'管理员中心',
        },
        component :(resolve) => require(['../components/operator.vue'],resolve)
    },
    {
        path:'/audit/:email',
        meta:{
            requireAuth: true,
            title:'审核成员',
        },
        component :(resolve) => require(['../components/audit.vue'],resolve)
    },
    {
        path:'/index',
        meta:{
            requireAuth: true,
            title:'账号中心',
        },
        component :(resolve) => require(['../components/index.vue'],resolve)
    },
    {
        path:'/person/:email',
        meta:{
            requireAuth: true,
            title:'个人信息'
        },
        component:(resolve) => require(['../components/common/person.vue'],resolve)
    },
    {
        path:'/change/:email',
        meta:{
            requireAuth: true,
            title:'修改资料'
        },
        component:(resolve) => require(['../components/common/change.vue'],resolve)
    }
  ]
});

router.beforeEach((to,from,next) => {
  window.document.title = to.meta.title;
  
   if (from.path!='/login' && to.meta.requireAuth && store.state.LoginMess.admin == false) {  // 判断该路由是否需要登录权限
    console.log(store.state.token)
    if (store.state.token) {  // 通过vuex state获取当前的token是否存在
/*         if(from.path == '/' && to.path.indexOf('change')!=-1 ){
            if(JSON.parse(window.localStorage.loginMess).email != to.params.email ){
                router.push('/')
            }
        } */
        console.log(store.state.token)  
        next();
    }
    else {
        next({
            path: '/',
            //query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        })
        console.log(store.state.token) 
    }
  }
  else {
    next();
  } 
 
});
router.afterEach((to,from,next) => {
  window.screenTo=(0,0); 
});
export default router;