<template>
	<view class="withdrawal">
		<view class="card">
			<view class="card_title">{{$t('margin.withAmount')}}</view>
			<view class="price">
				<text>$</text>
				<u-input v-model="price"
					 @input="changeFn"
					 @blur='onBlur'
					placeholder="0.00" 
					:custom-style="{'font-size':'88rpx','height':'88rpx'}" 
					:placeholderStyle="'color:#1D1E1F;font-size: 88rpx;height: 88rpx;line-height: 88rpx;'" 
					type="number" :border="false" />
			</view>
			<view class="tip">{{$t('margin.cashAmount')}}：${{(parseFloat(bond)/100).toFixed(2)}} <text @click="allWithdrawal">{{$t('margin.withAll')}}</text></view>
		</view>
		<view class="card">
			<view class="card_title">{{$t('margin.withTo')}}</view>
			<view class="mode">
				<view class="mode_item" v-for="(item,index) in bankList" :key='index' @click="setMode(item,index)">
					<!-- <view class="img"><image :src="item.logo" mode=""></image></view> -->
					<view class="text">{{item.cardNo}}</view>
					<view class="icon" :class="current==item.id?'active':''"><u-icon name="checkmark" color="#fff" size="25"></u-icon></view>
				</view>
			</view>
			<view class="blue" v-if="bankList.length == 0">{{$t('margin.noRecharge')}}，<text @click="goBank">{{$t('margin.addNow')}}</text></view>
		</view>
		<view class="btn" @click="sumbitFn()" :class="parseFloat(price)>(parseFloat(bond)/100)?'gray':''">{{$t('margin.conWithdrawal')}}</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:'',
				list:[],
				bankList:[],
				//      description
				// 渠道描述
				// string
				//        id
				// 渠道编号
				// integer(int64)
				//        logo
				// 渠道logo
				// string
				//        name
				// 渠道名
				// string
				//        seq
				// 顺序
				// integer(int32)
				//        slogan
				// 支付渠道的品牌宣传语
				// string
				//        tags
				// 标签,多个标签可以逗号分隔
				// string
				
				current:null,
				bankinfo:null,
				bond:0,
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.$t('margin.withdraw')
			});
		},
		onLoad() {
			this.getDeposit()
			this.list = []
			this.getBank()
			// this.getChannel()
		},
		methods:{
			//保证金
			async getDeposit(){
				await this.$api('user.deposit', {}).then(res=>{
					// console.log(res)
					if(res.code==0){
						this.bond = res.data
					}
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				});
			},
			//银行卡列表
			async getBank(){
				await this.$api('cards.cardList', {}).then(res => {
					this.bankList = res.data;
					if(res.data.length!=0){
						this.current = res.data[0].id
						this.bankinfo = res.data[0]
					}
				}).catch((e)=>{
				    this.$u.toast(e.message);
				});
			},
			// //获取可用支付渠道
			// async getChannel(){
			// 	await this.$api('pay.channel', {}).then(res=>{
			// 		console.log(res)
			// 		if(res.code==0){
			// 			this.list = res.data
			// 		}
			// 	}).catch((e)=>{
			// 	  // resolve(false);
			// 	  // uni.hideLoading();
			// 	  this.$u.toast(e.data.message);
			// 	});
			// },
			//添加支付方式
			goBank(){
				uni.navigateTo({
					url:'/pages/mine/addCard'
				})
			},
			//限制两位小数
			changeFn(value){
				let val = (value && value.split("")) || [];
				val = val.join("").match(/^\d*(\.?\d{0,2})/g)[0] || null;
				this.$nextTick(() => {
					this.price= val
				})
			},
			//判断金额是否超出限制
			onBlur(e){
				if(e)this.price = parseFloat(e).toFixed(2)
				if(parseFloat(e)>=this.bond)return this.$u.toast(this.$t('message.maxPay'))
			},
			// 切换提现方式
			setMode(item,index){
				this.current = item.id
				this.bankinfo = item
			},
			//全部提现
			allWithdrawal(){
				this.price = this.bond/100
				this.price = parseFloat(this.price).toFixed(2)
			},
			sumbitFn(){
				if(!this.price)return this.$u.toast(this.$t('payment.withdrawPrice'))
				if(!this.current)return this.$u.toast(this.$t('payment.addBank'))
				uni.showModal({
					title: '提示',
					content: `确认提现到银行卡${this.bankinfo.cardNo}么？`,
					success: (res)=>{
						if (res.confirm) {
							let p = {
								"amount": parseFloat(this.price)*100,
								"bankCardId": this.current
							}
							// console.log(p)
							this.$api('pay.withdraw', p).then(res => {
								// console.log(res)
								if(res.code==0){
									this.$refs.uToast.show({
										title: this.$t('payment.withdraw'),
										duration:1000,
										type: 'success',
										callback:()=>{
											uni.navigateBack({
											    delta: 2
											});
										}
									})
								}else{
									this.$u.toast(res.message);	
								}
							}).catch((e)=>{
							    this.$u.toast(e.message);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
				// console.log(this.price,this.current)
			}
		}
	}
</script>

<style lang="scss" scoped>
.withdrawal{
	overflow: hidden;
}
.card{
	margin: 21rpx 28rpx;
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
		// font-size: 88rpx;
		height: 88rpx;
		font-weight: 400;
		color: $btnActive;
		// line-height: 88rpx;
		margin: 52rpx 0 70rpx;
		align-items: flex-end;
		display: flex;
		text{
			font-size: 53rpx;
			font-weight: 500;
			margin-right: 10rpx;
		}
	}
	.tip{
		font-size: 21rpx;
		color: rgba(60, 60, 67, 0.6);
		line-height: 30rpx;
		text{
			display: inline-block;
			margin-left: 25rpx;
			color: #0092FF;
		}
	}
	.blue{
		color: rgba(60, 60, 67, 0.6);
		text-align: center;
		font-size: 21rpx;
		line-height: 40rpx;
		text{
			color: #0092ff
		}
	}
}
.mode{
	.mode_item{
		display: flex;
		align-items: center;
		padding: 14rpx 0;
		.img{
			width: 53rpx;
			height: 53rpx;
			margin-right: 14rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.icon{
			width: 39rpx;
			height: 39rpx;
			text-align: center;
			line-height: 39rpx;
			background: #D8D8D8;
			border-radius: 50%;
			margin-left: auto;
		}
		.active{
			background:#0092FF;
		}
	}
}
.btn{
	margin: 35rpx 28rpx;
	text-align: center;
	height: 105rpx;
	line-height: 105rpx;
	background: $btnActive;
	border-radius: 21rpx;
	font-size: 35rpx;
	font-weight: 600;
	color: #FFFFFF;
}
.gray{
	background: #d9d9d9;
	color: #3C3C43;
}
</style>
