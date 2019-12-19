//直接更新states的多个方法的对象
import Vue from 'vue'
import {
	recevice_address,
	recevice_categorys,
	recevice_shops,
	recevice_goods,
	recevice_ratings,
	recevice_info,
	increment_food_count,
	decrement_food_count,
	clear_cart,
	recevice_search_shops
} from './mutation-types'

export default{
	[recevice_address](state,{address}){
		state.address=address
	},
	[recevice_categorys](state,{categorys}){
		state.categorys=categorys
	},
	[recevice_shops](state,{shops}){
		state.shops=shops
	},
	[recevice_goods](state,{goods}){
		state.goods=goods
	},
	[recevice_ratings](state,{ratings}){
		state.ratings=ratings
	},
	[recevice_info](state,{info}){
		state.info=info
	},
	
	[increment_food_count](state,{food}){
		if(!food.count){   //第一次增加
//			food.count=1;  //新增加属性(这样写没有数据绑定效果)
			//Vue.set(对象，属性名，属性值)
			Vue.set(food,'count',1)   //让新增的属性也具有属性绑定
			//将food添加到cartFoods中
			state.cartFoods.push(food); 
		}else{
			food.count++
		}
	},
	[decrement_food_count](state,{food}){
		if(food.count){
			food.count--
			if(food.count===0){
				//如果count等于0，将food从cartFoods删除
				state.cartFoods.splice(state.cartFoods.indexOf(food),1);
			}
		}
	},
	[clear_cart](state){
		//清除food中的count
		state.cartFoods.forEach((food)=>{
			food.count=0
		})
		//清空购物车所有项
		state.cartFoods=[]
	},
	
	[recevice_search_shops](state,{searchShops}){
		state.searchShops=searchShops
	},
}
