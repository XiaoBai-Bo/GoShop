<template>
      <div class="msite_order">
        <HeaderTop title="订单列表"></HeaderTop>
        <div class="order_no_login">
          <img src="./images/order/person.png">
          <h3>登录后查看外卖订单</h3>
          <button>立即登陆</button>
        </div>
      </div>
</template>

<script>
	import HeaderTop from "../../components/HeaderTop/HeaderTop.vue"
	export default{
		components:{
			HeaderTop
		}
	}
</script>

<style lang="scss">
	.msite_order{
		height:45px;
		/*background-color: #02a774;*/
		z-index: 100;
		text-align: center;
		position: relative;
    top: 45px;
	    .header_title{
			.header_title_text{
				color:#fff;
				font-size: 20px;
				line-height: 45px;
				}
			}
		.order_no_login{
			button{
				margin-top: 10px;
				border-radius: 6px;
				padding: 10px 10px;
				font-family: arial;
			}
		}
	}	
</style>