<template>
	<view>
		<u-navbar :title="$t('mine.bond')">
			<template v-slot:right>
				<view style="margin-right: 28rpx;" @click="goPath('/pages/mine/records')">{{$t('margin.record')}}</view>
			</template>
		</u-navbar>
		<view class="card">
			<view class="card_title">{{$t('margin.amount')}}</view>
			<view class="price">
				<text>$</text>{{(parseFloat(bond)/100).toFixed(2)}}
			</view>
			<view class="tip">{{$t('margin.text')}}</view>
		</view>
		<view class="footer">
			<!-- <view class="btn withdrawal" @click="goPath('/pages/mine/withdrawal')">{{$t('margin.withdraw')}}</view> -->
			<view class="btn recharge" @click="goPath('/pages/mine/recharge')">{{$t('margin.recharge')}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bond:0,
			};
		},
		onLoad() {
			// this.getDeposit()
		},
		onShow() {
			this.getDeposit()
		},
		methods:{
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
			goPath(url){
				// console.log(url)
				uni.navigateTo({
					url
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.card{
	margin: 21rpx 28rpx 35rpx;
	padding: 0rpx 28rpx 25rpx;
	border-radius: 14rpx;
	background: #fff;
	.card_title{
		height: 91rpx;
		line-height: 91rpx;
		font-size: 30rpx;
		font-weight: bold;
		color: #2A2B2E;
	}
	.price{
		font-size: 88rpx;
		font-weight: 400;
		color: $btnActive;
		line-height: 88rpx;
		margin: 52rpx 0 70rpx;
		text{
			font-size: 53rpx;
			font-weight: 500;
		}
	}
	.tip{
		font-size: 21rpx;
		color: rgba(60, 60, 67, 0.6);
		line-height: 30rpx;
	}
}

.footer{
	margin:35rpx 28rpx;
	display: flex;
	justify-content: space-between;
	.btn{
		text-align: center;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 21rpx;
		border: 2rpx solid $btnActive;
		font-size: 35rpx;
		font-weight: 600;
		color: $btnActive;
		background: #F3F3F3;
	}
	.withdrawal{
		margin-right: 50rpx;
	}
	.recharge{
		background: $btnActive;
		color: #FFFFFF;
	}
}
</style>
