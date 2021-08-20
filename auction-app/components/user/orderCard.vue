<template>
	<view class="orderCard">
		<view class="order">
			<view class="header">
				<view class="header-order">{{$t('order.orderId')}}：{{order.id}}</view>
				<view>
					{{order.status==1?$t('order.waitPay'):order.status==2?$t('order.wait'):order.status==3?$t('order.delivery'):$t('order.orderClose')}}
				</view>

				<!-- wait:'等待发货',
					waitPay:'等待支付',
					delivery:'发货中',
					orderClose:'订单关闭' -->
			</view>
			<view class="card" v-if="order.auctionId!==0">
				<view class="cardLeft">
					<view class="img">
						<image class="img" :src="order.productMainImgUrl" mode=""></image>
					</view>

					<view class="cardTitle">
						<view class="title">{{order.productTitle}}</view>
						<view class="price">
							{{$t('order.bidPrice')+':'}}{{order.currency=='usd'?'$':'$'}}{{(parseFloat(order.totalPrice)/100).toFixed(2)}}
						</view>
						<view class="price">
							{{$t('order.bond')+':'}}{{order.currency=='usd'?'$':'$'}}{{(parseFloat(order.deposit)/100).toFixed(2)}}
						</view>
						<!-- <view class="price">{{$t('order.type')}}：商品</view> -->
						<!-- <view class="price">{{$t('order.norms')}}：8G 256G</view> -->
						<!-- <view class="price">{{$t('order.lot')+':'+order.productTitle}}</view> -->
						<!-- bidPrice:'中拍价',
							bond:'保证金',
							type:'类型',
							norms:'规格',
							lot:'拍品', -->
					</view>
				</view>

			</view>
			<view class="card" v-if="order.auctionId==0">
				<view class="cardLeft">
					<view class="cardTitle">
						<view class="title">{{$t('margin.balance')+':'}}${{(parseFloat(order.payPrice)/100).toFixed(2)}}</view>
					</view>
				</view>
			
			</view>
			<view class="cardRight" v-if="order.status!=-1">
				<!-- payment:'实际付款', -->
				<text>{{$t('order.payment')}}：</text>
				<text
					class="blod">{{order.currency=='usd'?'$':'$'}}{{(parseFloat(order.payPrice)/100).toFixed(2)}}</text>
			</view>
			<view class="tips" v-if="order.status==-1">
				<text v-if="order.auctionId!==0">{{ $t('order.text', { timer: order.payExpireTime,bond:(parseFloat(order.deposit)/100).toFixed(2) }) }}</text>
				<text v-else>{{ order.remark }}</text>
			</view>
			<!-- 订单备注，比如支付超时关闭 remark-->

			<view class="bottom">
				<view class="timer" v-if="order.status==1&&timestamp>0">
					<!-- timer:'支付倒计时', -->
					{{$t('order.timer')}}：<u-count-down :font-size='21' color="rgba(60, 60, 67, 0.9)"
						:timestamp="timestamp" @end="endTime">
					</u-count-down>
				</view>
				<view class="button">
					<view class="moreBtn btn" @click.stop="moreFn" >{{$t('order.more')}}</view>
					<view class="payBtn btn" @click.stop="goPayFn" v-if="order.status==1">{{$t('order.pay')}}</view>
					<view class="payBtn btn" @click.stop="lookLogistics" v-if="order.status==3">{{$t('order.logistics')}}</view>
					<view class="payBtn btn" @click.stop="confirm" v-if="order.status==3">{{$t('order.receipt')}}<!-- {{$t('order.logistics')}} --></view>
					<!-- more:'更多',
						pay:'立即支付',
						logistics:'查看物流',
						 receipt:'确认收货'-->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "orderCard",
		props: {
			order: {
				type: Object,
				default: () => {
					return {}
				}
			},
			index: {
				type: [Number, String],
				default: 0
			}
		},
		data() {
			return {
				timestamp: 10
			};
		},
		computed: {
			// options() {
			// 	return [{
			// 		text:  this.$t('order.btnDel'),
			// 		style: {
			// 			backgroundColor: '#FF3B30'
			// 		}
			// 	}]
			// }
		},
		mounted() {
			this.timestamp = (new Date(this.order.payExpireTime).getTime() - new Date().getTime()) / 1000
			// console.log(new Date(this.order.payExpireTime).getTime(),this.order.payExpireTime)

		},
		methods: {
			// 倒计时结束
			endTime() {
				this.$emit('endTime', this.index)
			},
			//更多
			moreFn() {
				this.$emit('moreFn', this.index, this.order.id)
			},
			//立即支付
			goPayFn() {
				this.$emit('payFn', this.index, this.order.id)
			},
			//查看物流
			lookLogistics() {
				this.$emit('lookLogistics', this.order.id,this.index)
			},
			//确认收货
			confirm(){
				this.$emit('confirm', this.order.id,this.index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.orderCard {
		width: calc(100vw - 56rpx);

		.order {
			width: calc(100vw - 54rpx);
			height: 100%;
		}

		.header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 25rpx;
			color: rgba(60, 60, 67, 0.9);
			line-height: 35rpx;
			padding: 28rpx 28rpx 0;

			.header-order {
				font-size: 21rpx;
				font-weight: 400;
				color: #939599;
				line-height: 30rpx;
			}
		}

		.card {
			padding: 44rpx 28rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;

			.cardLeft {
				display: flex;

				.cardTitle {
					font-size: 21rpx;
					color: rgba(60, 60, 67, 0.9);
					line-height: 30rpx;
					margin-left: 19rpx;

					.title {
						font-size: 26rpx;
						font-weight: 600;
						color: #1A1B1D;
						line-height: 42rpx;
						overflow: hidden;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
				}
			}

			.img {
				width: 130rpx;
				height: 130rpx;
				border-radius: 11rpx;
			}


		}

		.cardRight {
			font-size: 21rpx;
			color: rgba(60, 60, 67, 0.9);
			line-height: 20rpx;
			text-align: end;
			padding-right: 28rpx;

			.blod {
				font-size: 28rpx;
				font-weight: bold;
				color: #1A1B1D;
				line-height: 28rpx;
			}
		}

		.tips {
			font-size: 19rpx;
			font-family: PingFangSC;
			color: #0092FF;
			line-height: 28rpx;
			margin-top: 7rpx;
			padding: 0 28rpx;
		}

		.bottom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 47rpx;
			padding: 0 28rpx 28rpx;

			.timer {
				font-size: 21rpx;
				color: rgba(60, 60, 67, 0.9);
				line-height: 30rpx;
			}

			.button {
				display: flex;
				align-items: center;
				margin-left: auto;

				.btn {
					// height: 50rpx;
					border-radius: 30rpx;
					padding: 0 26rpx;
					line-height: 50rpx;
					margin-left: 18rpx;
					border: 1rpx solid rgba(60, 60, 67, 0.3);
					font-size: 23rpx;
					color: rgba(60, 60, 67, 0.9);
				}
			}
		}
	}
</style>
