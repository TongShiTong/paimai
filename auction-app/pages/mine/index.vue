<template>
	<view class="user">
		<view class="title">
			<view class="left" @click="goPath('/pages/mine/mine')">
				<view class="img">
					<image :src="userInfo.avatar?userInfo.avatar:$avatar" mode=""></image>
				</view>
				<view class="name">{{userInfo.nickName}}</view>
			</view>
			<view class="iconRignt" @click="goPath('/pages/mine/mine')">
				<u-icon name="arrow-right" color="#2A2B2E" size="46"></u-icon>
			</view>
		</view>
		<view class="bond">
			<view class="price">
				{{$t("mine.bond")}}：<text style="font-size: 35rpx;">${{(parseFloat(bond)/100).toFixed(2)}}</text>
			</view>
			<view class="rech" @click="goPath('/pages/mine/bond')">{{$t("mine.btn")}}</view>
		</view>
		<view class="content">
			<view class="order">
				<user-card :list='orderList' :title='$t("mine.order")' :unRead='unRead' :moreShow='true'></user-card>
			</view>
			<view class="other">
				<user-card :list='otherList' :title='$t("mine.other")' :moreShow='false'></user-card>
			</view>
		</view>
	</view>
</template>

<script>
	import userCard from '@/components/user/userCard.vue'
	export default {
		components: {
			userCard
		},
		data() {
			return {
				userInfo: {
					nickName: '点击登录',
					avatar:''
				},
				bond:0,
				unRead:[]
			};
		},
		computed: {
			orderList(){
				return [{
						name: this.$t('mine.paid'),
						url: '/pages/mine/orderList',
						imageUrl: require('@/static/mine/paid.png'),
						status: '1'
					}, {
						name: this.$t('mine.delivered'),
						url: '/pages/mine/orderList',
						imageUrl: require('@/static/mine/delivered.png'),
						status: '2'
					}, {
						name: this.$t('mine.received'),
						url: '/pages/mine/orderList',
						imageUrl: require('@/static/mine/received.png'),
						status: '3'
					}, {
						name: this.$t('mine.completed'),
						url: '/pages/mine/orderList',
						imageUrl: require('@/static/mine/completed.png'),
						status: '9'
					}
				]
			},
			otherList(){
				return [{
						name: this.$t('mine.scene'),
						url: '/pages/mine/shootingScene',
						imageUrl: require('@/static/mine/scene.png'),
					}, {
						name: this.$t('mine.address'),
						url: '/pages/mine/address',
						imageUrl: require('@/static/mine/address.png'),
					}, {
						name: this.$t('mine.bank'),
						url: '/pages/mine/bankCard',
						imageUrl: require('@/static/mine/received.png'),
					}, {
						name: this.$t('mine.customer'),
						imageUrl: require('@/static/mine/service.png'),
						type:'tel'
					},{
						name: this.$t('mine.lang'),
						url: '/pages/mine/language',
						imageUrl: require('@/static/mine/lang.png'),
					}, {
						name: this.$t('mine.editPwd'),
						url: '/pages/mine/editPwd',
						imageUrl: require('@/static/mine/setPwd.png'),
					}, {
						name: this.$t('mine.account'),
						url: '/pages/mine/account',
						imageUrl: require('@/static/mine/account.png'),
					}, {
						name: this.$t('mine.about'),
						url: '/pages/mine/about',
						imageUrl: require('@/static/mine/about.png'),
					}
				]
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.$t('mine.mineTitle')
			});
			this.getDeposit()
			this.getUnread()
		},
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods: {
			async getDeposit(){
				await this.$api('user.deposit', {}).then(res=>{
					console.log(res)
					if(res.code==0){
						this.bond = res.data
					}
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				});
			},
			///** 查询订单未读数 ↓ **/
			async getUnread(){
				await this.$api('order.unread', {}).then(res=>{
					// console.log(res)
					if(res.code==0){
						this.unRead = res.data
					}
				}).catch((e)=>{
				  // resolve(false);
				  // uni.hideLoading();
				  this.$u.toast(e.data.message);
				});
			},
			goPath(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		padding: 0 28rpx;
	}

	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 35rpx 0;

		.left {
			display: flex;
			align-items: center;

			.img {
				width: 95rpx;
				height: 95rpx;
				border-radius: 50%;
				margin-right: 18rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}

			.name {
				font-size: 33rpx;
				font-weight: bold;
				color: #2A2B2E;
				line-height: 46rpx;
			}
		}
	}

	.bond {
		width: 100%;
		height: 116rpx;
		background: linear-gradient(90deg, #464964 0%, #1D1C35 100%);
		border-radius: 28rpx 28rpx 21rpx 21rpx;
		padding: 0 28rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #F2F4F7;

		.price {
			font-size: 25rpx;
			font-weight: bold;
		}

		.rech {
			height: 49rpx;
			background: linear-gradient(270deg, #F7E2B4 0%, #FCF0D7 100%);
			border-radius: 23rpx;
			font-size: 23rpx;
			font-weight: 500;
			color: #1D1E1F;
			line-height: 49rpx;
			padding: 0 21rpx;
		}
	}
</style>
