//通过mutation间接更新state的多个方法的对象
import {recevice_address,
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

import {reqAddress,reqFoodCategorys,reqShops,reqShopGoods,reqShopRatings,reqShopInfo,reqSearchShop} from '../api'
export default{
	//异步获取地址  
	async getAddress({commit,state}){
		//发送异步ajax请求
//		console.log("异步地址请求成功");
		const geohash=state.latitude+','+state.longitude;
		const result=await reqAddress(geohash);
		//提交一个mutation
		if(result.code===0){
			const address=result.data;
			commit(recevice_address,{address});
		}
	},
	//获取食品分类列表
	async getCategorys({commit}){
		//发送异步ajax请求
		const result=await reqFoodCategorys()
		//提交一个mutation
		if(result.code===0){
			const categorys=result.data
			commit(recevice_categorys,{categorys})
		}
	},
	//商家列表
	async getShops({commit,state}){
		//发送异步ajax请求
		const {latitude,longitude}=state;
		const result=await reqShops(latitude,longitude)
		//提交一个mutation
		if(result.code===0){
			const shops=result.data
			commit(recevice_shops,{shops})
		}
	},
	
		// 异步获取商家信息
	async getShopInfo({commit}) {
	    const result = await reqShopInfo()
	    if (result.code === 0) {
	      const info = result.data
	      commit(recevice_info, {info})
	    }
	  },
	
	  // 异步获取商家评价列表
	async getShopRatings({commit}, callback) {
	    const result = await reqShopRatings()
	    if (result.code === 0) {
	      const ratings = result.data
	      commit(recevice_ratings, {ratings})
	      // 数据更新了, 通知一下组件
	      callback && callback()
	    }
	  },
	
	  // 异步获取商家商品列表
	async getShopGoods({commit},callback) {
	    const result = await reqShopGoods()
	    if (result.code === 0) {
	      const goods = result.data
	      commit(recevice_goods, {goods})
	      // 数据更新了, 通知一下组件
	      callback && callback()
	    }
	  },
	  //同步更新food中count的值
  	updateFoondCount({commit},{isAdd,food}){
  		if(isAdd){    //如果为true
  			commit(increment_food_count, {food})	
  		}else{        //如果为false
  			commit(decrement_food_count, {food})
  		}
  		
  	},
  	//同步清空购物车
  	clearCart({commit}){
  		commit(clear_cart)
  	},
  	
  	//异步获取搜索商家列表数组
  	async getSearchShops({commit,state},keyword){
  		const geohash=state.latitude+','+state.longitude;
  		const result=await reqSearchShop(geohash,keyword);
  		if(result.code===0){
  			const searchShops = result.data
	      commit(recevice_search_shops, {searchShops})
  		}
  	}
}
