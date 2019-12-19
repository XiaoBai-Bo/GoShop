#项目简介  说说你的项目
	此项目是一款模仿外卖所实现的app，项目所采用的技术是基于vue+webpack+ES6等技术
	使用模块化，组件化，工程化的模式开发，方便日后进行维护和修改。
## 分析
		1.项目在开发阶段，首先，分析项目结构，搭建好整体页面，一级路由有四个页面，
			分别是首页页面，搜索页面，订单页面，个人页面。
		2.在做一级路由时，可抽离头部组件，使用slot插槽技术，实现头部标题内容的传递。
			拆分评价分数组件，运用逻辑算法，实现不同分数点亮不同的星星	
		3.二级路由分别是商家商品，商家评价，商家信息。
		4.当项目比较大，数据比较多时，组件间传值不方便时，我们可以使用vuex进行数据状态管理。
		5.使用promise+axios封装ajax请求，在mounted中使用...mapState([''])从vuex中获取数据，渲染到页面中。
		6.在做商家商品页面时，
			1)	使用better-scroll实现二级联动效果，解决better-scroll使用中的bug，比如，better-scroll禁用了
				原生的DOM，使用的是自定义的事件。创建better-scroll的时机在什么时候：当页面渲染完毕，所有的DOM元素渲染完毕。
				可以使用this.$nextTick方法确定DOM更新完在执行。在mounted中执行
			2)	拆分购物车按钮组件，实现点击按钮加入购物车,使用transtion实现购物车按钮动画，旋转，平移。	
		7.做商家评价页面
			1)使用better-scroll实现横向滚动
			2)使用date-fns进行日期格式化，不选择moment日期插件的原因是，
				在使用webpack进行打包时，moment.js占用的资源尺寸过大.而date-fns内置了很多函数，我们只需将用到的部分进行导入即可，
				解决了moment占用资源过大的问题
		8.搜索功能，将搜索到的商家展示到页面，使用	:to属性进行跳转，并传入不同商家的id	
		9.登录注册功能：目前有两种登录方式：
			1)第一种：短信验证码登录：向手机发送短信验证码。
			2)第二种：密码登录
			3)当登录成功，跳转到首页，并刷新界面，显示当前用户名。
		以上是本项目的所有技术和实现的功能			

## 结束阶段
	进行项目优化：
		1.使用<keep-alive></keep-alive>标签实现路由缓存对象
		2.路由组件懒加载，拆分js文件，作用是给用户更好的体验，
			首页组件加载速度快，懒加载可以将页面进行划分，需要的时候加载页面，可以有效地分担首页所承担的加载压力
			使用ES提出的import方法。const name = () =>import('模块地址')	
		3.优化路由跳转的问题，replace属性不添加上一个页面的url，跳转到上上一个页面
		
##  项目技术
		1.运用better-scroll插件实现滚动
		2.使用date-fns插件格式化时间
		3.使用Mint-ui,mui等移动端ui框架美化界面
		4.使用mock.js拦截Ajax请求，模拟后端发送数据
		5.使用swiper触摸滑动插件实现轮播效果
		6.使用vue-lazyload插件实现图片懒加载效果，提高用户体验
		7.使用vue-axios发送http请求






