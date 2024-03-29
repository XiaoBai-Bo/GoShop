//ajax请求函数模块
//promise对象(异步返回的数据是：response.data)
import axios from 'axios'
export default function ajax(url,data={},type="GET"){
	return new Promise(function(resolve,reject){
		//执行异步ajax请求
		let promise;
		if(type==='GET'){
			//准备url query参数数据
			let dataStr='';  //数据拼接字符串
			Object.keys(data).forEach(key => {
				dataStr+=key+'='+data[key]+"&";
			})
			if(dataStr!==''){
				dataStr=dataStr.substring(0,dataStr.lastIndexOf('&'));
				url=url+'?'+dataStr;
			}
			//发送get请求
			promise=axios.get(url);
		}else{
			//发送post请求
			promise=axios.post(url,data);
		}
		promise.then(function(res){
			//成功调用resolve()
			resolve(res.data);
			console.log(res.data+'resolve')
		}).catch(function(err){
			//失败调用reject()
			reject('调用失败');
		})
	})
}
