<template>
	<div class="shop_container">
		<div class="shop-brief-modal" > 
			<div class="brief-modal-content"> 
				<h2 class="content-title"> 
					<span class="content-tag">
					<span class="mini-tag">品牌</span> 
					</span> 
					<span class="content-name">{{info.name}}</span> 
				</h2>
				<ul class="brief-modal-msg">
					<li>
						<h3>{{info.score}}</h3> 
						<p>评分</p>
						</li> 
					<li>
						<h3>{{info.sellCount}}单</h3> 
						<p>月售</p> 
					</li> 
					<li>
						<h3>{{info.description}}</h3> 
						<p>约{{info.deliveryTime}} 分钟</p>
					</li> 
					<li><h3>{{info.deliveryPrice}}元</h3> 
						<p>配送费用</p> 
					</li> 
					<li><h3>{{info.distance}}m</h3> 
							<p>距离</p> 
						</li> 
				</ul> 
				<h3 class="brief-modal-title">
					<span>公告</span>
				</h3> 
				<div class="brief-modal-notice">{{info.bulletin}} </div> 
				<div class="mask-footer"> 
					<span class="iconfont" @click="closeShop()">&#xe9b6;</span>
				</div> 
			</div>
			<div class="brief-modal-cover"></div> 
		</div>
			
	</div>
</template>

<script>
	import {mapState} from 'vuex' 
	export default{
		data(){
			return{
				
			}
		},
		computed:{
			...mapState(['info'])
		},
		methods:{
			closeShop(){
				this.$emit('closeShop');
			}
		}
	}
</script>

<style lang="scss" scoped>
.shop_container{
	background-color: #fff;
	position: absolute;
	width: 92%;
	left: 4%;
	z-index: 20;
	height: 310px;
	animation:tip 0.4S;
	border-radius: 10px;
}
.shop-brief-modal{
		margin: auto;
		.brief-modal-content{
			width: 85%;
			margin: auto;
			.content-title{
				margin-top: 15px;
				font-size: 24px;
			    text-align: center;
				.content-tag{
				    position: relative;
					top: -2px;
					.mini-tag{
						background-color: #FFFF00;
						font-size: 16px;
					}
				}
				.content-name{
					margin-left: 14px;
				}
			}
			.brief-modal-msg{
				height: 82px;
				padding: 0;
				li{
					width: 20%;
					list-style-type:none;
					float: left;
					display: inline-block;
					text-align: center;
					h3{
						font-size: 18px;	
					}
					p{
						font-size: 16px;
					}
				}
			}
			.brief-modal-title{
				text-align: center;
				font-size: 20px;
				margin-top: 22px;
			}
			.brief-modal-notice{
				font-size: 16px;
				margin-top: 20px;
			}
			.mask-footer{
				    position: absolute;
				    text-align: center;
				    top: 340px;
				    left: 0;
				    right: 0;
				.iconfont{
					font-size: 40px;
				}
			}
		}
		.brief-modal-cover{
			
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