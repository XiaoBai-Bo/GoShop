<template>
		
		<div class="search">
			<HeaderTop title="搜索"></HeaderTop>
			
			<form class="search_form" @submit.prevent="searched"> 
				<input type="search" class="search_input" placeholder="请输入商家名称" v-model="keyword"> 
				<input type="submit" class="search_submit" > 
			</form> 
			
			<div class="list" v-if="!noSearchShop">
				<ul class="list_container"> 
					<router-link 
						:to="{path:'/shop',query:{id:item.id}}"
						tag="li"
						class="list_li" 
						v-for="(item,index) in searchShops" 
						:key="index"> 
						<div class="item_left"> 
							<img :src="imgBaseUrl+item.image_path" class="restaurant_img">
						</div> 
						<div class="item_right"> 
							<div class="item_right_text"> 
								<p><span>{{item.name}}</span></p>
								<p>月售 {{item.recent_order_num}}单</p> 
								<p>{{item.float_minimum_order_amount}}元起送 / 距离{{item.float_delivery_fee}}公里</p> 
							</div> 
						</div> 
					</router-link> 
				</ul> 
			</div> 
			<!--搜索无结果显示-->
			<div class="list_no" v-else>很抱歉，无搜索结果！</div>
		</div>
</template>

<script>
	import HeaderTop from "../../components/HeaderTop/HeaderTop.vue"
	import {mapState} from 'vuex'
	import BScroll from 'better-scroll'
	export default{
		data(){
			return{
				keyword:'',
				imgBaseUrl:'http://cangdu.org:8001/img/',
				noSearchShop:false
			}
		},
		components:{
			HeaderTop
		},
		methods:{
			searched(){
				console.log('搜索成功');
				const keyword=this.keyword.trim();
				//有值进行请求
				if(keyword){
					this.noSearchShop=false;
					this.$store.dispatch('getSearchShops',keyword)
				}
			}
		},
		watch:{
			searchShops(value){
				if(!value.length>0){
					this.noSearchShop=!this.noSearchShop;
				}
			}
		},
		computed:{
			...mapState(['searchShops'])
		}
	}
</script>

<style lang="scss" scoped>
p{
	margin: 0;
	padding: 0;
}
.search{
	position: relative;
    top: 45px;
	.search_form{
	    margin: 5px;
		.search_input{
			width: 78%;
		}
		.search_submit{
			width: 20%;
		    background-color: #02a774;
	        border: 1px solid #02a774;
		}
	}
	.list_no{
		text-align: center;
	}
	.list{
	    /*overflow: hidden;*/
	    bottom: 50px;
	    top: -10px;
	    position: relative;
		.list_container{
			list-style-type: none;
		    margin: 0;
		    padding: 7px;
			.list_li{
				height: 70px;
    			border-bottom: 1px solid #ccc;	
				.item_left{
					float: left;
					.restaurant_img{
					width: 50px;
				    height: 50px;
				    display: block;
				    margin: 5px 10px 5px 0;
					}
				}
				.item_right{
					.item_right_text{
						
					}	
				}
			}
		}
	}
}
</style>