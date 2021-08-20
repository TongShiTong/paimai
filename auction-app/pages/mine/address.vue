<template>
	<view>
		<block>
			<view v-if="addressList.length>0">
				<block v-for="(item,index) in addressList" :key='index'>
					<view class="item" @click="editAddressFn(item,index)" @longtap="deleteAddress(item.id)">
						<view v-if="!userAddressId" class="icon" :class="item.first==true?'active':''"><u-icon name="checkmark" color="#fff" size="25"></u-icon></view>
						<view v-else class="icon" :class="item.id==userAddressId?'active':''"><u-icon name="checkmark" color="#fff" size="25"></u-icon></view>
						<view class="item_con">
							<view class="add">{{item.address}}</view>
							<view class="info">{{item.country+' '+ item.province+item.city+' '+ item.phone}}</view>
						</view>
						<view class="right" @click.stop="goInfo(item)">
							<u-icon name="arrow-right" color="#D8D8D8" size="28"></u-icon>
						</view>
					</view>
				</block>
			</view>
			<block v-else>
				<u-empty mode="address"></u-empty>
			</block>
			<view class="posBottom">
				<view :style="{width: '100%',height:windowBottom+175+'rpx'}"></view>
				<view class="posBac" :style="{height:windowBottom+165+'rpx'}"></view>
				<view class="btn" :style="{bottom:windowBottom+60+'rpx'}" @click="addAddress()">{{$t('address.newAddress')}}</view>
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
				orderNo:null,
				userAddressId:null,
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.$t('mine.address')
			});
			
		},
		onLoad(options) {
			if(options.orderNo){
				this.orderNo = options.orderNo
				this.userAddressId = options.userAddressId
			}
			this.getAddress();
		},
		computed: {
			...mapState(['windowBottom'])
		},
		methods:{
			editAddressFn(item,index){
				if(!this.orderNo)return
				uni.$emit('setAdd',item)
				uni.navigateBack({delta:1})
				// this.addressList.forEach((item,idx)=>{
				// 	if(index==idx){
				// 		item.first = true
				// 		if(this.orderNo){
				// 			uni.redirectTo({
				// 				url:`/pages/mine/orderPay?orderNo=${this.orderNo}&AddressId=${item.id}`
				// 			})
				// 		}
						
				// 	}else{
				// 		item.first = false
				// 	}
				// })
			},
			// 获取地址列表
			async getAddress(){
				await this.$api('address.addressList', {}).then(res => {
					this.addressList = res.data;
				}).catch((e)=>{
				    this.$u.toast(e.data.message);
				});
			},
			goInfo(item){
				uni.setStorageSync('addressItemInfo',item);
				this.addAddress(item.id);
			},
			addAddress(id=''){
				const url = id==''?'/pages/mine/addAddress':'/pages/mine/addAddress?id='+id
				uni.navigateTo({
					url
				})
			},
			deleteAddress(id) {
				let that = this;
				uni.showModal({
				    title: '提示',
				    content: '确认删除此条地址信息吗？',
				    success: function (res) {
				        if (res.confirm) {
				            that.$api('address.deleteAddress', {}, id).then(res => {
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
	display: flex;
	padding: 0 42rpx 0 44rpx;
	align-items: center;
	height: 151rpx;
	background: #fff;
	border-bottom: 1rpx solid #f1f1f1;
	.icon{
		width: 35rpx;
		height: 35rpx;
		background: #D8D8D8;
		line-height: 35rpx;
		text-align: center;
		border-radius: 50%;
		margin-right: 28rpx;
		flex: 0 0 35rpx;
	}
	.item_con{
		line-height: 35rpx;
		.add{
			font-size: 30rpx;
			font-weight: 800;
			color: #333333;
			 overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.info{
			font-size: 23rpx;
			color: rgba(60, 60, 67, 0.9);
			margin-top: 12rpx;
		}
	}
	.active{
		background: #0092FF;
	}
	.right{
		margin-left: auto;
	}
}

</style>
