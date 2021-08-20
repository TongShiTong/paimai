import Vue from 'vue'
import App from './App'
import router from '@/common/router'
import store from '@/common/store'
import tools from '@/common/utils/tools'
import uView from "uview-ui";

// @import 'uview-ui/theme.scss';

import {
	RouterMount
} from 'uni-simple-router'
import api from '@/common/request/index'

import VueI18n from 'vue-i18n' 

//使用引入
Vue.use(VueI18n);
import cn from '@/common/js/lang/cn.js';
import cnTw from '@/common/js/lang/cn-tw.js'; 
import en from '@/common/js/lang/us.js';  	
import jp from '@/common/js/lang/jp.js';
import kr from '@/common/js/lang/kr.js';
import gm from '@/common/js/lang/de.js';
import my from '@/common/js/lang/my.js';
import vn from '@/common/js/lang/vn.js';
import ph from '@/common/js/lang/ph.js';
import id from '@/common/js/lang/id.js';
import th from '@/common/js/lang/th.js';


//定义标识符
const i18n = new VueI18n({    
  locale:uni.getStorageSync('language')||'en',    
  messages: { 
	'zh':cn,
    'en':en,
	'zh-TW':cnTw,
	'JP':jp,
	'KR':kr,
	'GM':gm,
	'ms':my,
	'vi':vn,
	'PH':ph,
	'id':id,
	'th':th
  }    
}) 

Vue.prototype._i18n = i18n;

Vue.prototype.$store = store;
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;
Vue.prototype.$back = function () {
	uni.navigateBack({
		delta:1
	})
}
Vue.prototype.$tow = function(num) {
	let data = (num/100).toFixed(2);
	return data;
}
//默认头像
Vue.prototype.$avatar = '/static/tabbar/tab-user.png';

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(uView);

const app = new Vue({
	i18n,
    store,
    ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif