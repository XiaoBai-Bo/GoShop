<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="iconfont icon_remove" v-if="food.count" @click.stop="updateFoondCount(false)">&#xe625;</div>
		</transition>
		<div class="cart_count" v-if="food.count">{{food.count}}</div>
		<div class="iconfont icon_add" @click.stop="updateFoondCount(true)">&#xe684;</div>
	</div>
	<!--.stop阻止事件冒泡-->
</template>

<script>
	export default{
		props:{
			food:Object
		},
		methods:{
			updateFoondCount(isAdd){
				this.$store.dispatch('updateFoondCount',{isAdd,food:this.food})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
.cartcontrol{
	display: flex;
	.iconfont{
		color:#2bc169dd;
	    font-size: 20px;
	}
	.icon_remove{
		
	}
	.cart_count{
		margin: 0 5px 0 5px;
	}
	.icon_add{
		
	}
}
.move-enter-active,.move-leave-active{
	transition: all .3s ease;
}
.move-enter,.move-leave-to{
	transform:  translateX(15px) rotate(180deg);
}

</style>