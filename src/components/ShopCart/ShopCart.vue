<template>
	<div class="cart"> 
		<div class="shopcart"> 
			<div class="content"> 
				<div class="content-left" @click="toggleShow"> 
					<div class="logo-wrapper">
						<div class="logo" :class="{highlight:totalCount}"> 
							<i class="iconfont icon-shopping_cart" :class="{highlight:totalCount}">&#xe608;</i> 
						</div> 
						<div class="num" v-if="totalCount">
							<mt-badge size="small" type="error">{{totalCount}}</mt-badge>
						</div> 
					</div> 
					<div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div> 
					<div class="desc">另需配送费￥{{info.deliveryPrice}} 元</div> 
				</div> 
				<div class="content-right"> 
					<div class="pay" :class="payClass"> {{payText}}</div> 
				</div> 
			</div>
			<transition>
				<div class="shopcart-list" v-if="listShow">
					<div class="list-header">
						<h1 class="title">购物车</h1> 
						<span class="empty" @click="clearCart">清空</span> 
					</div> 
					<div class="list-content"> 
					<vuescroll :ops="ops">
						<ul>
							<li class="food" v-for="(food,index) in cartFoods" :key="index"> 
								<span class="name">{{food.name}}</span>
								<div class="price">
									<span>￥{{food.price}}</span>
								</div> 
								<div class="cartcontrol-wrapper"> 
									<div class="cartcontrol">
										<CartControl :food="food"></CartControl>
									</div> 
								</div> 
							</li>
						</ul> 
					</vuescroll>
					</div>
				</div> 
			</transition>
		</div> 
		<div :class="{zhedeiceng:listShow}" @click="toggleShow()"></div>  <!--折叠层--> 
	</div>
</template>

<script>
	import {mapState,mapGetters} from 'vuex'
	import CartControl from '../CartControl/CartControl.vue'
	import BScroll from 'better-scroll' 
	import {MessageBox } from 'mint-ui'
	import vuescroll from 'vuescroll'
	export default{
		data(){
			return{
				isShow:false,
				ops:{
					vuescroll: {},
			        scrollPanel: {},
			        rail: {},
			        bar: {}
				}
			}
		},
		components:{
			CartControl,
			vuescroll
		},
		computed:{
			...mapState(['cartFoods','info']),
			...mapGetters(['totalCount','totalPrice']),
			payClass(){
				const {totalPrice} =this;
				const {minPrice} =this.info;
				return totalPrice>=minPrice?'enough':'not-enough'
			},
			payText(){
				const {totalPrice} =this;
				const {minPrice} =this.info;
				if(totalPrice===0){
					return `￥${minPrice}起送`
				}
				else if(minPrice>totalPrice>0){
					return `还差￥${minPrice-totalPrice}起送`;
				}
				else{
					return '结算'
				}
			},
			listShow(){
				//如果总数为0，直接不显示
				const {totalCount}=this
				if(totalCount===0){
					this.isShow=false
					return false
				}
				console.log(this.isShow)
//				this.ShowList()
//				if(this.isShow){
//					this.$nextTick( ()=>{
//						//创建之前判断是否已经创建过,解决重复创建
//						if(!this.scroll){
//							this.scroll=new BScroll('.list-content',{ //保证只有一个BScroll对象
//								click:true,
//								probrType:2
//							})
//						}else{
//							this.scroll.refresh();  //让滚动条重新刷新一下  
//						}
//					})
//				}
				return this.isShow
			}
		},
		methods:{
			toggleShow(){
				//当总数量大于0时才切换
				if(this.totalCount>0){
					this.isShow=!this.isShow;
				}
			},
			clearCart(){
				MessageBox.confirm('确定清空购物车吗?').then(action => {
				 	this.$store.dispatch('clearCart')
				},()=>{});
			},
			ShowList(){
				if(this.isShow){
					this.$nextTick( ()=>{
						if(!this.scroll){
							this.scroll=new BScroll('.list-content',{
								probeType:2,
								click:true
							})
						}else{
							this.scroll.refresh;
							console.log(this.scroll.refresh)//重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
						}
					})
				}
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.__vuescroll{
	height:200px !important;
}
.mint-badge.is-size-small { /* 修改徽章样式*/
    border-radius: 8px;
    font-size: 12px;
    padding: 0px 4px;
	}
.zhedeiceng{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 50px;
	background: rgba(0,0,0,0.5);
	z-index: -2;
}
ul,li,h1,h2,h3{
	margin: 0;
	padding: 0;
}
.v-enter{
	transform:translateY(100%);
}
.v-leave-to{
	transform:translateY(100%);
}
.v-enter-active,
.v-leave-active{
	transition:all 0.3s ease;
}
.cart{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
	.shopcart{
		.content{
			.content-left{
			    float: left;
			    width: 64%;
			    height: 50px;
			    background: #141d27;
			    .logo-wrapper{
			    	float:left;
			    	height: 40px;
				    width: 25%;
				    text-align: center;
			    	.logo{
			    		border-radius: 50%;
					    background: #2b343c;
					    position: fixed;
					    bottom: 7px;
					    left: 7px;
					    height: 50px;
					    width: 50px;
					    line-height: 45px;
    					border: 3px solid #141d27;
    					z-index: 30;
			    		.iconfont{
	    				    color: #fff;
							font-size: 30px;
			    		}
			    	}
			    	.highlight{
			    		background: #02A774;
			    		color:red;
			    	}
			    	.num{
		    		    color: red;
					    position: absolute;
					    top: -14px;
					    left: 43px;
					    z-index: 40;
			    	}
			    }
			    .price{
			    	color: #fff;
			    	padding-left: 66px;
		    	    margin-top: 5px;
			    }
			    .desc{
			    	color: #ffffff85;
			    	font-size: 12px;
			    	padding-left: 66px
			    }
			}
			.content-right{
				float: right;
			    background: #2b333b;
			    width: 36%;
			    height: 50px;
			    line-height: 50px;
			    color: #fff;
			    font-size: 14px;
			    text-align: center;
			    .enough{
			    	background: #2AC845;
			    }
			}
		}
		.shopcart-list{
		    position: absolute;
		    bottom: 50px;
		    /*top: 0;*/
		    background: #ccc;
		    width: 100%;
		    z-index: -1;
		    .list-header{
	    	    height: 40px;
			    background: #ececec;
			    line-height: 40px;
		    	.title{
		    		float: left;
				    width: 76%;
				    font-size: 19px;
				    font-weight: bold;
				    margin: 0 0 0 15px;
				    line-height: 40px;
		    	}
		    	.empty{
    				width: 20%;
				    display: inline-block;
				    margin: 0;
				    text-align: center;
		    	}
		    	.empty:active{
		    		box-shadow: 7px 7px 5px #222222;
		    	}
		    }
		    .list-content{
		    	background: #fff;
    			list-style-type: none;
			    /*max-height: 180px;*/
    			overflow: hidden;
		    	.food{
		    		display: flex;
				    height: 45px;
				    line-height: 45px;
		    		.name{
	    			    margin-left: 15px;
					    letter-spacing: -1px;
					    font-weight: bold;
					    flex-grow: 1;
		    		}
		    		.price{
	    			    color: red;
		    		}
		    		.cartcontrol-wrapper{
		    			flex-grow: 0;
					    width: 20%;
					    text-align: center;
		    		}
		    	}
		    }
		}
	}
}

</style>