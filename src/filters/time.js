import Vue from 'vue'

//import moment from 'moment'
import format from 'date-fns/format'
//自定义过滤器
Vue.filter('dataFormat',function(value){
//	return moment(value).format('YYYY-MM-DD HH:mm:ss')
	return format(value,'yyyy-MM-dd HH:mm:ss')
})
