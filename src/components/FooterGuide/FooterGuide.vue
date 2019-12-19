<template>
	<div>
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to='/msite'>
				<span class="mui-icon iconfont">&#xe62b;</span>
				<span class="mui-tab-label">外卖</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"><span class="mui-badge">9</span></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/order">
				<span class="mui-icon iconfont">&#xe64e;</span>
				<span class="mui-tab-label">订单</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/profile">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">我的</span>
			</router-link>
		</nav>
	</div>
</template>

<script>
</script>

<style lang="scss">
	/*改类名，修bug ，解决tabbar无法正常滑动的问题*/
.mui-bar .mui-tab-item-llb.mui-active {
    color: #007aff;
}
.mui-bar .mui-tab-item-llb {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
	     .mui-icon {
		    top: 3px;
		    width: 24px;
		    height: 24px;
		    padding-top: 0;
		    padding-bottom: 0;
		   
	}
		 .mui-icon~.mui-tab-label {
			    font-size: 11px;
			    display: block;
			    overflow: hidden;
			    text-overflow: ellipsis;
		}
}
</style>