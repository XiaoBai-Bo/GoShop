<template>
	<div class="shop-info">
		<div class="info-content">
			<div class="section"> 
				<h3 class="section-title">配送信息</h3>
				<div class="delivery"> 
					<div> 
						<span class="delivery-icon">{{info.description}}</span>
						<span class="delivery-text">由商家配送提供配送，约 {{info.deliveryTime}}分钟送达，距离 {{info.distance}}</span> 
					</div> 
					<div class="delivery-money">配送费￥{{info.deliveryPrice}}</div> 
				</div> 
			</div> 
			<div class="split"></div> 
			<div class="section">
				<h3 class="section-title">活动与服务</h3>
				<div class="activity"> 
					<div class="activity-item" v-for="(item,index) in info.supports" :key="index"> 
						<span class="content-tag" :class="supportClass[item.type]"> 
							<span class="mini-tag">{{item.name}}</span> 
						</span> 
						<span class="activity-content">{{item.content}}</span>
					</div> 
				</div> 
			</div> 
			<div class="split"></div> 
			<div class="section"> 
				<h3 class="section-title">商家实景</h3>
				<div class="pic-wrapper" ref="picDiv">
					<ul class="pic-list" ref="picUl"> 
						<li class="pic-item" v-for="(picImg,index) in info.pics" :key="index"> 
							<img :src="picImg"/> 
						</li> 
					</ul> 
				</div>
			</div> 
			<div class="split"></div>
			<div class="section">
				<h3 class="section-title">商家信息</h3>
				<ul class="detail"> 
					<li><span class="bold">品类</span>
						<span class="bold-text">{{info.category}}</span></li> 
					<li><span class="bold">商家电话</span> 
						<span class="bold-text">{{info.phone}}</span></li>
					<li><span class="bold">地址</span>
						<span class="bold-text">{{info.address}}</span></li> 
					<li><span class="bold">营业时间</span> 
						<span class="bold-text">{{info.workTime}}</span></li> 
				</ul> 
			</div>
		</div> 
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import Bscroll from 'better-scroll'
	export default{
		data(){
			return{
				supportClass:['activity-green','activity-red','activity-orange']
			}
		},
		mounted(){
			//如果没有数据，则不做以下的操作
			if(!this.info.pics){
				return
			}
			
			//数据有了，可以创建Bscroll进行滑动
			this._initScroll();
		},
		methods:{
			_initScroll(){
				new Bscroll('.shop-info')
				//动态计算ul的宽度
				const ul =this.$refs.picUl;
				const liWidth=120;
				const liSpace=10;
				const liNumber=this.info.pics.length;
				ul.style.width=(liWidth+liSpace)*liNumber-liSpace+'px';
				
				new Bscroll('.pic-wrapper',{
					click:true,
					scrollX:true   //设置水平滑动
				})
			}
		},
		computed:{
			...mapState(['info']),
		},
		watch:{
			info(){   //刷新流程，更新数据，初始化info
				this.$nextTick( ()=>{
					this._initScroll();
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
h3,h2,h1,ul,li,p,span{
	margin: 0;
	padding: 0;
}
.shop-info{
	position: absolute;
    top: 255px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    background: #fff;
	.info-content{
		.section{
		    padding: 15px 15px 0 15px;
			.section-title{
			    font-size: 18px;
			    font-weight: bold;
			    margin: 8px 0 8px 10px;
			}
			.delivery{
			    padding: 10px;
				.delivery-icon{
				    color: #fff;
				    background: #0097ff;
				    display: inline-block;
				    width: 75px;
				    text-align: center;
				    border-radius: 10%;
				    margin: 0 12px 5px 0;
				}
				.delivery-text{
			        color: #8f8f94;
    				font-size: 16px;		
				}
				.delivery-money{
					color: #8f8f94;
				    margin-top: 5px;
				    font-size: 15px;
				}
			}
			.activity{
				padding: 10px;
				.activity-item{
					margin: 7px 0 0 0;
					.content-tag{
						display: inline-block;
					    width: 40px;
					    color: #fff;
					    text-align: center;
					    border-radius: 10%;
				        margin-right: 10px;
					}
					.activity-green{
						background: green;
					}
					.activity-red{
						background:red;
					}
					.activity-orange{
						background:orange;
					}
					.activity-content{
						font-size: 15px;
    					color: #8f8f94;
					}
				}
			}
			.pic-wrapper{
			    overflow: hidden;
			    white-space: nowrap;
			    padding: 10px;
			    height: 100%;
				padding: 10px;
				.pic-list{
				    font-size: 0;
			        display: inline-block;
				    overflow-x: hidden;
					.pic-item{
						display: inline-block;
    					margin-right: 10px;
						img{
							width:120px;
							height:90px;
						}
					}
				}
			}
			.detail{
				padding: 10px;
				li{
				    border-bottom: 1px solid #dcdcdc;
				    height: 45px;
				    line-height: 45px;
			        list-style-type: none;
				}
				.bold-text{
				    float: right;
				    color: #8f8f94;
				    font-size: 15px;
				    letter-spacing: 1px;
				}
			}
		}
		.split{
		    width: 100%;
		    height: 18px;
		    border-top: 1px solid rgba(7, 17, 27, 0.1);
		    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
		    background: #f3f5f7;
		}
	}
}
</style>