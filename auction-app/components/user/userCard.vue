<template>
	<view class="userCard">
		<view class="title">
			<view class="titleLeft">{{title}}</view>
			<view class="iconRight" v-if="moreShow" @click="goOrder()">
				{{$t("mine.allOrder")}}<u-icon name="arrow-right" color="#939599" size="21"></u-icon>
			</view>
		</view>
		<view class="card">
			<block v-for="(item,index) in list" :key='index'>
				<view class="cardItem" @click="goPath(item)">
					<view class="number" v-if="moreShow&&item.status==1&&status1">{{status1}}</view>
					<view class="number" v-if="moreShow&&item.status==2&&status2">{{status2}}</view>
					<view class="number" v-if="moreShow&&item.status==3&&status3">{{status3}}</view>
					<view class="number" v-if="moreShow&&item.status==9&&status9">{{status9}}</view>
					<!-- {{item.status==1?status1:item.status==2?status2:item.status==3?status3:item.status==9?status9:''}} -->
					<image class="img" :src="item.imageUrl" mode=""></image>
					<view class="itemName">{{item.name}}</view>
				</view>
			</block>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:'userCard',
		data(){
			return{
				
			}
		},
		computed:{
			status1(){
				let arr = this.unRead.filter(item=>{return item.status==1})
				// console.log(arr[0])
				return arr.length!=0?arr[0].unReadCount:''
			},
			status2(){
				let arr = this.unRead.filter(item=>{return item.status==2})
				// console.log(arr[0])
				return arr.length!=0?arr[0].unReadCount:''
			},
			status3(){
				let arr = this.unRead.filter(item=>{return item.status==3})
				// console.log(arr[0])
				return arr.length!=0?arr[0].unReadCount:''
			},
			status9(){
				let arr = this.unRead.filter(item=>{return item.status==9})
				// console.log(arr[0])
				return arr.length!=0?arr[0].unReadCount:''
			}
		},
		props:{
			list:{
				type:Array,
				default:()=>{return []}
			},
			title:{
				type:String,
				default:''
			},
			moreShow:{//订单TRUE  其他服务false
				type:Boolean,
				default:false
			},
			unRead:{//订单未读数
				type:Array,
				default:()=>{return []}
			}
		},
		created(){
			// console.log(this.unRead,this.list)
			// console.log(this.list,11222)
		},
		
		methods:{
			goOrder(){
				uni.navigateTo({
					url:'/pages/mine/orderList'
				})
			},
			goPath(item){
				if(item.type=='tel'){
					// 客服电话
					uni.makePhoneCall({
					    phoneNumber: '114' //仅为示例
					});
				}else{
					if(item.status){
						uni.navigateTo({
							url:item.url + '?status='+item.status
						})
					}else{
						uni.navigateTo({
							url:item.url
						})
					}
				}
				
				
				
			},
		}
	}
</script>

<style scoped lang="scss">
	.userCard{
		margin: 25rpx 0;
		background: #FFFFFF;
		box-shadow: 0rpx 0rpx 25rpx 0rpx rgba(38,38,41,0.06);
		border-radius: 21rpx;
		width: 100%;
		.title{
			height: 86rpx;
			padding: 0 19rpx 0 28rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 2rpx solid rgba(0, 0, 0, 0.05);
			.titleLeft{
				font-size: 30rpx;
				font-weight: bold;
				color: #2A2B2E;
			}
			.iconRight{
				font-size: 21rpx;
				color: #939599;
			}
		}
		.card{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
			.cardItem{
				width: 24%;
				text-align: center;
				margin: 39rpx 0 42rpx;
				position: relative;
				.img{
					width: 53rpx;
					height: 53rpx;
				}
				.itemName{
					font-size: 21rpx;
					font-weight: bold;
					color: rgba(60, 60, 67, 0.8);
					line-height: 40rpx;
				}
				.number{
					position: absolute;
					background-color: #fa3534;
					width: 30rpx;
					height: 30rpx;
					border-radius: 50%;
					color: #fff;
					font-size: 20rpx;
					text-align: center;
					line-height: 30rpx;
					left: 60%;
					top: -20rpx;
				}
			}
		}
	}
</style>
