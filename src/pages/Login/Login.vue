<template>
	<div class="loginContainer">
      	<div class="loginInner">
        
	        <div class="login_header">
	          <h2 class="login_logo">硅谷外卖</h2>
	          <div class="login_header_title">
	            <a  :class="{onn:loginWay}" @click="loginWay=true">短信登录</a>
	            <a  :class="{onn:!loginWay}" @click="loginWay=false">密码登录</a>
	          </div>
	        </div>
	        
	        <div class="login_content">
	          <form @submit.prevent="login()" >
	            <div :style="{display:loginWay?'block':'none'}"> 
	              <div class="login_message">
	                <input type="text" maxlength="11" placeholder="手机号" v-model="phone" >
	                <button :disabled="!rightPhone" 
	                		class="get_verification" 
	                		:class="{right_phone:rightPhone}"
	                		@click.prevent="getCode()"
	                		id="button">
	                		<!--获取验证码-->
	                		<!--{{computeTime>0? '(${computeTime}s)重新获取' : '获取验证码'}}-->
	                		{{computeTime>0 ? `(${computeTime}s)重新获取` : '获取验证码'}}
	                </button>
	              </div>
	              <div class="login_verification">
	                <input type="text" maxlength="8" placeholder="验证码" v-model="code" >
	              </div>
	              <div class="login_hint">
	                                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
	                <a href="javascript:;">《用户服务协议》</a>
	              </div>
	            </div>
	            
	            <div :style="{display:loginWay?'none':'block'}">
	                <div class="login_message">
	                  <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" >
	                </div>
	                <div class="login_verification">
	                  <input type="password" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd" >
	                  <input type="text" maxlength="8" placeholder="密码" v-else v-model="pwd" >
	                  <div class="switch_button" @click="showPwd=!showPwd">
	                    <div class="mui-switch mui-active">
						  <div class="mui-switch-handle"></div>
						</div>
	                  </div>
	                </div>
	                <div class="login_message_yanma">
	                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha" >
	                  <img 
	                  	class="get_verification" 
	                  	src="http://localhost:4000/captcha" 
	                  	alt="captcha"
	                  	@click="getCaptcha"
	                  	ref="captcha">
	                </div>
	            </div>
	            <button class="login_submit mint-button mint-button--default mint-button--large">登录</button>
	          </form>
	          <a href="javascript:;" class="about_us">关于我们</a>
	        </div>
			<a href="javascript:" class="go_back" @click="$router.back()">
         	 	<i class="iconfont">&#xe604;</i>
        	</a>
      	</div>
     	<div :class="{zhedeiceng:alertShow}"></div>  <!--折叠层-->
     	<alertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></alertTip>
    </div>
</template>

<script>
	import mui from '../../lib/mui/js/mui.min.js'
	import alertTip from '../../components/alertTip/alertTip.vue'
	
	import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'
	export default{
		data(){
			return{
				loginWay:true,      //true表示短信登录
				showPwd:false,      //是否显示密码
				computeTime: 0,     //计时
				phone:'' ,          //手机号
				code:'',            //短信验证码 
				name:'',            //用户名
				pwd:'',             //密码
				captcha:'',         //图形验证码
				alertText:'',       //显示文本
				alertShow:false,    //是否显示提示框  
			}
		},
		mounted(){
			mui('.mui-switch')['switch']();  //初始化switch控件
		},
		computed:{
			rightPhone(){
				return /^1\d{10}$/.test(this.phone)
			}
		},
		methods:{
			//启动倒计时
			async getCode(){
//				var num=30;
//				const Element=document.getElementById('button');
//				const interval=setInterval(function(){
//				 	num--;
//				 	console.log(num);
//				 	Element.innerHTML=num+'重新获取';
//				 	Element.disabled='disabled';
//				 	if(num<=0){
//				 		clearInterval(interval)
//				 	}
//				 	if(num==0){
//					 	Element.innerHTML='获取验证码';
//					 	Element.disabled='';
//				 	}
//				 },1000)
				
					if(!this.computeTime) {
			          // 启动倒计时
			          this.computeTime = 30
			          this.intervalId = setInterval(() => {
			            this.computeTime--
			            if(this.computeTime<=0) {
			              // 停止计时
			              clearInterval(this.intervalId)
			            }
			          }, 1000)
					//发送ajax请求(向手机发送短信验证码)
					const result=await reqSendCode(this.phone);
					console.log(result+"获取短信验证码成功");
					if(result.code===1){
						//显示提示
						this.showAlert(result.msg);
						//停止计时
						if(this.computeTime){
							this.computeTime=0;
							clearInterval(this.intervalId)
							this.intervalId=undefined;
						}
					}
				}
			},
			//弹出框的显示
			showAlert(alertText,alertShow){
				this.alertShow=true;
				this.alertText=alertText;
//				this.$messagebox.alert(alertText).then(action => {
// 						 	
//				});
			},
			//关闭警告框
			closeTip(){
				this.alertShow=false;
				this.alertText='';
			},
			//异步登录
			async login(){
				let result
				//前台表单验证
				if(this.loginWay){ //短信登录
					const {rightPhone,phone,code}=this;
					console.log(phone+code)
					if(!this.rightPhone){
						//手机号不正确
						this.showAlert("手机号不正确");
						return
					}else if(!/^\d{6}$/.test(code)){
						//验证码不正确
						this.showAlert("验证码不正确");
						return
					}
					//发送ajax请求短信登录
					result=await reqSmsLogin(phone,code);
					console.log(result+"reqSmsLogin");
					
				}else{  //密码验证
					const {name,pwd,captcha}=this;
					if(!this.name){
						//手机号必须指定
						this.showAlert("手机号不正确");
						return
					}else if(!this.pwd){
						//密码必须指定
						this.showAlert("密码不正确");
						return
					}else if(!this.captcha){
						//验证码必须指定
						this.showAlert("验证码不正确");
						return
					}
					//发送ajax请求密码登录
				 	result=await reqPwdLogin({name,pwd,captcha});
				 	console.log(result+"reqpwdLogin");
				}
				//停止计时
				if(this.computeTime){
					this.computeTime=0;
					clearInterval(this.intervalId)
					this.intervalId=undefined;
				}
				//根据结果处理数据
				if(result.code===0){
					const user=result.data;
					//将user保存到vuex的state
					//去个人中心
					this.$router.replace('/profile')
				}else{
					this.getCaptcha();   //显示新的图形验证码
					const msg=result.msg;
					this.showAlert(msg); //显示警告提示
				}
			},
			//获取一个新的图片验证码
			getCaptcha(){
//				console.log(e.target);
				//每次指定的src要不一样
				this.$refs.captcha.src='http://localhost:4000/captcha?time='+Date.now();
			}
		},
		components:{
			alertTip
		}
	}
</script>

<style lang="scss" scoped>
.zhedeiceng{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(0,0,0,0.3);
	z-index: 10;
}
.loginContainer{
	.loginInner{
		.login_header{
			.login_logo{
				margin-top: 60px;
				color:#02a774 ;
				font-size: 40px;
				text-align: center;
			}
			.login_header_title{
				margin: 35px auto 0 auto;
				display: flex;
				width: 200px;
				justify-content: space-between;
				a{
					color: #000;
					font-size: 15px;
				}
				.onn{
					color: #02a774;
					font-size: 18px;
					font-weight: bold;
					border-bottom: 2px solid #02A774;
				}
			}
		}
		.login_content{
			margin-top: 20px;
			input{
				height: 50px;
				border-radius: 10px;
			}
			.login_message{
				width: 80%;
				margin-left: 10%;
			    position: relative;
				.get_verification{
					position: absolute;
					top: 11px;
    				right: 13px;
					color: #ccc;
					border: 0;
				}
				.right_phone{
					color: #000;
					font-weight: bold;
				}
			}
			.login_message_yanma{
				width: 80%;
				margin-left: 10%;
				position: relative;
				.get_verification{
					position: absolute;
					top: -5px;
				  	right: 10px;
				}
			}
			.login_verification{
				width: 80%;
				margin-left:10% ;
				position: relative;
			}
			.switch_button{
				position: absolute;
			    top: 10px;
    			right: 25px;
    		    .mui-switch.mui-active:before{
    		    	content:'abc';
    		    }
			}
			.login_hint{
				width: 80%;
				margin-left: 10%;
				color: #AAAAAA;
				font-size: 14px;
			}
		}
		.login_submit{
			width: 80%;
			background-color: #2AC845;
			height: 50px;
			border-radius: 10px;
			margin: 10px 0 0 10%;
			color: #fff;
			font-size: 20px;
		}
		.about_us{
			display: block;
			color: #aaa;
			font-size: 14px;
			text-align: center;
			margin-top: 20px;
		}
		.go_back{
			color: #000;
			position: absolute;
			top: 15px;
			left: 15px;
		}
	}
}


</style>