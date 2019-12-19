<template>
      <div class="profile">
        <HeaderTop title="我的"></HeaderTop>
        <div class="profile-number">
          <router-link href="javascript:" class="profile-link" to="/login"> 
            <div class="profile_image">
              <i class="iconfont">&#xe606;</i>
            </div>
            <div class="user-info">
              <p class="user-info-top">登录/注册</p>
              <p>
                <span class="user-icon">
                  <i class="iconfont">&#xe622;</i>
                </span>
                <span class="icon-mobile-number">暂无绑定手机号</span>
              </p>
            </div>
            <span class="arrow">
              <i class="iconfont">&#xe605;</i>
            </span>
          </router-link>
        </div>
        <div class="profile_info_data border-1px">
          <ul class="info_data_list">
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span style="color: orange;">0.00</span>元</span>
              <span class="info_data_bottom">我的余额</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span style="color: red;">0</span>个</span>
              <span class="info_data_bottom">我的优惠</span>
            </a>
            <a href="javascript:" class="info_data_link">
              <span class="info_data_top"><span style="color: green;">0</span>分</span>
              <span class="info_data_bottom">我的积分</span>
            </a>
          </ul>
        </div>
        <div class="profile_my_order border-1px">
          <!-- 我的订单 -->
          <a href='javascript:' class="my_order">
            <span class="iconed">
              <i class="iconfont" style="color: green;">&#xe64e;</i>
            </span>
            <div class="my_order_div">
              <span>我的订单</span>
              <span class="my_order_icon">
                <i class="iconfont">&#xe605;</i>
              </span>
            </div>
          </a>
          <!-- 积分商城 -->
          <a href='javascript:' class="my_order">
            <span class="iconed">
              <i class="iconfont"style="color: red;">&#xe601;</i>
            </span>
            <div class="my_order_div">
              <span>积分商城</span>
              <span class="my_order_icon">
                <i class="iconfont">&#xe605;</i>
              </span>
            </div>
          </a>
          <!-- 硅谷外卖会员卡 -->
          <a href="javascript:" class="my_order">
            <span class="iconed">
              <i class="iconfont"style="color: orange;">&#xe637;</i>
            </span>
            <div class="my_order_div">
              <span>硅谷外卖会员卡</span>
              <span class="my_order_icon">
                <i class="iconfont">&#xe605;</i>
              </span>
            </div>
          </a>
          <!-- 服务中心 -->
          <a href="javascript:" class="my_order">
            <span class="iconed">
              <i class="iconfont"style="color: green;">&#xe600;</i>
            </span>
            <div class="my_order_div">
              <span>服务中心</span>
              <span class="my_order_icon">
                <i class="iconfont">&#xe605;</i>
              </span>
            </div>
          </a>
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
	body{
		background-color: #fff;
	}
	.profile{
		position: relative;
    top: 45px;
		.header{
			height:45px;
			background-color: #02a774;
			z-index: 100;
			text-align: center;
			.header_title{
				.header_title_text{
					color:#fff;
					font-size: 20px;
					line-height: 45px;
				}
			}
		}
		.profile-number{
			height: 100px;
			background-color: #02a774;
			border-top: 1px solid #fff;
			.profile-link{
				display:block;
				width:100%;
				height:100px;
				.profile_image{
					float: left;
					width: 100px;
					height: 100px;
					text-align: center;
					.iconfont{
						font-size: 60px;
						color: #ccc;
						line-height: 100px;
					}
				}
				.user-info{
					float: left;
					height: 100px;
					.user-info-top{
						color: #fff;
						font-size: 20px;
						margin-top: 25px;
					}
					.user-icon{
						.iconfont{
							color: #fff;
						}
					}
					.icon-mobile-number{
						color: #fff;
						margin-bottom: 25px;
					}
				}
				.arrow{
					float: right;
					width: 100px;
					height: 100px;
					text-align: right;
					margin-right: 10px;
					.iconfont{
						line-height: 100px;
						color: #fff;
					}
				}
			}
		}
		.profile_info_data{
			height: 100px;
			width:100%;
			border-bottom: 1px solid #ccc;
			.info_data_list{
				margin: 0;
				padding: 0;
				display: flex;
		    width: 100%;
		    position: absolute;
				.info_data_link{
					display: block;
					flex-direction: column;
			    flex-grow: 1;
					height: 100px;
					float: left;
					border-right: 1px solid #ccc;
					.info_data_top{
						display: block;
						text-align: center;
						height: 60px;
						line-height: 60px;
						color:#000;
						span{
							font-size: 30px;
						}
					}
					.info_data_bottom{
						display: block;
						text-align: center;
						height: 40px;
						color: #000;
					}
				}
			}
		}
		.profile_my_order{
			.my_order{
				.iconed{
					float: left;
					display: block;
					width: 50px;
					height: 50px;
					.iconfont{
						position: absolute;
						left: 5px;
						font-size: 25px;
						line-height: 50px;
						margin-left: 0;
					}
				}
				.my_order_div{
					/*height: 50px;*/
					line-height: 50px;
					color: #000;
					border-bottom: 1px solid #ccc;
					span{
						
					}
					.my_order_icon{
						position: absolute;
						right: 10px;
					}
				}
			}
		}	
	}
</style>