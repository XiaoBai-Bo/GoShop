<template>
	<div class="tip_text_container">
		<div class="tip_icon">
			<span class="span1"></span>
			<span class="span2"></span>
		</div>
		<p class="tip_text">
			{{alertText}}
		</p>
		<div class="confrim" @click="closeTip()">确认</div>
	</div>	
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			closeTip(){
				//分发自定义事件(事件名：closeTip)
				this.$emit('closeTip');
			}
		},
		props:{
			alertText:String,
		}
	}
</script>

<style lang="scss" scoped>
	.tip_text_container{
	    width: 320px;
	    height: 160px;
	    background-color: #fff;
	    border-radius: 10px;
	    position: absolute;
	    top: 274px;
	    left: 7%;
	    z-index: 20;
	    animation:tip 0.4S;
		.tip_icon{
		    width: 4rem;
		    height: 4rem;
		    border: .15rem solid #f8cb86;
		    border-radius: 50%;
		    display: flex;
		    justify-content: center;
		    align-items: center;
		    flex-direction: column;
		    position: relative;
   			left: 39.6%;
   		    margin-top: 5px;
		    .span1{
		    	width: .12rem;
		        height: 1.5rem;
		        background-color: #f8cb86;
		    }
		    .span2{
		    	width: .2rem;
			    height: .2rem;
			    border: 1px;
			    border-radius: 50%;
			    margin-top: .2rem;
			    background-color: #f8cb86;
		    }
		}
		.tip_text{
			font-size: 18px;
		    color: #333;
		    line-height: .9rem;
		    text-align: center;
		    margin-top: .8rem;
		    padding: 0 .4rem;
		}
		.confrim{
		    color: #fff;
		    font-weight: 700;
		    margin-top: .8rem;
		    background-color: #4cd964;
		    width: 100%;
		    text-align: center;
		    line-height: 40px;
		    border: 1px;
		    border-bottom-left-radius: .25rem;
		    border-bottom-right-radius: .25rem;
		    position: absolute;
		    bottom: 0;
		    height: 40px;
		}
		
	}
	@keyframes tip{
		0% {
		    transform: scale(1);
		}
		35% {
		    transform: scale(.8);
		}
		70% {
		    transform: scale(1.1);
		}
		100% {
		    transform: scale(1);
		}
	}	
</style>