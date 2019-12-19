<template> 
	<div>
		<div class="goods"> 
			<div class="menu-wrapper" ref="menuWrapper">
				<ul>
					<li class="menu-item" 
						v-for="(good,index) in goods" 
						:key="index" 
						:class="{current:index===currentIndex}"
						@click="clickMenuItem(index)"> 
						<span class="text bottom-border-1px"> 
							<img class="icon" :src="good.icon"  v-if="good.icon"> 
							{{good.name}} 
						</span>
					</li> 
				</ul> 
			</div> 
			<div class="foods-wrapper" ref="foodsWrapper"> 
				<ul ref="foodsUl">
					<li class="food-list-hook" v-for="(good,index) in goods" :key="index"> 
						<h1 class="title"><span class="tip_title">{{good.name}}</span></h1> 
						<ul>
							<li 
								class="food-item bottom-border-1px" 
								v-for="(food,index) in good.foods" 
								:key="index"
								@click="ShowFood(food)">
								<div class="icon"> 
									<img width="57" height="57" v-lazy="food.icon"> 
								</div>
								<div class="content"> 
									<h2 class="name">{{food.name}}</h2> 
									<p class="desc">{{food.description}}</p> 
									<p class="extra">
										<span class="count">月售 {{food.sellCount}} 份</span>
										<span>好评率 {{food.rating}}%</span>
									</p> 
									<div class="price">
										<span class="now">￥{{food.price}}</span> 
										<span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
									</div> 
									<div class="cartcontrol-wrapper">
										<CartControl :food="food"></CartControl>
									</div> 
								</div> 
							</li> 
						</ul>
					</li> 
				</ul> 
			</div> 
			<ShopCart></ShopCart>
		</div>
		<Food :food="food" ref="food"></Food>
	</div>	
</template>

<script>
	import {mapState} from 'vuex'
	import BScroll from 'better-scroll'
	import CartControl from '../../../components/CartControl/CartControl.vue'
	
	import Food from '../../../components/Food/Food.vue'
	import ShopCart from '../../../components/ShopCart/ShopCart.vue'
	export default{
		data(){
			return{
				scrollY:0,  //右侧滑动的Y轴坐标(滑动过程中实施监控)
				tops:[],   //所有右侧分类
				food:{},   //需要显示的food
			}
		},
		mounted(){
			this.$store.dispatch('getShopGoods', () =>{   //数据更新之后执行
				this.$nextTick( () => {  //数据更新显示后执行
					this._initScroll();
					this._initTops()
				})
			})
		},
		computed:{
			...mapState(['goods']),
			//计算得到当前分类的下标
			currentIndex(){   //执行情况1.初始化  2.相关数据发生变化
				//得到条件数据
				const {scrollY,tops}=this;
				//根据条件计算产生一个结果
				const index=tops.findIndex( (top,index) =>{
					// 返回 scrollY>=当前top && scrollY<下一个top
					return scrollY>=top && scrollY<tops[index+1]
				})
				
				//返回结果
				return index
			}
		},
		methods:{
			//初始化滚动条
			_initScroll(){
				//列表显示之后创建
				new BScroll('.menu-wrapper',{
					click:true
				})
				this.foodsScroll=new BScroll('.foods-wrapper',{
					probeType:2,   //手指离开后不会触发
					click:true
				})
				//给右侧列表绑定scroll监听
				this.foodsScroll.on('scroll',({x,y}) => {
//					console.log(x,y)
					this.scrollY=Math.abs(y);  //Math.abs()取正值
//					console.log(this.scrollY)
				});
				//滑动结束
				this.foodsScroll.on('scrollEnd',({x,y}) => {
					console.log('scrollEnd',x,y)
					this.scrollY=Math.abs(y);  
//					console.log(this.scrollY)
				})
			},
			//初始化tops
			_initTops(){
				//1.初始化top
				const tops=[]
				let top=0
				tops.push(top)
				
				//2.收集   找到所有分类的li
				const lis=this.$refs.foodsUl.getElementsByClassName('food-list-hook')
				Array.prototype.slice.call(lis).forEach( li=> { //从数组中抽取新的数组
				    top+=li.clientHeight;
					tops.push(top)
				})
				//3.更新数据
				this.tops=tops;
				console.log(tops)
			},
			clickMenuItem(index){
//				使右侧列表滑动到对应的某个位置
				console.log(index)
				//先到的目标位置，立即更新scrollY(让点击的分类项成为当前分类)
				const y = -this.tops[index]
				this.scrollY= -y
				this.foodsScroll.scrollTo(0,y,300);  //scrollTo作用滚动到指定的位置
			},
			//显示点击的food
			ShowFood(food){
				//设置food
				this.food=food;
				//显示food组件(父组件 调用子组件对象的方法)
				this.$refs.food.toggleShow();
			}
		},
		components:{
			CartControl,
			Food,
			ShopCart
		}
	}
</script>

<style lang="scss" scoped>
ul,li,a,div,h1,h2,h3,p{
	margin: 0;
	padding: 0;
	list-style-type:none;
}	
	.goods{
		display: flex;
	    position: absolute;
	    top: 255px;
	    bottom: 50px;
	    width: 100%;
	    overflow: hidden;
	    background: #fff;
		.menu-wrapper{
			float:left;
			width: 20%;
			height: 100%;
			background-color: #f3f5f7;
			flex: 0 0 80px;
    		overflow: auto;
			.menu-item{
				height: 50px;
				line-height: 50px;
				.text{
					font-size:15px;
				    padding: 0 0 0 10px;
					.icon{
						width: 20px;
						height: 20px;
					}
				}
			}
			.current{
				background-color: #fff;
				color: #2AC845;
			}
		}
		.foods-wrapper{
			width: 80%;
			float:right;
			overflow: auto;
			.food-list-hook{
				.title{
					height: 25px;
					font-size: 10px;
					background-color: #f3f5f7;
					line-height: 25px;
					border-left: 2px solid #ccc;
					.tip_title{
						margin-left: 10px;
						color: #351b1b91;
					}
				}
				ul{
					background-color: #fff;
					.food-item{
						display:inline-block;
						width:100%;
						padding:10px 10px 10px 10px;
						border-top:1px solid #ccc;
						position:relative;
						.icon{
							float: left;
							width: 60px;
						}
						.content{
							float: left;
							padding-left: 5px;
							width: 72%;
							.name{
								font-size: 16px;
								font-weight: bold;
							}
							.desc{
								font-size: 12px;
							}
							.extra{
								font-size: 12px;
							}
							.price{
							    font-size: 14px;
								.now{
									color: red;
								}
								.old{
								    text-decoration: line-through;
    								color: #ccc;
								}
							}
							.cartcontrol-wrapper{
							    position: absolute;
							    right: 20px;
						        bottom: 5px;
							}
						}
					}
				}
			}
		}
	}
</style>