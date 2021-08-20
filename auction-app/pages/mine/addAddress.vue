<template>
	<view>
		<view class="content">
			<view class="con-item">
				<view class="label">{{$t('address.consignee')}}</view>
				<u-input type="text" v-model="addInfo.contactName" height="84" :border="false" :placeholder="$t('address.writeName')"/>
			</view>
			<view class="con-item">
				<view class="label">{{$t('address.phone')}}</view>
				<u-input type="text" v-model="addInfo.phone" height="84" :border="false" :placeholder="$t('address.writePhone')"/>
			</view>
			<view class="con-item">
				<view class="label">{{$t('bankCard.county')}}</view>
				<u-input type="select" v-model="countyName" height="84" :border="false" :placeholder="$t('bankCard.choose')" @click='showCountry = true' />
				<view class="content">
					<u-select v-model="showCountry" mode="single-column" :default-value="dfLangId" :list="county" @confirm="confiom" :confirm-text='$t("confirmText")' :cancel-text='$t("cancelText")' value-name='id' :label-name='localeLang=="zh"?"cname":"name"'></u-select>
				</view>
			</view>
			<view class="con-item">
				<view class="label">{{$t('bankCard.province')}}</view>
				<u-input type="text" v-model="addInfo.province" height="84" :border="false" :placeholder="$t('bankCard.enter')"/>
				<!-- <u-input type="text" v-model="addInfo.province" height="84" :border="false" :placeholder="$t('address.writeRec')"/> -->
				
			</view>
			<view class="con-item">
				<view class="label">{{$t('bankCard.city')}}</view>
				<u-input type="text" v-model="addInfo.city" height="84" :border="false" :placeholder="$t('bankCard.enter')"/>
			</view>
			<view class="con-item">
				<view class="label">{{$t('address.detailed')}}</view>
				<u-input type="textarea" v-model="addInfo.address" height="84" :border="false" :fixed='true' :placeholder="$t('address.writeDeta') " :placeholder-style="'color:rgb(192, 196, 204);overflow:visible'"/>
			</view>
			<view class="con-item">
				<view class="label">{{$t('bankCard.postCode')}}</view>
				<u-input type="text" v-model="addInfo.postCode" height="84" :border="false" :placeholder="$t('bankCard.enter')"/>
			</view>
			<view class="con-item">
				<view class="detail">
					<view class="def">{{$t('address.setDefault')}}</view>
					<view>{{$t('address.default')}}</view>
				</view>
				<view class="check">
					<u-switch v-model="addInfo.first" ></u-switch>
				</view>
			</view>		
		</view>
		<view class="posBottom">
			<view :style="{width: '100%',height:windowBottom+175+'rpx'}"></view>
			<view class="posBac" :style="{height:windowBottom+165+'rpx'}"></view>
			<view class="btn" :style="{bottom:windowBottom+60+'rpx'}" @click="keepAddress()">{{$t('address.save')}}</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: {
			...mapState(['windowBottom','phoneCountryId','localeLang']),
			dfLangId:{
				get:function(){
					this.county.forEach((item,index)=>{
					  if(this.phoneCountryId==item.id){
						  this.index = index
					  }
					})
					return [this.index]
				},
				set:function(value){
					console.log(value)
					// this.value = value
				}
			}
		},
		data() {
			return {
				itemId: null,
				addInfo:{
					contactName:'',
					phone:'',
					city:'',
					province:'',
					address:'',
					first:false,
					countryId: '',
					postCode:''
				},
				lock: false,
				show:false,
				county: [],
				showCountry:false,
				index:0,
				countyName:'',
			};
		},
		onShow() {
			
		},
		onLoad(options) {
			
			if(options.id) {
				uni.setNavigationBarTitle({
				    title: this.$t('address.reviseAddress')
				});
				this.itemId = options.id;
				this.addInfo = uni.getStorageSync('addressItemInfo');
			}else {
				uni.setNavigationBarTitle({
				    title: this.$t('address.newaddressName')
				});
				this.addInfo.countryId=this.phoneCountryId
			}
			// console.log(this.addInfo)
			this.getCounty().then( res=> {
				this.county.forEach((item,index)=>{
				  if(this.addInfo.countryId==item.id){
					  this.countyName = this.localeLang=="zh"?item.cname:item.name;
				  }
				})
			})
		},
		methods:{
			// 获取国家列表
			async getCounty(){
				await this.$api('countries', {}).then(res => {
				  // console.log('countries', res);
				  if(res.code==0){
					  this.county = res.data
				  }
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				  // console.log(e);
				});
			},
			async keepAddress(){
				if(this.lock) {
					return
				}
				this.lock = true;
				// let regexpphone = /^1(2|3|4|5|6|7|8|9)\d{9}$/;
				if (!this.addInfo.contactName) {
					this.lock = false;
				  this.$u.toast(this.$t('message.writeName'));
				  return
				} 
				if (!this.addInfo.phone) {
					this.lock = false;
				  this.$u.toast(this.$t('message.writePhone'));
				  return
				}
				// if(this.$store.state.phoneCountryId==3644){
				// 	let regexpphone = /^1(2|3|4|5|6|7|8|9)\d{9}$/;
				// 	if(!regexpphone.test(this.addInfo.phone)){
				// 		this.$u.toast(this.$t('login.phone'))
				// 		this.lock = false;
				// 		return 
				// 	}
				// }
				if (!this.addInfo.province || !this.addInfo.city || !this.addInfo.address) {
					this.lock = false;
				  this.$u.toast(this.$t('message.writeAddress'));
				  return
				} 
				// this.addInfo.city = this.addInfo.province;
				console.log(this.addInfo)
				if (this.itemId) {
					await this.$api('address.revise', this.addInfo, this.itemId).then(res => {
						this.$u.toast(res.message);
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2]; //上一个页面 
						prevPage.$vm.getAddress();//重点$vm
						uni.navigateBack({delta: 1});
					}).catch((e)=>{
					    this.$u.toast(e.message);
					});
				}else {
					await this.$api('address.address', this.addInfo).then(res => {
						this.$u.toast(res.message);
						let pages = getCurrentPages();
						let prevPage = pages[pages.length - 2]; //上一个页面 
						prevPage.$vm.getAddress();//重点$vm
						uni.navigateBack({delta: 1});
					}).catch((e)=>{
					    this.$u.toast(e.message);
					});
				}
				this.lock = false;
			},
			confiom(e){
				this.countyName = e[0].label;
				this.addInfo.countryId = e[0].value;
				// this.addInfo.address = e[0].label+','+e[1].label+','+e[2].label
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	padding: 0 28rpx;
	background: #fff;
	.con-item{
		display: flex;
		align-items: center;
		height: 140rpx;
		padding: 33rpx 0;
		.label{
			// line-height: 84rpx;
			width: 170rpx;
			font-size: 26rpx;
			font-weight: 500;
			color: #1D1E1F;
			font-family: PingFangSC-Medium, PingFang SC;
		}
		/deep/.u-input__textarea{
			padding: 0;
		}
		/deep/.uni-textarea-wrapper{
			min-height: 84rpx !important;
			
		}
		/deep/.uni-textarea-placeholder{
			display: -webkit-box;
			 -webkit-box-orient: vertical;
			 -webkit-line-clamp: 2;
			 overflow: hidden !important;
		}
		.check{
			margin-left: auto;
		}
		.detail{
			font-size: 23rpx;
			color: #5F6168;
			line-height: 32rpx;
			.def{
				font-size: 30rpx;
				font-weight: 400;
				color: #111111;
				line-height: 39rpx;
				letter-spacing: 2rpx;
			}
		}
	}
}
.con{
	font-size: 28rpx;
	font-weight: bold;
	color: #2D2720;
	display: flex;
	.xsj {
		width: 39rpx;
		height: 39rpx;
	}
}
</style>
