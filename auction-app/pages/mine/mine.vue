<template>
	<view class="">
		<view class="mine">
			<view class="avatar content">
				<view class="right">{{$t('mine.avatar')}}</view>
				<view class="img" @click="goMeans">
					<image :src="userInfo.avatar?userInfo.avatar:$avatar" mode=""></image>
				</view>
			</view>
			<view class="nickname content">
				<view class="right">{{$t('mine.nickname')}}</view>
				<view class="name" @click="goMeans">
					<text style="margin-right: 16rpx;">{{userInfo.nickName?userInfo.nickName:$t('message.perfectName')}}</text><u-icon color="rgba(60, 60, 67, 0.8)" font-size='28' name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
		<view class="posBottom">
			<view :style="{width: '100%',height:windowBottom+175+'rpx'}"></view>
			<view class="posBac" :style="{height:windowBottom+165+'rpx'}"></view>
			<view class="btn" :style="{bottom:windowBottom+60+'rpx'}" @click="outLogin()">{{$t('mine.logOut')}}</view>
		</view>
	</view>
	
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name:'mine',
		computed: {
			...mapState(['windowBottom'])
		},
		data() {
			return {
				userInfo:{}
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.$t('mine.personal')
			});
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods:{
			outLogin(){
				this.$store.commit('OUT_LOGIN')
				uni.reLaunch({
					url:'/pages/login/index'
				})
			},
			goMeans(){
				uni.navigateTo({
					url:'/pages/login/meansPerfect'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mine{
	background: #fff;
	padding: 0 28rpx;
}
.content{
	height: 140rpx;
	line-height: 140rpx;
	background-color: #fff;
	border-bottom: 2rpx solid #D9D9D9;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.right{
		font-size: 26rpx;
		color: #2A2B2E;
	}
	.img{
		width: 97rpx;
		height: 97rpx;
		// background: #EBEBEB;
		border-radius: 50%;
		image{
			width: 97rpx;
			height: 97rpx;
			border-radius: 50%;
		}
	}
	.name{
		font-size: 26rpx;
		color: rgba(60, 60, 67, 0.8);
	}
}
.nickname{
	border: none;
}
.bottom{
	margin: 0 28rpx;
	position: fixed;
	width: calc(100% - 56rpx);
	bottom: 96rpx;
	button{
		height: 105rpx;
		line-height: 105rpx;
		background: $btnActive;
		color: #fff;
		font-weight: 700;
		font-size: 35rpx;
		border-radius: 21rpx;
		&::after{
			border: none;
		}
	}
}
</style>
