<template>
	<div class="container">
		<ShopHeader/>
		<div class="tab">
			<div class="tab-item">
				<router-link to="/shop/goods" replace>点餐</router-link>		
			</div>
			<div class="tab-item">
				<router-link to="/shop/Ratings" replace>评价</router-link>		
			</div>
			<div class="tab-item">
				<router-link to="/shop/info" replace>商家</router-link>		
			</div>
		</div>
		<keep-alive>
			<router-view/>
		</keep-alive>	
	</div>
	
</template>

<script>
	import ShopHeader from '../../components/ShopHeader/ShopHeader.vue'
	
	export default{
		data(){
			return{
				FromColor:false
			}
		},
		mounted(){
			this.$store.dispatch('getShopInfo');
		},
		components:{
			ShopHeader
		}
	}
</script>

<style lang="scss" scoped>
a.mui-active{
	color:#02A774 !important;
	border-bottom: 2px solid #02A774;
	}
	.container{
		background-color:#fff;
		.tab{
			display:flex;
			text-align:center;
			width: 100%;
			margin-top: 10px;
			.tab-item{
				flex-grow: 1;
				border-bottom: 2px solid #cccccc57;
				a{
					color: #817b84;
					 display: inline-block;
   					 padding-bottom: 7px;
				}	
			}
		}
	}

</style>