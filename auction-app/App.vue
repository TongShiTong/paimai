<script>
	import { mapActions } from 'vuex'
	export default {
		onLaunch: function() {
			let that = this
			uni.getSystemInfo({
			    success: function (res) {
					that.setStatusbarHeight(res.statusBarHeight)
					that.setWindowBottom(res.windowBottom)
					
			    }
			});
			// if(uni.getStorageSync('tokenInfo')){
			// 	this.$store.dispatch('getUserInfo').then(res=>{
			// 		if(res.code==0){
			// 			uni.reLaunch({
			// 				url:"/pages/index/index",
			// 			})
			// 		}
					
			// 	}).catch(err=>{
					
			// 	})
			// }

		},
		methods: {
			...mapActions(['setStatusbarHeight','setWindowBottom']),
		},
		onShow: function() {
			console.log('App Show')
			// #ifdef APP-PLUS
			// const xinstall = uni.requireNativePlugin('xinstall-plugin');
			// xinstall.addWakeUpEventListener(function(result){
			//   // 回调函数将在合适的时机被调用，这里编写拿到渠道编号以及唤醒数据后的业务逻辑代码
			
			//   // 空对象时代表唤醒了，但是没有任何参数传递进来
			//   console.log(JSON.stringify(result))
			//   plus.nativeUI.toast(JSON.stringify(result));
			//   uni.setStorageSync('storage_key',JSON.stringify(result))
			//   if (JSON.stringify(result) == '{}') {
			//     // 业务逻辑
			//   } else {
			//     var channelCode = result.channelCode;
			//     var data = result.data;
			//     var co = data.co;
			//     var uo = data.uo;
			//     // 根据获取到的数据做对应业务逻辑
			//   }
			// });
			// #endif
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
    /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	page {
		background-color: #F3F4F5;
	}
</style>