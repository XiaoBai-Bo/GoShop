import VueRouter from 'vue-router'

//import MSite from './pages/MSite/MSite.vue'
//import Order from './pages/Order/Order.vue'
//import Profile from './pages/Profile/Profile.vue'
//import Search from './pages/Search/Search.vue'

const MSite = () => import('./pages/MSite/MSite.vue')
const Order = () => import('./pages/Order/Order.vue')
const Profile = () => import('./pages/Profile/Profile.vue')
const Search = () => import('./pages/Search/Search.vue')

import Login from './pages/Login/Login.vue'
import Shop from './pages/Shop/Shop.vue'
import ShopGoods from './pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from './pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from './pages/Shop/ShopRatings/ShopRatings.vue'


// 3. 创建路由对象
var router = new VueRouter({
  routes: [
  	{'path':'/',redirect:'/msite'},
//	返回路由组件的函数,只有执行此函数才会加载路由组件,这个函数在请求对应的路由路劲时才会执行
  	{'path':'/msite',component:MSite,meta:{showFooter:true}},
  	{'path':'/order',component:Order,meta:{showFooter:true}},
  	{'path':'/profile',component:Profile,meta:{showFooter:true}},
  	{'path':'/search',component:Search,meta:{showFooter:true}},
  	{'path':'/login',component:Login},
  	{'path':'/shop',component:Shop,children:[
  		{'path':'',redirect:'/shop/goods'},
  		{'path':'/shop/goods',component:ShopGoods},
  		{'path':'/shop/info',component:ShopInfo},
  		{'path':'/shop/ratings',component:ShopRatings}
  	]}
  	
  ],
  linkActiveClass:'mui-active'   //覆盖默认路由高亮的类，默认的类叫link-activeroute-link-active
  
})

// 把路由对象暴露出去
export default router