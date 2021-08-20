<template>
	<view>
		<view class="content">
			<u-form :model="cardInfo" ref="uForm">
				<view class="title">{{$t('bankCard.card')}}</view>
				<view class="info">
					<u-form-item :label="$t('bankCard.cardType')" required label-width="180" prop="cardType"><u-input v-model="cardType" type="select" @click='show = true' :placeholder="$t('bankCard.choose')"/></u-form-item>
					<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm" :confirm-text='$t("confirmText")' :cancel-text='$t("cancelText")'></u-select>
					<u-form-item :label="$t('bankCard.cardNo')" prop="cardNo" required label-width="180">
						<u-input v-model="cardInfo.cardNo" :placeholder="$t('bankCard.enter')" />
					</u-form-item>
					<!-- <u-form-item :label="$t('bankCard.cardTime')" prop="validity" required label-width="180">
						<u-input type="select" :placeholder="$t('bankCard.choose')" v-model="cardInfo.validity" @click='showTime = true'/>
					</u-form-item>
					<u-picker mode="time" v-model="showTime" :show-time-tag="false" @confirm="confirmT" :confirm-text='$t("confirmText")' :cancel-text='$t("cancelText")'></u-picker> -->
					<!-- <u-form-item label="CVV" prop="cvv" required label-width="180">
						<u-input v-model="cardInfo.cvv" :placeholder="$t('bankCard.enter')" />
					</u-form-item> -->
				</view>
				<view class="title">{{$t('bankCard.cardName')}}</view>
				<view class="info">
					<u-form-item :label="$t('bankCard.name')" required label-width="180" prop="lastName"><u-input v-model="cardInfo.lastName" :placeholder="$t('bankCard.enter')" /></u-form-item>
					<u-form-item :label="$t('bankCard.nickname')" prop="firstName" required label-width="180">
						<u-input v-model="cardInfo.firstName" :placeholder="$t('bankCard.enter')" />
					</u-form-item>
					<u-form-item :label="$t('bankCard.phone')" prop="phone" required label-width="180">
						<u-input v-model="cardInfo.phone" :placeholder="$t('bankCard.enter')" />
					</u-form-item>
					<u-form-item :label="$t('bankCard.email')" prop="mail" required label-width="180">
						<u-input v-model="cardInfo.mail" :placeholder="$t('bankCard.enter')" />
					</u-form-item>
				</view>
				<view class="title">{{$t('bankCard.address')}}</view>
				<view class="info">
					<u-form-item :label="$t('bankCard.county')" label-width="180"><u-input v-model="billCountry" :placeholder="$t('bankCard.choose')" type="select" @click='showCountry = true' /></u-form-item>
					<view class="content">
						<u-select v-model="showCountry" mode="single-column" :default-value="dfLangId" :list="county" @confirm="confiomC" :confirm-text='$t("confirmText")' :cancel-text='$t("cancelText")' value-name='id' :label-name='localeLang=="zh"?"cname":"name"'></u-select>
						<!-- <view class="con" @click="showCountry=true">
							{{localeLang=='zh'?county[dfLangId[0]].cname:county[dfLangId[0]].name}}
						</view> -->
					</view>
					<u-form-item :label="$t('bankCard.province')" label-width="180">
						<u-input v-model="cardInfo.billProvince" :placeholder="$t('bankCard.enter')" />
					</u-form-item>
					<u-form-item :label="$t('bankCard.city')" label-width="180">
						<u-input v-model="cardInfo.billCity" :placeholder="$t('bankCard.enter')" />
					</u-form-item>
					<u-form-item :label="$t('bankCard.detaile')" label-width="180">
						<u-input v-model="cardInfo.billAddress" :placeholder="$t('bankCard.enter')" />
					</u-form-item>
					<u-form-item :label="$t('bankCard.postCode')" label-width="180">
						<u-input v-model="cardInfo.billPostCode" :placeholder="$t('bankCard.enter')" />
					</u-form-item>
				</view>
				<view class="title">
					<u-checkbox
						@change="checkboxChange" 
						v-model="item.checked" 
						label-size="21"
						v-for="(item, index) in checkbox" :key="index" 
						:name="item.name"
					>{{item.name}}</u-checkbox>
					<text>《{{$t('bankCard.protocol')}}》</text>
				</view>
				
		
			</u-form>			
		</view>
		<view class="posBottom">
			<view :style="{width: '100%',height:windowBottom+175+'rpx'}"></view>
			<view class="posBac" :style="{height:windowBottom+165+'rpx'}"></view>
			<view v-if='checkbox[0].checked' class="btn" :style="{bottom:windowBottom+60+'rpx'}" @click="keepAddress()">{{$t('bankCard.submit')}}</view>
			<view v-else class="btn btn1" :style="{bottom:windowBottom+60+'rpx'}">{{$t('bankCard.submit')}}</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: {
			...mapState(['localeLang','windowBottom','phoneCountryId']),
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
				checkbox: [{
					name: this.$t('bankCard.agree'),
					checked: false
				}],
				itemId: null,
				rules: {
					// cardType: [{ required: true, message: this.$t('bankCard.choose'), trigger: ['blur']}],
					cardNo: [{ required: true, message: this.$t('bankCard.enter'), trigger: ['blur']}],
					// validity: [{ required: true, message: this.$t('bankCard.choose'), trigger: ['blur']}],
					// cvv: [{ required: true, message: this.$t('bankCard.enter'), trigger: ['blur']}],
					lastName: [{ required: true, message: this.$t('bankCard.enter'), trigger: ['blur']}],
					firstName: [{ required: true, message: this.$t('bankCard.enter'), trigger: ['blur']}],
					phone: [{ required: true, message: this.$t('bankCard.enter'), trigger: ['blur']}],
					mail: [{ required: true, message: this.$t('bankCard.enter'), trigger: ['blur']}],
					// billCountry: [{ required: true, message: this.$t('bankCard.choose'), trigger: ['blur']}],
					// billProvince: [{ required: true, message: this.$t('bankCard.enter'), trigger: ['blur']}],
					// billCity: [{ required: true, message: this.$t('bankCard.enter'), trigger: ['blur']}],
					// billAddress: [{ required: true, message: this.$t('bankCard.enter'), trigger: ['blur']}]
				},
				billCountry: '', // 国家id
				cardType: '', // 类型值
				cardInfo:{
					cardType:'',
					cardNo:'',
					// validity:'',
					// cvv:'',
					lastName:'',
					firstName: '',
					phone:'',
					mail:'',
					billCountry:'',
					billProvince:'',
					billCity:'',
					billAddress:'',
					billPostCode:''
				},
				lock: false,
				show:false, // 选择卡类型
				showCountry: false,// 选择国家
				showTime: false,// 选择时间
				county:[],
				list: [
					{
						value: '1',
						label: this.$t('payment.debit')
					},
					{
						value: '2',
						label: this.$t('payment.credit')
					}
				],
			};
		},
		onShow() {
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		onLoad(options) {
			console.log(options)
			if(options.id) {
				uni.setNavigationBarTitle({
				    title: this.$t('bankCard.editBank')
				});
				this.getCounty().then( res=> {
					this.county.forEach((item,index)=>{
					  if(this.cardInfo.billCountry==item.id){
						  this.billCountry = this.localeLang=="zh"?item.cname:item.name;
					  }
					})
				})
				this.itemId = options.id;
				this.cardInfo = uni.getStorageSync('cradsItemInfo');
				this.cardType = this.cardInfo.cardType===1?this.$t('payment.debit'):this.$t('payment.credit');
			}else {
				this.getCounty()
				uni.setNavigationBarTitle({
				    title: this.$t('bankCard.newBank')
				});
			}
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
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e);
			},
			async keepAddress(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if(this.lock) {
							return
						}
						// if(this.$store.state.phoneCountryId==3644){
						// 	let regexpphone = /^1(2|3|4|5|6|7|8|9)\d{9}$/;
						// 	if(!regexpphone.test(this.cardInfo.phone))return this.$u.toast(this.$t('login.phone'))
						// }
						this.lock = true;
						if (this.itemId) {
							this.$api('cards.revise', this.cardInfo, this.itemId).then(res => {
								this.$u.toast(res.message);
								// let pages = getCurrentPages();
								// let prevPage = pages[pages.length - 2]; //上一个页面 
								// prevPage.$vm.getAddress();//重点$vm
								uni.navigateBack({delta: 1});
								this.lock = false;
							}).catch((e)=>{
								this.lock = false;
							    this.$u.toast(e.message);
							});
						}else {
							this.$api('cards.addcards', this.cardInfo).then(res => {
								this.$u.toast(res.message);
								// let pages = getCurrentPages();
								// let prevPage = pages[pages.length - 2]; //上一个页面 
								// prevPage.$vm.getAddress();//重点$vm
								uni.navigateBack({delta: 1});
								this.lock = false;
							}).catch((e)=>{
								this.lock = false;
							    this.$u.toast(e.message);
							});
						}
					} else {
						console.log('验证失败');
					}
				});
			},
			confiomC(e) {
				this.billCountry = e[0].label;
				this.cardInfo.billCountry = e[0].value;
			},
			confirmT(e) {
				console.log(e)
				this.cardInfo.validity = e.year+'/'+e.month+'/'+e.day
			},
			confirm(e){
				this.cardType = e[0].label;
				this.cardInfo.cardType = e[0].value;
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	.title {
		display: flex;
		align-items: center;
		margin: 25rpx 0 12rpx 50rpx;
		font-size: 23rpx;
		color: rgba(60, 60, 67, 0.6);
		text {
			color: #606266;
		}
	}
	.info {
		margin: 0 23rpx 20rpx;
		padding: 0 30rpx;
		border-radius: 21rpx;
		font-size: 25rpx;
		color: #000000;
		background-color: #FFFFFF;
		.u-form-item {
			padding: 4rpx 0;
		}
	}
	
}
.posBottom {
	.btn1 {
		background: #D9D9D9;
	}
}
</style>
