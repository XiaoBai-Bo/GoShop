<template>
	<transition name="fade">
	<div class="shop-container-Preferential">
		<div class="activity-sheet"> 
			<div class="activity-sheet-content">
				<h2 class="activity-sheet-title">优惠活动</h2> 
					<ul class="list"> 
						<li class="activity-item" v-for="(shop,index) in info.supports" :key="index"> 
							<span class="content-tag" :class="activityClass[shop.type]"> 
								<span class="mini-tag" >{{shop.name}}</span>
							</span> 
							<span class="activity-content">{{shop.content}}</span> 
						</li> 
					</ul> 
				<div class="activity-sheet-close">
					<span class="iconfont" @click="closeShopPre()">&#xe60b;</span> 
				</div> 
			</div> 
			<div class="activity-sheet-cover"></div> 
		</div> 
	</div>
	</transition>
</template>

<script>
	import vueScroll from 'vuescroll'
	import 'vuescroll/dist/vuescroll.css'
	
	import {mapState} from 'vuex'
	export default{
		name:'vueScrollpage',
		data(){
			return{
				shopInfo:'',
				ops:{},
				activityClass:['content-green','content-red','content-orange']
			}
		},
		mounted(){
		},
		computed:{ 
			...mapState(['info']),
		},
		created(){
			this.getShop();
		},
		methods:{
			closeShopPre(){
				this.$emit('closeShopPre');
			},
			getShop(){
				console.log(this.$store.state.info.supports)
				this.shopInfo=this.$store.state.info.supports;
				console.log('shopInfo='+this.shopInfo);
			}
		},
		components:{
			vueScroll
		}
	}
</script>

<style lang="scss" scoped>
	.shop-container-Preferential{
		background: #f7f7f7;
		position: absolute;
		bottom: 0;
		/*height: 300px;*/
		z-index: 20;
	    width: 100%;
	    max-height: 280px;
		overflow-x: auto;
		.activity-sheet{
			.activity-sheet-content{
				.activity-sheet-title{
					text-align: center;
					margin: 15px;
					font-size: 26px;
				}
				.list{
					padding: 0;
					margin: 10px 15px 0 15px;
					.activity-item{
						list-style-type: none;
						margin: 10px 0 14px 0;
						.content-tag{
							float: left;
							.mini-tag{
								font-size: 17px;
								color: #fff;
								font-weight: bold;
								display: inline-block;
								width: 45px;
								height: 25px;
								text-align: center;
   								line-height: 25px;
							}
						}
						.content-green{
							background:green;
							border-radius: 15%;
						}
						.content-red{
							background:red;
							border-radius: 15%;
						}
						.content-orange{
							background:blue;
							border-radius: 15%;
						}
						.activity-content{
							display: flow-root;
    						padding-left: 20px;
						}
					}
				}
				.activity-sheet-close{
					.iconfont{
						position: absolute;
						top: 15px;
					    right: 15px;
					    font-size: 30px;
					}
				}
			}
		}
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