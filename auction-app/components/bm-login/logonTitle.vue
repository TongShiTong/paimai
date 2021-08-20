<template>
	<view class="login_title">
		<view class="header">
			<view class="title">
				{{$t('login.title')}}
			</view>
			<view class="small">
				{{$t('login.titleSmall')}}
			</view>
		</view>
		<view class="lang">
			<lang></lang>
		</view>
	</view>
</template>

<script>
	import lang from '@/components/lang/lang.vue'
	export default{
		components:{
			lang
		},
		data(){
			return {
				
			}
		},
		mounted() {
			
			
		},
		methods:{
			// goPath(){
			// 	// #ifdef APP-PLUS
			// 		uni.setClipboardData({
			// 		    data: 'hello',
			// 		    success: function () {
			// 		        console.log('success');
			// 		    }
			// 		});
			// 	// #endif
			// }
		}
	}
</script>

<style scoped lang="scss">
	$active:#b3d8f5;
	.header{
		margin:0 70rpx 100rpx;
		.title{
			font-size: 53rpx;
			line-height: 77rpx;
			color: $btnActive;
			font-weight: 700;
		}
		.small{
			font-size: 28rpx;
			color: rgba(60, 60, 67, 0.8);
		}
		
	}
	.lang{
		padding: 0 70rpx 30rpx;
	}
</style>
