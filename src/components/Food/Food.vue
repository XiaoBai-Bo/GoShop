<template>
	<div>
		<div class="food" v-if="isShow"> 
			<div class="food-content">
				<div class="image-header">
					<img class="img" v-lazy="food.image"> 
					<p class="foodpanel-desc">{{food.info}}</p>
					<div class="back" @click="toggleShow()"> 
						<i class="iconfont icon-arrow_left">
							&#xe604;
						</i> 
					</div> 
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail"> 
						<span class="sell-count">月售 {{food.sellCount}} 份</span> 
						<span class="rating">好评率 {{food.rating}}%</span> 
					</div> 
					<div class="price"> 
						<span class="now">￥{{food.price}}</span> 
						<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span> 
					</div> 
					<div class="cartcontrol-wrapper">
						<CartControl :food="food"></CartControl>
					</div> 
				</div> 
			</div> 
			<div class="food-cover"></div>
		</div> 
		<div :class="{zhedeiceng:isShow}" @click="toggleShow()"></div>  <!--折叠层-->
	</div>
</template>

<script>
	import CartControl from '../CartControl/CartControl.vue'
	export default{
		data(){
			return{
				isShow:false
			}
		},
		methods:{
			toggleShow(){
				this.isShow=!this.isShow;
			},
		},
		props:{
			food:Object
		},
		components:{
			CartControl
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
@keyframes food{
	0% {transform: scale(1);}
	35% {transform: scale(.8);}
	70% {transform: scale(1.1);}
	100% {transform: scale(1);}
}
.food{
    position: fixed;
    text-align: center;
    background: #6f636369;
    width: 80%;
    top: 26%;
    left: 10%;
    border-radius: 5%;
    z-index: 20;
    animation:food 0.4S;
	.food-content{
		.image-header{
		    height: 245px;	
			.img{
				width: 100%;
				height: 250px;
			}
			.foodpanel-desc{
			    position: absolute;
			    top: 225px;
			    left: 10px;
			    color: #fff;
			    margin: 0;
				.iconfont{
					
				}
			}
			.back{
				position: absolute;
				top: 10px;
				left: 10px;
				color: #fff;
			}
		}
	}
	.content{
	    text-align: left;
   		 padding-left: 23px;
   		 background: #fff;
   		 padding: 10px 0 10px 23px;
   		 height: 88px;
   		 border-radius: 0% 0% 5% 5%;
   		 .title{
   		 	font-size: 17px;
  			font-weight: bold;
  			margin: 0;
   		 }
   		 .detail{
   		 	font-size: 13px;
    font-family: serif;
   		 }
   		 .price{
   		 	margin-top: 10px;
   		 	.now{
   		 		color: red;
   		 	}
   		 	.old{
   		 		text-decoration: line-through;
   		 	}
   		 }
   		 .cartcontrol-wrapper{
	 	    position: absolute;
			right: 7px;
			bottom: 7px;
   		 }
	}
}

</style>