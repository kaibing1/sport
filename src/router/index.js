import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from "../components/Welcome.vue"
import UserList from "../components/admin/UserList.vue"
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        redirect: '/login'

    },
    {
        path:'/login',
        component: Login
    },
    {
        path:'/home',
        component: Home,
        redirect: "/welcome",
        children:[
            {
                path:"/welcome",
                component:Welcome
            },
            {
                path:"/user",
                component:UserList
            }
        ]
    },
    
]

const router = new VueRouter(
    {
        routes
    }
)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject){
    if(onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err=>err)
}

router.beforeEach((to, from, next) => {
    //to and from are Route Object,next() must be called to resolve the hook}
    if(to.path=="/login") return next();
    const userFlag = window.sessionStorage.getItem("user");
    if (!userFlag){
        return next("/login");
    }
    next();
})
export default router