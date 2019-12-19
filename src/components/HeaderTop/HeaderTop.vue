<!--slot组件分发-->
<template>
	<header class="msite_header">
        <slot name="left"></slot>
        <span class="header_title">
           <span class="header_title_text ellipsis">{{title}}</span>
        </span>
        <slot name="right"></slot>
    </header>
	
</template>

<script>
	export default{
		data(){
			return{}	
		},
		props:{
			title:String
		}
	}
</script>

<style lang="scss">
	body{
		background-color: #fff;
	}
	.msite_header{
			height: 45px;
			background-color: #02a774;
    		z-index: 100;
    		text-align: center;
		    position: fixed;
			width: 100%;
			top: 0;
			.header_search{
				float: left;
				width: 40px;
				height: 45px;
				display: block;
				line-height: 45px;
			}
			.header_title{
				color:#ffffff;
				line-height: 45px;
				/*position: absolute;*/
				/*left:26%;*/
				overflow: hidden;
				display: inline-block;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 10em;
				text-align: center;
			}
			.header_login{
				float: right;
				line-height: 45px;
				color: #fff;
				margin-right: 10px;
				font-size: 15px;
			}
		}
</style>