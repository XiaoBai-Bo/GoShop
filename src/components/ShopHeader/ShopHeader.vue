<template>
	<div class="shop-container">
		<div class="shop-header"> 
			<nav class="shop-nav" :style="{backgroundImage:`url(${info.bgImg})`}"> 
				<a class="back" @click="$router.back()">  
					<i class="iconfont">&#xe604;</i>
				</a> 
			</nav>  
			<div class="shop-content"> 
				<img class="content-image" :src="info.avatar">
				<div class="header-content"> 
					<h2 class="content-title"> 
						<span class="content-tag"> 
					    	<span class="mini-tag">品牌</span>
					    </span> 
					    <span class="content-name">{{info.name}}</span>
					    <i class="iconfont" @click="showAlert()">&#xe605;</i>
					</h2> 
					<div class="shop-message"> 
						<span class="shop-message-detail">{{info.score}}</span> 
						<span class="shop-message-detail">{{info.sellCount}}单</span> 
						<span class="shop-message-detail"> {{info.description}} 
							<span>约 {{info.deliveryTime}} 分钟</span> 
						</span>
						<span class="shop-message-detail">距离 {{info.distance}}</span>
					</div> 
				</div> 
			</div> 
			<div class="shop-header-discounts" v-if="info.supports"> 
				<div class="discounts-left" >
					<div class="activity activity-green"> 
						<span class="content-tag"> 
							<span class="mini-tag">{{info.supports[0].name}}</span> 
						</span> 
						<span class="activity-content ellipsis">{{info.supports[0].content}}</span> 
					</div>
				</div> 
				<div class="discounts-right" @click="ShowAlertTwo()"> {{info.supports.length}}个优惠 
					<i class="iconfont">&#xe605;</i>
				</div> 
			</div> 
		</div>
		<ShopIntroduce v-show="alertShow" @closeShop="closeShop()"></ShopIntroduce>
		<ShopPreferential v-show="alertShowTwo" @closeShopPre="closeShopPre()"></ShopPreferential>
		<div :class="[{zhedeiceng:alertShowTwo},{zhedeiceng:alertShow}]"></div>  <!--折叠层-->
	</div>	
</template>

<script>
	import ShopIntroduce from '../ShopIntroduce/ShopIntroduce.vue'
	import ShopPreferential from '../ShopPreferential/ShopPreferential.vue'
	import {mapState} from 'vuex'
	export default{
		data(){
			return{
				alertShow:false,
				alertShowTwo:false
			}
		},
		methods:{
			showAlert(){
				this.alertShow=true;
			},
			closeShop(){
				this.alertShow=false;
			},
			ShowAlertTwo(){
				this.alertShowTwo=!this.alertShowTwo;
			},
			closeShopPre(){
				this.alertShowTwo=!this.alertShowTwo;
			}
		},
		computed:{
			...mapState(['info'])
		},
		components:{
			ShopIntroduce,
			ShopPreferential
		}
	}
</script>

<style lang="scss" scoped>
.zhedeiceng{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,0.3);
	z-index: 10;
}
.shop-header{
	background-color: #fff;
	.shop-nav{
		height: 60px;
		line-height: 60px;
		/*background-image: url(../FooterGuide/QQ图片20190115155305.jpg);*/
	 	.back{
			display: block;
			.iconfont{
				font-size: 25px;
				margin-left: 10px;
				color: #fff;
			}
		}
	}
	.shop-content{
		text-align: center;
		height: 125px;
		.content-image{
			width: 90px;
			height: 90px;
			position: relative;
			top: -35px;
			border: 1px solid #cccccc3b
		}
		.header-content{
			position: relative;
			top: -35px;
			.content-title{
				font-size:20px;
				.content-tag{
					display: inline-block;
					.mini-tag{
						display: inline-block;
						font-size: 15px;
						background: #FFFF00;
						width: 38px;
					    height: 22px;
					    position: relative;
					    top: -4px;
					    line-height: 22px;
					}
				}
				.content-name{
					font-size: 23px;
				}
				.iconfont{
					font-size: 20px;
				}
			}
			.shop-message{
				.shop-message-detail{
					font-size: 15px;
					font-weight: bold;
					display: inline-block;
					letter-spacing: -1px;
				}
				.shop-message-detail:nth-child(1){
					margin-right: 5px;
				}
				.shop-message-detail:nth-child(3){
					margin: 0 5px 0 5px;
				}
			}
		}
	}
	.shop-header-discounts{
		height: 30px;
		width: 94%;
		letter-spacing: -4px;
		font-size: 15px;
		font-weight: bold;
		border: 1px solid #ceb4b4;
		line-height: 30px;
		margin: auto;
		.discounts-left{
			float: left;
			.activity{
				.content-tag{
					background-color: #2AC845;
					color: #fff;
					margin:0 4px 0 4px;
					.mini-tag{
					}
				}
			}
		}
		.discounts-right{
			float: right;
			margin-right: 4px;
			.iconfont{
							
			}
		}
	}
	
}
@keyframes tip{
	0% {transform: scale(1);}
	35% {transform: scale(.8);}
	70% {transform: scale(1.1);}
	100% {transform: scale(1);}
}
.fade-enter-active,
.fade-leave-active{
	transition:opacity .5s;
}
.fade-enter,
.fade-leave-to{
	opacity:0;		
}
</style>