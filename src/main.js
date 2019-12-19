// 入口文件
import Vue from 'vue'
import app from './App.vue'
import VueRouter from 'vue-router'   //导入路由，使用路由，导入router.js路由模块
Vue.use(VueRouter)
import router from './router.js'
import vueScroll from 'vuescroll'  //导入滚动条插件
import VueLazyload from 'vue-lazyload'
//import loading from './common/img/loading.gif'
Vue.use(VueLazyload, {   //内部自定义一个指令v-lazy
	loading:'./common/img/loading.gif'
})
//导入时间格式化插件
import './filters/time.js'
import store from './store'
import './mock/mockServer'  //加载mockServer即可

import Mint from 'mint-ui'   //导入Mint-ui组件
Vue.use(Mint)
//导入mui样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入Mint-ui
import { Search,Switch,MessageBox ,CellSwipe,Badge } from 'mint-ui';
Vue.component(Search.name, Search);
Vue.component(Switch.name, Switch);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Badge.name, Badge);

Vue.prototype.$messagebox = MessageBox
import './common/font/iconfont.css'
var vm=new Vue({
	el:'#app',
	render:c=>c(app),
	router,  //使用上vue-route
	store   //使用上vuex
})