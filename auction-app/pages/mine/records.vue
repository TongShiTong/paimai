<template>
	<view>
		<view class="content">
			<block v-for="(item,index) in list" :key='index'>
				<view class="con_item" v-if="item.changeType!==6">
					<view class="left">
						<view class="price">{{item.changeType==1?$t('margin.freeze'):item.changeType==2?$t('margin.unfreeze'):item.changeType==3?$t('margin.deduction'):item.changeType==4?$t('margin.depRecharge'):item.changeType==5?$t('margin.withdrawal'):item.changeType==6?$t('margin.entrance'):item.changeType==7?$t('margin.order'):item.changeType==8?$t('margin.balance'):$t('margin.balance')}}</view>
						<view class="timer">{{item.createdTime}}</view>
					</view>
					<view class="right">
						{{item.defray?'-':'+'}}{{(parseFloat(item.money)/100).toFixed(2)}}
					</view>
				</view>
			</block>
			<!-- <u-loadmore :status="status" :load-text="loadText" v-if="pageAll>1"/> -->
			<view class="load" v-if="pageAll>=1">{{loadText[status]}}</view>
		</view>
		<u-empty :text="$t('message.recordEmpty')" v-if="list.length == 0" margin-top='300'></u-empty>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
			//changeType // 变更类型 FREEZE(1, "保证金冻结"),
			//  UN_FREEZE(2, "保证金解冻"),
			//  DEDUCT(3, "保证金扣除"),
			//  DEPOSIT_RECHARGE(4,  "保证金充值"),
			//  DEPOSIT_WITHDRAW(5,  "保证金提现"),
			//  PAY_ENTER(6,  "门票费"),
			//  PAY_ORDER(7,  "支付订单");
			//  BALANCE_RECHARGE(8,  "余额充值"),
			//capitalAccountId 余额编号
			//capitalAccountType 类型
			//changeType 变更类型
			//createdTime 创建时间,格式为yyyy-MM-dd HH:mm:ss
			
			//defray 是否是支出
			//money 金额
			//orderId 订单编号
			//orderType 订单类型, 1: 交易订单 2: 提现订单
			//payOrderId 支付订单编号
			//userId 用户编号
				status: 'loadmore',
				page: 1,
				pageAll:1,
			};
		},
		computed:{
			loadText(){
				return {
					loadmore: this.$t('message.loadmore'),
					loading: this.$t('message.loading'),
					nomore: this.$t('message.nomore')
				}
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.$t('margin.record')
			});
		},
		onLoad() {
			this.list = []
			this.getFlow().then(()=>{
				if(this.page>=this.pageAll)return
				if(this.list.length<=10){
					this.page++
					this.getFlow()
				}
			})
		},
		methods:{
			async getFlow(){
				let p = {
					page:this.page,
					limit:20
				}
				uni.showLoading({})
				let that =this
				await this.$api('pay.flow', p).then(res=>{
					uni.hideLoading()
					console.log(res)
					if(res.code==0){
						that.pageAll = Math.ceil(res.data.total/20)
						that.list = that.list.concat(res.data.rows).filter((item)=>{return item.changeType!==6})
						if(that.page>= that.pageAll) that.status = 'nomore';
						else that.status = 'loadmore';
					}
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				});
			},
		},
		onReachBottom(){
			if(this.page >= this.pageAll) return ;
			this.status = 'loading';
			this.page++
			this.getFlow()
			// setTimeout(()=>{
			// 	this.list = this.list.concat(this.list)
			// 	if(this.page >= 3) this.status = 'nomore';
			// 	else this.status = 'loading';
			// },2000)
		}
	}
</script>

<style lang="scss" scoped>
.content{
	background: #fff;
	// padding-bottom: 20rpx;
	.con_item{
		display: flex;
		height: 140rpx;
		align-items: center;
		padding: 0 30rpx 0 35rpx;
		border-bottom: 1rpx solid #d9d9d9;
		justify-content: space-between;
		.price{
			font-size: 30rpx;
			font-weight: 600;
			color: #111111;
			line-height: 39rpx;
			letter-spacing: 2rpx;
		}
		.timer{
			font-size: 23rpx;
			color: #5F6168;
			line-height: 32rpx;
		}
	}
	
}
.load{
		line-height: 60upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
		background-color: #F3F4F5;
	}
</style>
