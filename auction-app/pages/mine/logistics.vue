<template>
	<view class="logistics">
		<view class="img">
			<image src="../../static/logistics/logistics.png" mode=""></image>
		</view>
		<view class="title">
			{{logistics.deliveryCompany}} {{logistics.deliverySn}} <text @click="copyFn">复制</text>
		</view>
		<view class="content">
			<!-- <view class="con-item">
				<view class="itemTime">2021-07-18 16:48:59</view>
				<view class="itemIcon">
					<image src="../../static/logistics/qianshou.png" mode=""></image>
				</view>
				<view class="con">
					<view class="item_title">已签收</view>
					<view class="text">福州市｜福建福州公司鼓楼区深体育馆倾听分部-陈宇元（18526736578）</view>
				</view>
				<view class="line"></view>
			</view>
			<view class="con-item">
				<view class="itemTime">2021-07-18 16:48:59</view>
				<view class="itemIcon">
					<image src="../../static/logistics/qujian.png" mode=""></image>
				</view>
				<view class="con">
					<view class="item_title">待取件</view>
					<view class="text">福州市｜福建福州公司鼓楼区深体育馆倾听分部-陈宇元（18526736578）</view>
				</view>
				<view class="line solid"></view>
			</view>
			<view class="con-item">
				<view class="itemTime">2021-07-18 <br> 16:48:59</view>
				<view class="itemIcon">
					<image src="../../static/logistics/paisong.png" mode=""></image>
				</view>
				<view class="con">
					<view class="item_title">派送中</view>
					<view class="text">福州市｜福建福州公司鼓楼区深体育馆倾听分部-陈宇元（18526736578）</view>
				</view>
				<view class="line solid"></view>
			</view>
			<view class="con-item">
				<view class="itemTime">2021-07-18 <br> 16:48:59</view>
				<view class="itemIcon">
					<image src="../../static/logistics/yunshu.png" mode=""></image>
				</view>
				<view class="con">
					<view class="item_title">运输中</view>
					<view class="text">福州市｜福建福州公司鼓楼区深体育馆倾听分部-陈宇元（18526736578）</view>
				</view>
				<view class="line solid"></view>
			</view>
			<view class="con-item">
				<view class="itemTime">2021-07-18 <br> 16:48:59</view>
				<view class="itemIcon">
					<image src="../../static/logistics/lanjian.png" mode=""></image>
				</view>
				<view class="con">
					<view class="item_title">已揽件</view>
					<view class="text">福州市｜福建福州公司鼓楼区深体育馆倾听分部-陈宇元（18526736578）</view>
				</view>
				<view class="line solid"></view>
			</view> 
			<view class="con-item">
				<view class="itemTime">{{orderInfo.createdTime}}</view>
				<view class="itemIcon">
					<image src="../../static/logistics/fahuo.png" mode=""></image>
				</view>
				<view class="con">
					<view class="item_title">已发货</view>
					<view class="text">包裹正在等待揽收</view>
				</view>
				<view class="line solid"></view>
			</view>-->
			<view>
				<view class="con-item" v-for="(item,index) in list" :key='index'>
					<view class="itemTime">{{item.time}}</view>
					<view class="itemIcon">
						<image src="../../static/logistics/lanjian.png" mode=""></image>
					</view>
					<view class="con">
						<view class="item_title">已揽件</view>
						<view class="text">{{item.context}}</view>
					</view>
					<view :class="index==0?'line':'line solid'"></view>
				</view>
			</view>
			
			<view class="con-item">
				<view class="itemTime">{{orderInfo.createdTime}}</view>
				<view class="itemIcon">
					<image src="../../static/logistics/xiadan.png" mode=""></image>
				</view>
				<view class="con">
					<view class="item_title">已下单</view>
					<view class="text">商品已经下单</view>
				</view>
			</view>
		</view>
		<!-- <u-empty text="暂无物流信息" mode="list" v-if="list.length==0"></u-empty> -->
	</view>
</template>

<script>
	import tools from '@/common/utils/tools'
	export default {
		data() {
			return {
				list: [],
				orderNo: '',
				logistics: null,
				orderInfo:null,
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo
			this.getLogistics()
			this.getOrder()
		},
		methods: {
			getLogistics() {
				this.$api('order.logistics', {}, `${this.orderNo}/logistics`).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.logistics = res.data
					} else {
						this.$u.toast(res.message);
					}
				}).catch((e) => {
					this.$u.toast(e.data.message);
					this.CVVshow = false
					this.price = ''
				});
			},
			getOrder() {
				this.$api('order.orderInfo', {}, `${this.orderNo}`).then(res => {
					// console.log(res)
					if (res.code == 0) {
						this.orderInfo = res.data
						// console.log((this.orderInfo))
						let date = new Date(Number(this.orderInfo.createdTime))
						console.log(date)
						this.orderInfo.createdTime = tools.dateFormat('YYYY-mm-dd HH:MM:SS',date)
						console.log(this.orderInfo.createdTime)
						// let obj = {
						// 	time:res.data.payExpireTime
						// }
						// this.list.push(obj)
					} else {
						this.$u.toast(res.message);
					}
				}).catch((e) => {
					console.log(1)
				});
			},
			copyFn() {
				uni.setClipboardData({
					data: '278936479283748',
					success: (res) => {
						// console.log(res)
						this.$u.toast('内容已复制')
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		overflow: hidden;
	}

	.logistics {
		margin: 18rpx 28rpx;
		border-radius: 21rpx;
		background-color: #fff;

		.img {
			width: 100%;
			height: 18rpx;
			line-height: 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.title {
			padding: 35rpx 28rpx 0;
			font-size: 26rpx;
			color: #2A2B2E;
			line-height: 37rpx;

			text {
				margin-left: 14rpx;
				font-size: 21rpx;
				color: #0092FF;
				line-height: 30rpx;
			}
		}

		.content {
			padding: 60rpx 28rpx 0;

			.con-item {
				height: 180rpx;
				display: flex;
				position: relative;

				.line {
					width: 0;
					z-index: 0;
					height: 180rpx;
					border-left: 4rpx dashed rgba(60, 60, 67, 0.6);
					position: absolute;
					top: 20rpx;
					left: 136rpx;
				}

				.solid {
					border-left: 4rpx solid #F2F4F7;
					;
				}

				.itemTime {
					font-size: 19rpx;
					font-family: PingFang-SC-Regular, PingFang-SC;
					font-weight: 400;
					// color: #8C8C8C;
					line-height: 21rpx;
					width: 100rpx;
				}

				.itemIcon {
					width: 39rpx;
					height: 39rpx;
					margin: 0 18rpx;
					border-radius: 50%;
					z-index: 99;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}

				.item_title {
					font-size: 30rpx;
					font-weight: 800;
					color: #333333;
					line-height: 35rpx;
				}

				.text {
					width: 431rpx;
					min-height: 75rpx;
					font-size: 23rpx;
					color: #5F6168;
					line-height: 32rpx;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
				}
			}
		}
	}
</style>
