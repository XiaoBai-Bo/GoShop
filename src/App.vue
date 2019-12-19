<template>
  <div>
  	<router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
	import FooterGuide from './components/FooterGuide/FooterGuide.vue'
//	import {reqFoodCategorys} from './api'
	
	export default{
		mounted(){
				this.$store.dispatch('getAddress')
//			const result=await reqFoodCategorys();
//			console.log(result);
		},
		components:{
			FooterGuide
		}
	}
	
</script>


<style lang="scss" scoped>
	h1{
		color: red;
	}
</style>
