import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
import user from './modules/user.js'
const state = {
	localeLang: uni.getStorageSync('language')||'en',
	langList:[],
	phoneCountryId:uni.getStorageSync('userInfo')?uni.getStorageSync('userInfo').countryId:3644,
	statusHeight: 0,
	windowBottom: 0
}
const getters = {
	getLocaleLang() {
		return state.localeLang
	}
}
const mutations = {
	// 设置语言
	SET_LOCALELANG( state, lang ) {
		state.localeLang = lang
		state.phoneCountryId = lang=='zh'?3644:lang=='en'?3830:lang=='ms'?3732:lang=='vi'?3836:lang=='id'?3701:lang=='th'?3815:'3644'
	},
	// 设置语言
	SET_LANG( state, list ) {
		state.langList = list
	},
	SET_COUNTRY(state,coutry){
		state.phoneCountryId = coutry
	},
	// 设置状态栏高
	SET_STATUSBAR( state, status ) {
		state.statusHeight = status
	},
	WINDOW_BOTTOM( state, status ) {
		state.windowBottom = status
	}
}
const actions = {
	// 设置语言
	setLocaleLang( context, lang ) {
		context.commit('SET_LOCALELANG', lang)
	},
	// 设置语言
	setLang( context, list) {
		context.commit('SET_LANG', list)
	},
	setCountry(context,country){
		context.commit('SET_COUNTRY', country)
	},
	// 获取设备状态栏高度,并设置
	setStatusbarHeight( context, status ) {
		context.commit('SET_STATUSBAR', status)
	},
	// 获取设备底部可使用位置
	setWindowBottom( context, status ) {
		context.commit('WINDOW_BOTTOM', status)
	}
}
const store = new Vuex.Store({
	state,
	getters,
	mutations,
	actions,
	modules: {
		user
	}
})

export default store
