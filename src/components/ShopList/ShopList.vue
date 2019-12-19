<template>
	<div class="shop_container">
        <ul class="shop_list" v-if="shops.length">
	        <li class="shop_li border-1px" v-for="(shop,index) in shops" :key="index" @click="$router.push('./shop')">
                <a class="a">
                  <div class="shop_left">
                    <img class="shop_img" :src="shop.image_path">
                  </div>
                  <div class="shop_right">
                    <div class="shop_detail_header">
                    	<p class="shop_title_pai">品牌</p>
                      	<h4 class="shop_title ellipsis">{{shop.name}}</h4>
                      	<ul class="shop_detail_ul">
	                        <li class="supports" v-for="(support,index) in shop.supports" :key="index">{{support.icon_name}}</li>
	                    </ul>
                    </div>
                    <div class="shop_rating_order">
                      <div class="shop_rating_order_left">
                        <Star :score="shop.rating" :size="24"></Star>
                        <div class="rating_section">
                          	{{shop.rating}}
                        </div>
                        <div class="order_section">
                          	月售{{shop.recent_order_num}}单
                        </div>
                      </div>
                      <div class="shop_rating_order_right">
                        <span class="delivery_style delivery_right">{{shop.delivery_mode.text}}</span>
                      </div>
                    </div>
                    <div class="shop_distance">
                      <p class="shop_delivery_msg">
                        <span>¥{{shop.float_minimum_order_amount}}起送</span>
                        <span class="segmentation">/</span>
                        <span>{{shop.piecewise_agent_fee.tips}}</span>
                      </p>
                    </div>
                  </div>
                </a>
            </li>
     	</ul>
    	<ul v-for="i in 6" v-else>
    		<li>
		    	<img src="./images/shop_back.svg" alt="back" >
    		</li>
    	</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import Star from '../Star/Star.vue'
	export default{
		data(){
			return{
//				baseImgUrl:'http://cangdu.org:8001/img/'
			}
		},
		mounted(){
			this.$store.dispatch('getShops')
		},
		computed:{
			...mapState(['shops']),
		},
		components:{
			Star
		}
	}
</script>

<style lang="scss" scoped>
	ul,li,a,img,div,h1,p{
		margin: 0;
		padding: 0;
	}
	.shop_container{
		width: 100%;
		.shop_list{
			display: block;
			.shop_li{
				display: block;
				height: 100px;
				list-style-type: none;
				border-bottom: 1px solid #ccc;
				margin-top: 5px;
				.a{
					.shop_left{
						float: left;
						width: 80px;
						height: 90px;
						margin-right: 8px;
						img.shop_img{
							width: 80px;
							height: 90px;
						}
					}
					.shop_right{
						height: 120px;
						display: flex;
						flex-direction: column;
						.shop_detail_header{
							float: left;
							.shop_title_pai{
								float: left;
								text-align: justify;
								height: 20px;
								background-color: orange;
								color: #000;
								margin: 5px 10px 0 0;
							}
							h4{
								float: left;
								color: #000;
								overflow: hidden;
							    text-overflow: ellipsis;
							    white-space: nowrap;
							    width: 8em;
							}
							ul{
								float: right;
								right: 0px;
								margin-left: 15px;
								line-height: 28px;
								margin-right: 5px;
								li{
									list-style-type: none;
									float: left;
									color: #000;
									border: 1px solid #ccc;
									padding: 0 2px;
								}
							}
						}
						.shop_rating_order{
							width: 100%;
							height: 30px;
							line-height: 30px;
							color: #000;
							font-size: 14px;
							.shop_rating_order_left{
								float: left;
								.rating_section{
									float: left;
								}
								.order_section{
									float: left;
									margin: 0 8px;
								}
							}
							.shop_rating_order_right{
								float: right;
								.delivery_right{
									margin-right: 13px;
									border:1px solid green;
									color: green;
								}
							}
						}
						.shop_distance{
							height: 30px;
							line-height: 30px;
						}
					}
				}
			}
		}
	}	
</style>