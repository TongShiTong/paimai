<template>
	<view>
		<block>
			<view v-if="addressList.length>0">
				<block v-for="(item,index) in addressList" :key='index'>
					<view class="item" @click="goInfo(item)" @longtap="deleteAddress(item.id)">
						<view class="item_title">{{item.cvv}}</view>
						<view class="item_con">{{item.cardType===1?$t('payment.debit'):$t('payment.credit')}}</view>
						<view class="item_no">{{item.cardNo}}</view>
					</view>
				</block>
			</view>
			<block v-else>
				<u-empty :text="$t('bankCard.noBank')" mode="data"></u-empty>
			</block>
			<view class="posBottom">
				<view :style="{width: '100%',height:windowBottom+175+'rpx'}"></view>
				<view class="posBac" :style="{height:windowBottom+165+'rpx'}"></view>
				<view class="btn" :style="{bottom:windowBottom+60+'rpx'}" @click="addAddress()">{{$t('bankCard.newBank')}}</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				addressList:[],	
			};
		},
		onShow() {
			this.getAddress();
		},
		onLoad() {
			uni.setNavigationBarTitle({
			    title: this.$t('mine.bank')
			});
		},
		computed: {
			...mapState(['windowBottom'])
		},
		methods:{
			// editAddressFn(item,index){
			// 	this.addressList.forEach((item,idx)=>{
			// 		if(index==idx){
			// 			item.first = true
			// 		}else{
			// 			item.first = false
			// 		}
			// 	})
			// },
			// 获取银行卡列表
			async getAddress(){
				await this.$api('cards.cardList', {}).then(res => {
					this.addressList = res.data;
				}).catch((e)=>{
				    this.$u.toast(e.message);
				});
			},
			goInfo(item){
				uni.setStorageSync('cradsItemInfo',item);
				this.addAddress(item.id);
			},
			addAddress(id=''){
				const url = id==''?'/pages/mine/addCard':'/pages/mine/addCard?id='+id
				uni.navigateTo({
					url
				})
			},
			deleteAddress(id) {
				let that = this;
				uni.showModal({
				    title: this.$t('bankCard.tips'),
				    content: this.$t('bankCard.delBank'),
					confirmText:this.$t('confirmText'),
					cancelText:this.$t('cancelText'),
					// cancelText:'取消',
				    success: function (res) {
				        if (res.confirm) {
				            that.$api('cards.deleteCard', {}, id).then(res => {
				            	that.$u.toast(res.message);
				            	that.getAddress();
				            }).catch((e)=>{
				                that.$u.toast(e.message);
				            });
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.item{
	height: 247rpx;
	margin: 20rpx 28rpx;
	background: #1D1E1F;
	border-radius: 32rpx;
	.item_title {
		padding: 46rpx 0 0 35rpx;
		font-size: 30rpx;
		color: #FFFFFF;
		font-weight: bold;
	}
	.item_con{
		margin: 0 0 0 35rpx;
		font-size: 25rpx;
		color: #FFFFFF;
	}
	.item_no {
		text-align: center;
		font-size: 42rpx;
		color: #FFFFFF;
		font-weight: bold;
		margin-top: 35rpx;
	}
}

</style>
