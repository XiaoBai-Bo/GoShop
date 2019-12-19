<template>
	<div class="ratings" ref="ratings"> 
		<div class="ratings-content"> 
			<div class="overview"> 
				<div class="overview-left"> 
					<h1 class="score">{{info.score}}</h1> 
					<div class="title">综合评分</div> 
					<div class="rank">高于周边商家 99%</div> 
				</div> 
				<div class="overview-right"> 
					<div class="score-wrapper"> 
						<span class="title">服务态度</span> 
						<Star :score="info.serviceScore" :size="36" /> 
						<span class="score">{{info.serviceScore}}</span> 
					</div> 
					<div class="score-wrapper"> 
						<span class="title">商品评分</span> 
						<Star :score="info.foodScore" :size="36" />
						<span class="score">{{info.foodScore}}</span> 
					</div> 
					<div class="delivery-wrapper"> 
						<span class="title">送达时间</span> 
						<span class="delivery">{{info.deliveryTime}}分钟</span> 
					</div> 
				</div> 
			</div> 
			<div class="split"></div>
			<div class="ratingselect">
				<div class="rating-type border-1px"> 
					<span class="block" @click="setSelectType(2)" :class="{active:selectType===2}"> 全部
						<span class="count">{{ratings.length}}</span> 
					</span> 
					<span class="block"  @click="setSelectType(0)" :class="{active:selectType===0}"> 满意
						<span class="count">{{positiveSize}}</span>
					</span>
					<span class="block"  @click="setSelectType(1)" :class="{active:selectType===1}"> 不满意
						<span class="count">{{ratings.length-positiveSize}}</span>
					</span> 
				</div> 
				<div class="switch" :class="{on:onlyShowText}" @click="toggleOnlyShowText"> 
					<span class="iconfont">&#xe610;</span>
					<span class="text">只看有内容的评价</span> 
				</div> 
			</div> 
			<div class="rating-wrapper">
				<ul>
					<li class="rating-item" v-for="(rating,index) in filterRatings" :key="index"> 
						<div class="avatar"> 
							<img width="28" height="28" :src="rating.avatar">
						</div>
						<div class="content"> 
							<h1 class="name">{{rating.username}}</h1>
							<div class="star-wrapper"> 
								<Star :score="rating.score" :size="24" /> 
								<span class="delivery">{{rating.deliveryTime}}</span> 
							</div> 
							<p class="text">{{rating.text}}</p>
							<div class="recommend"> 
								<span class="iconfont">&#xe60f;</span> 
								<span class="item" v-for="(commend,index) in rating.recommend" :key="index">{{commend}}</span> 
							</div>
							<div class="time">{{rating.rateTime | dataFormat}}</div>
						</div> 
					</li> 
				</ul>
			</div>
		</div> 
	</div>
</template>

<script>
	import Star from '../../../components/Star/Star.vue'
	import {mapState,mapGetters} from 'vuex'
	import BScroll from 'better-scroll'
	
	export default{
		data(){
			return{
				onlyShowText:false,   //是否只看文本内容的
				selectType:2         //选择的评价类型 0满意，1不满意，2全部 
			}
		},
		mounted(){
			this.$store.dispatch('getShopRatings',()=>{
				this.$nextTick( ()=>{
					new BScroll(this.$refs.ratings,{   //方法二：传入一个$refs元素
						click:true,
					})
				})
			})
		},
		methods:{
			setSelectType(Number){
				this.selectType=Number
			},
			toggleOnlyShowText(){
				this.onlyShowText=!this.onlyShowText
			}
		},
		computed:{
			...mapState(['info','ratings']),
			...mapGetters(['positiveSize']),
			filterRatings(){
				//得到相关的数据
				const {ratings,onlyShowText,selectType} = this
				
				//产生一个过滤的新数组
				return ratings.filter(rating => {
					const {rateType,text} = rating
//					return true 返回全部
					/*分析：
					 *条件1:selectType= 0/1/2
					 * 		rateType= 0/1
					 * 		selectType===2 || selectType===rateType
					 *条件2:onlyShowText= true/false
					 * 		text: 有值/没值
					 * 		!onlyShowText  || text.length>0
					 */
					return (selectType===2 || selectType===rateType) && (!onlyShowText  || text.length>0)
					
				})
			}
		},
		components:{
			Star
		}
	}
</script>

<style lang="scss" scoped>
h1,h2,h3,p,div,ul,li{
	margin: 0;
	padding: 0;
}
.ratings{
	position: absolute;
	top: 255px; 
	bottom: 0; 
	left: 0; 
	width: 100%; 
	overflow: hidden; 
	background: #fff;
	.ratings-content{
		.overview{
			height: 100px;
			.overview-left{
				float:left;
				width:35%;
				text-align:center;
				font-size:13px;
				margin:10px 8px 12px 8px;
				border-right:1px solid #ccc;
				.score{
					color: rgb(255, 153, 0);
					font-size: 25px;
					margin-bottom: 8px;
				}
				.rank{
					color: #8f8f94;
					margin: 5px 0 0 0;
				}
			}
			.overview-right{
				float: left;
			    width: 60%;
			    margin: 8px 0;
			    padding: 0 8px;
			    font-size: 14px;
				.score-wrapper{
					line-height: 30px;
					display:flex;
					.title{
						margin-right:10px;
					}
				}
				.delivery-wrapper{
					.delivery{
						color: #8f8f94;
						margin-left: 10px;
					}
				}
			}
		}
		.split {
		   width: 100%; 
		   height: 18px; 
		   border-top: 1px solid rgba(7, 17, 27, 0.1); 
		   border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		   background: #f3f5f7;
		}
		.ratingselect{
		    height: 90px;
			border-bottom: 1px solid #ccc;
			.rating-type{
			    margin: 10px 0 20px 20px;
				.block{
					height: 37px;
				    display: inline-block;
				    width: 70px;
				    background-color: #ccc;
				    line-height: 37px;
				    font-size: 15px;
				    text-align: center;
				}
				.active{
					background: #2AC845;
					color: #fff;
				}
			}
			.switch{
			    margin-left: 20px;
				font-size: 14px;
				color: #8f8f94;
				.iconfont{
					font-size: 30px;
				}
			}
			.on .iconfont{
				color: #2AC845;
			}
		}
		.rating-wrapper{
			.rating-item{
				position: relative;
				list-style-type: none;
			    display: flow-root;
			    margin: 10px;
			    border-bottom: 1px solid #ccc;
				.avatar{
				    position: relative;
				    float: left;
				    width: 14%;
				    text-align: center;
				    top: 20px;
				    img{
			    	    border-radius: 50%;
				    }
				}
				.content{
				    float: left;
				    width: 86%;
					.name{
						font-size: 15px;
					}
					.star-wrapper{
					    font-size: 15px;
					    height: 30px;
					    line-height: 30px;
					    .delivery{
					    	color: #8f8f94;
					    }
					}
					.text{
						
					}
					.recommend{
					    margin-top: 6px !important;
					    .iconfont{
					    	color: orange;
					    }
						.item{
							display: inline-block;
						    border: 1px solid #ccc;
						    color: #8c8585;
						    font-size: 14px;
						    padding: 2px;
						    text-align: center;
						    margin: 0 5px 5px 0px;
						}
					}
					.time{
				        position: absolute;
					    top: 0px;
					    right: 5px;
					    font-size: 15px;
					    color: #8c8585;
					}
				}
			}
		}
	}
}
</style>