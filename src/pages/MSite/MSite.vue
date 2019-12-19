<template>
    <!--首页外卖-->
      <div class="msite">
        <!--首页头部-->
        <!--<header class="msite_header">
          <span class="header_search">
            <i class="iconfont" style="margin-left: 10px;">&#xe602;</i>
          </span>
          <span class="header_title">
            <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
          </span>
          <span class="header_login">
            <span class="header_login_text">登录|注册</span>
          </span>
        </header>-->
        
        <HeaderTop :title="address.name"> 
        	<span class="header_search" slot="left">
	            <i class="iconfont" style="margin-left: 10px;">&#xe602;</i>
	        </span>
	        <span class="header_login" slot="right">
	            <span class="header_login_text">登录|注册</span>
	        </span>
        </HeaderTop>
        <!--首页导航-->
        <nav class="msite_nav">
          	<div class="swiper-container" v-if="categorys.length">
	            <div class="swiper-wrapper">
	              <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key='index'>
	                <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
	                  <div class="food_container">
	                    <img :src="baseImageUrl+category.image_url">
	                  </div>
	                  <span>{{category.title}}</span>
	                </a>
	              </div>
	            </div>
            	<!-- Add Pagination -->
            	<div class="swiper-pagination"></div>
          	</div>
        	<img src="./images/msite_back.svg" alt="back" v-else>
        	<hr>
        </nav>
        <!--首页附近商家-->
        <div class="msite_shop_list">
          <div class="shop_header">
            <i class="iconfont">&#xe60c;</i>
            <span class="shop_header_title">附近商家</span>
          </div>
          <ShopList></ShopList>	
        </div>
      </div>
   
</template>

<script>
	import {mapState} from 'vuex'
	import HeaderTop from '../../components/HeaderTop/HeaderTop.vue'
	import ShopList from '../../components/ShopList/ShopList.vue'
	
	import Swiper from 'swiper'
	import 'swiper/dist/css/swiper.min.css'
	
	export default{
		data(){
			return{
				baseImageUrl:'https://fuss10.elemecdn.com'
			}
		},
		mounted(){
			this.$store.dispatch('getCategorys')
		},
		watch:{   //事件监听，当轮播更新后立即创建swiper实例
			categorys(value){  //当categorys的数据发生改变时触发事件
				this.$nextTick(function(){
					//创建一个swiper实例对象
					new Swiper('.swiper-container',{
						loop:true,
						pagination:{
							el:'.swiper-pagination',
						},
					})
				})
			}
		},
		computed:{
			...mapState(['address','categorys']),
			//根据categorys一维数组生成一个二维数组
			categorysArr(){
				const {categorys}=this
				//准备一个空的二维数组
				const arr=[];
				//准备一个小数组
				let minarr=[];
				categorys.forEach(c => {
					//如果小数组满了，创建一个新的
					if(minarr.length===8){
						minarr=[]
					}
					//如果minarr是空的，将小数组保存到大数组中
					if(minarr.length===0){
						arr.push(minarr)
					}
					minarr.push(c);
				})
				return arr;
			}
		},
		components:{
			HeaderTop,
			ShopList
		}
	}
</script>

<style lang="scss" scoped>
	ul,li,a,img,div,h1,p{
		margin: 0;
		padding: 0;
	}
	.msite{
		/*height:45px;
		background-color: #02a774;
		z-index: 100;*/
		position: relative;
    	top: 45px;
		.msite_nav{
			height:200px;
			.swiper-slide{
				height:200px;
				background-color:#fff;
				a.link_to_food{
					width:70px;
					height:60px;
					float:left;
					margin: 10px 12px 10px 11px;
					img{
						width: 60px;
						height: 55px;
						
					}
					span{
						color:#000;
						display: block;
						width: 60px;
						font-size: 10px;
						text-align: center;
					}
				}
			}
		}
		.msite_shop_list{
			background-color:#fff;
			height: auto;
			.shop_header{
				/*height: 30px;*/
				.shop_header_title{
					line-height: 30px;
					color: #999;
				}
			}
		}
	}
		
		
</style>