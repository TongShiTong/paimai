import Request from './request'
import apiList from './api'
import store from '@/common/store/index.js'

export default function api(url, data = {}, param) {
	const request = new Request();
	let api = getApiObj(url);
	let urlApi = api.url;
	if(param) {
		urlApi = api.url + param
	}
	
	request.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
        let tokenFlag = store.getters.loginFlag;
		if (api.auth && !tokenFlag) {
            store.commit('OUT_LOGIN');
			uni.reLaunch({
			    url: '/pages/login/index'
			});
            console.log('暂未登录,已阻止此次API请求~');
            throw('暂未登录,已阻止此次API请求~');
		}
		if (tokenFlag) {
            //tokenInfo.access_token即为登录token
			config.header.Authorization = uni.getStorageSync('tokenInfo');
		}
		return config
	});

	request.interceptor.response((response) => { /* 请求之后拦截器 */
		// console.log(response)
        if (response.statusCode === 401) { // 服务端返回的状态码不等于200，则reject()
            //401代表token失效
            store.commit('OUT_LOGIN');
			uni.reLaunch({
			    url: '/pages/login/index'
			});
        }
        
		if (response.statusCode != 200) { // 服务端返回的状态码不等于200，则reject()
			uni.showToast({
				title: response.data.message || '请求出错,稍后重试',
				icon: 'none',
				duration: 2000,
				mask: true
			});
		}

		
		// if (response.config.custom.verification) { // 演示自定义参数的作用
		//   return response.data
		// }
		return response
	}, (response) => { // 预留可以日志上报
		return response
	})

	return request.request({
		url: urlApi,
		data,
		method: api.method
	})

}

function getApiObj(url) {
	let apiArray = url.split(".");
	let api = apiList;
	apiArray.forEach(v => {
		api = api[v];
	});
	return api;
}
