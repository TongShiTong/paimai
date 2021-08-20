<template>
	<view>
		<view class="content">
			<view class="item" v-for="(item,index) in list" :key='index' @click="setLangauge(item,index)">
				<view class="left">
					<view class="lang">{{item.localName}}</view>
					<view>{{item.name}}</view>
				</view>
				<view class="right">
					<view :class="current==index?'active text':'text'"><u-icon name="checkmark" color="#fff" size="25"></u-icon></view>
				</view>
			</view>
		</view>
		
		<view class="posBottom">
			<view :style="{width: '100%',height:windowBottom+175+'rpx'}"></view>
			<view class="posBac" :style="{height:windowBottom+165+'rpx'}"></view>
			<view class="btn" :style="{bottom:windowBottom+60+'rpx'}" @click="submitFn()">{{$t('confirmText')}}</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		computed: {
			...mapState(['localeLang','windowBottom','langList','phoneCountryId']),
			userInfo(){
				let info = uni.getStorageSync('userInfo')
				return {countryId: this.phoneCountryId,languageId: this.list[this.current].id}
			}
		},
		data() {
			return {
				list:this.langList,
				current:0,
				// userInfo:{},
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.$t('address.languageTitle')
			});
		},
		onLoad() {
			this.getLang()
		},
		methods: {
			...mapActions(['setLocaleLang','setLang']),
			setLangauge(item,index){
				this.current = index
				// this.$i18n.locale = item.value;
				// this.setLocaleLang(item.value)
				// console.log(this.localeLang)
			},
			async getLang(){
				if(this.langList!=''){
					this.list = this.langList
					this.list.forEach((item, index) => {
						if(item.headCode === this.localeLang) {
							this.current = index
						}
					})
					return
				}
				await this.$api('languages', {}).then(res => {
				  // console.log('languages', res);
				  if(res.code==0){
					  this.list = res.data
					  this.setLang(this.list)
					  this.list.forEach((item, index) => {
					  	if(item.headCode === this.localeLang) {
					  		this.current = index
					  	}
					  })
				  }
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				  console.log(e);
				});
			},
			async submitFn(){
				let lang = this.list[this.current].headCode;
				let that =this
				this.$i18n.locale = lang;
				this.setLocaleLang(lang)
				uni.setStorageSync('language',lang)
				console.log(this.userInfo)
				await this.$api('user.editUser',this.userInfo).then(res => {
				  // console.log('languages', res);
				  if(res.code==0){
					  // this.getUserinfo()
					  that.$store.dispatch('getUserInfo').then(res=>{
					    that.$refs.uToast.show({
					    	title: that.$t('message.modify'),
							duration:1000,
					    	type: 'success',
							callback:()=>{
								uni.navigateBack({delta:1})
							}
					    })
					  }).catch(err=>{
					    this.$u.toast(e.data.message);
					  })
				  }
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				  console.log(e);
				});
				
			},
		}
	}
</script>

<style scoped lang="scss">
.content{
	background: #fff;
	.item{
		padding: 0 28rpx;
		height: 140rpx;
		display: flex;
		align-items: center;
		border-bottom:2rpx solid #D9D9D9;
		justify-content: space-between;
		// &:last-child{
		// 	border: none;
		// }
		.text{
			width: 39rpx;
			height: 39rpx;
			text-align: center;
			line-height: 39rpx;
			background: #D8D8D8;
			border-radius: 50%;
		}
		.left{
			font-size: 23rpx;
			color: #5F6168;
			line-height: 32rpx;
			.lang{
				font-size: 30rpx;
				font-weight: 400;
				color: #111111;
				line-height: 39rpx;
				letter-spacing: 2rpx;
			}
		}
		.active{
			background: #0092FF;
		}
	}
}
</style>
