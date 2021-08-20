<template>
	<view class="recharge">
		<view class="card">
			<view class="card_title">{{$t('margin.rechAmount')}}</view>
			<view class="price">
				<text>$</text>
				<u-input v-model="price" @input="changeFn" @blur='onBlur' placeholder="0.00"
					:custom-style="{'font-size':'88rpx','height':'88rpx'}"
					:placeholderStyle="'color:#1D1E1F;font-size: 88rpx;height: 88rpx;line-height: 88rpx;'" type="number"
					:border="false" />
			</view>
			<view class="tip">{{$t('margin.minAmount')}}：$1</view>
		</view>
		<view class="card">
			<view class="card_title">{{$t('margin.rechMethod')}}</view>
			<view class="mode">
				<view class="mode_item" v-for="(item,index) in list" :key='index' @click="setMode(item,index)">
					<view class="img">
						<image :src="item.logo" mode=""></image>
					</view>
					<view class="text">{{item.name}}</view>
					<view class="icon" :class="current==item.id?'active':''">
						<u-icon name="checkmark" color="#fff" size="25"></u-icon>
					</view>
				</view>
			</view>
			<!-- <view class="blue" v-if="list.length == 0">{{$t('margin.noRecharge')}}，<text @click="goBank">{{$t('margin.addNow')}}</text></view> -->
		</view>
		<view class="btn" @click="sumbit" :class="!price||!current?'gray':''">{{$t('margin.conRecharge')}}</view>

		<u-popup v-model="showBankPay" mode="bottom" border-radius="28" :mask-close-able="false" :closeable="true">
			<view class="pay_box">
				<view class="title">{{$t('payment.bankCard')}}</view>
				<block v-for="(item,index) in bankList" :key="index">
					<view class="pay_info" @tap="editAddressFn(item,index)">
						<view>
							<!-- <view>
								{{item.cvv}}
							</view> -->
							<view class="item_con">{{item.cardType===1?$t('payment.debit'):$t('payment.credit')}}</view>
							<view class="pay">{{item.cardNo}}</view>
						</view>
						<view class="icon" :class="{'active':item.active}">
							<u-icon name="checkmark" color="#fff" size="25"></u-icon>
						</view>
					</view>
				</block>
				<view class="info">
					<view class="btn" @click="goBank">{{$t('payment.addBank')}}</view>
					<!-- <view class="btn" v-else @click="sumbitFn">立即支付</view> -->
				</view>
			</view>
		</u-popup>
		<u-popup v-model="CVVshow" mode="center" border-radius="28" :mask-close-able="false" :closeable="true">
			<view class=" cvvBox">
				<u-form :model="card" ref="uForm">
					<view class="title">{{$t('payment.info')}}</view>
					<view class="info">
						<u-form-item label="CVV" label-width="180" v-if="CardType==2">
							<u-input v-model="card.CVV" :placeholder="$t('bankCard.enter')" />
						</u-form-item>
						<u-form-item :label="$t('bankCard.cardTime')" label-width="180" v-if="CardType==2">
							<u-input v-model="card.Validity" :placeholder="$t('bankCard.enter')" />
						</u-form-item>
						<u-form-item :label="$t('bankCard.county')" label-width="180">
							<u-input v-model="billCountry" :placeholder="$t('bankCard.choose')" type="select"
								@click='showCountry = true' />
						</u-form-item>
						<view class="content">
							<u-select v-model="showCountry" mode="single-column" :default-value="dfLangId"
								:list="county" @confirm="confirm" :confirm-text='$t("confirmText")'
								:cancel-text='$t("cancelText")' value-name='id'
								:label-name='$store.state.localeLang=="zh"?"cname":"name"'></u-select>
						</view>
						<u-form-item :label="$t('bankCard.province')" label-width="180">
							<u-input v-model="card.BillProvince" :placeholder="$t('bankCard.enter')" />
						</u-form-item>
						<u-form-item :label="$t('bankCard.city')" label-width="180">
							<u-input v-model="card.BillCity" :placeholder="$t('bankCard.enter')" />
						</u-form-item>
						<u-form-item :label="$t('bankCard.detaile')" label-width="180">
							<u-input v-model="card.BillAddress" :placeholder="$t('bankCard.enter')" />
						</u-form-item>
						<u-form-item :label="$t('bankCard.postCode')" label-width="180">
							<u-input v-model="card.BillPostCode" :placeholder="$t('bankCard.enter')" />
						</u-form-item>
					</view>
					<view class="info cvvInfo">
						<!-- <view class="btn" @click="goBank">添加银行卡</view> -->
						<view class="btn CVVbtn" @click="sumbitFn">{{$t('order.pay')}}</view>
					</view>
				</u-form>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		computed: {
			dfLangId: {
				get: function() {
					this.county.forEach((item, index) => {
						if (this.$store.state.phoneCountryId == item.id) {
							this.index = index
						}
					})
					return [this.index]
				},
				set: function(value) {
					// console.log(value)
					// this.value = value
				}
			}
		},
		data() {
			return {
				bankList: [],
				showBankPay: false, // 选择银行卡弹框
				CVVshow: false,
				price: '',
				list: [],
				county: [],
				showCountry: false,
				billCountry: '', // 国家id
				index:null,
				
				
				channel: '',//支付渠道类型
				current: '',//支付渠道id
				cardInfo: null,//银行卡信息
				CardType: '',//银行卡类型
				bankCardId:null,//银行卡id
				//
				card: {//支付填写信息
					CVV: null,
					Validity: null,
					BillAddress: null,
					BillCity: null,
					BillCountry: null,
					BillProvince: null,
					BillPostCode: null,
				},
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: this.$t('margin.recharge')
			});
			this.getBank();
		},
		onLoad(e) {
			console.log('e',e)
			if(e.pay) {
				this.price = e.pay;
			}
			this.list = []
			this.getChannel()
			this.getCounty()
			// this.getBank();
		},
		methods: {
			// 获取国家列表
			async getCounty() {
				await this.$api('countries', {}).then(res => {
					// console.log('countries', res);
					if (res.code == 0) {
						this.county = res.data
					}
				}).catch((e) => {
					// resolve(false);
					uni.hideLoading();
					this.$u.toast(e.data.message);
					// console.log(e);
				});
			},
			//选择国家
			confirm(e) {
				this.billCountry = e[0].label;
				this.card.BillCountry = e[0].value;
			},
			// 选择银行卡
			editAddressFn(item, index) {
				this.bankList.forEach((item, idx) => {
					if (index == idx) {
						this.cardInfo = {
							"CardNo": item.cardNo,
							"CardType": item.cardType,
							"FirstName": item.firstName,
							"LastName": item.lastName,
							"Mail": item.mail,
							"Phone": item.phone,
						}
						this.bankCardId = item.id
						this.card = {
							CVV: null,
							Validity: null,
							BillAddress: item.billAddress,
							BillCity: item.billCity,
							BillCountry: item.billCountry,
							BillProvince: item.billProvince,
							BillPostCode: item.billPostCode,
						}
						this.county.forEach((it,index)=>{
						  if(item.billCountry==it.id){
							  
							  this.billCountry = this.$store.state.localeLang=="zh"?it.cname:it.name;
						  }
						})
						// console.log(this.billCountry,item.billCountry)
						this.CardType = item.cardType
						this.$set(this.bankList[idx], "active", true);
					} else {
						this.$set(this.bankList[idx], "active", false);
					}
				})
				this.showBankPay = false;
				this.CVVshow = true
				// this.$set(this.bankList[index],"active",true);
			},
			// 获取银行卡列表
			async getBank() {
				await this.$api('cards.cardList', {}).then(res => {
					this.bankList = res.data;
				}).catch((e) => {
					this.$u.toast(e.message);
				});
			},
			//获取支付渠道
			async getChannel() {
				await this.$api('pay.channel', {}).then(res => {
					// console.log(res)
					if (res.code == 0) {
						this.list = res.data
						if (this.list.length) {
							this.current = this.list[0].id
							this.channel = this.list[0].name
						}
					}
				}).catch((e) => {
					this.$u.toast(e.data.message);
				});
			},
			changeFn(value) {
				let val = (value && value.split("")) || [];
				val = val.join("").match(/^\d*(\.?\d{0,2})/g)[0] || null;
				this.$nextTick(() => {
					this.price = val
				})
			},
			onBlur(e) {
				if (e) this.price = parseFloat(e).toFixed(2)
				// if (parseFloat(e) < 100) return this.$u.toast(this.$t('message.minPay'))

			},
			//切换支付方式
			setMode(item, index) {
				this.current = item.id
				this.channel = item.name
			},
			//添加支付方式
			goBank() {
				uni.navigateTo({
					url: '/pages/mine/addCard'
				})
			},
			sumbit() {
				if (!this.price || !this.current) return
				if (this.channel !== 'ctp') return this.$u.toast(this.$t('payment.channel'))
				this.showBankPay = true
			},
			sumbitFn(){
				this.$u.debounce(this.debounce, 500)
			},
			debounce() {
				if(this.CardType!=2){
					this.$u.toast(this.$t('payment.debitNo'))
					// console.log(this.$u.deepMerge(this.card, this.cardInfo))
				}else{
					if(!this.card.Validity)return this.$u.toast(this.$t('bankCard.enter'))
					if(!this.card.CVV)return this.$u.toast(this.$t('bankCard.enter'))
					if(!this.card.BillCountry)return this.$u.toast(this.$t('bankCard.choose'))
					if(!this.card.BillProvince)return this.$u.toast(this.$t('bankCard.enter'))
					if(!this.card.BillCity)return this.$u.toast(this.$t('bankCard.enter'))
					if(!this.card.BillPostCode)return this.$u.toast(this.$t('bankCard.enter'))
					if(!this.card.BillAddress)return this.$u.toast(this.$t('bankCard.enter'))
					let p = {
						paymentInfo: this.$u.deepMerge(this.card, this.cardInfo),
						bankCardId:this.bankCardId,
						price: parseFloat(this.price) * 100
					}
					// console.log(p)
					this.$api('pay.recharge', p, `${this.channel}/recharge`).then(res => {
						// console.log(res)
						this.CVVshow = false
						this.price = ''
						if (res.code == 0) {
							this.$refs.uToast.show({
								title: this.$t('payment.rechange'),
								duration:1000,
								type: 'success',
								callback:()=>{
									uni.navigateBack({
										delta: 1,
									});
								}
							})
						} else {
							this.$u.toast(res.message);
						}
					}).catch((e) => {
						this.$u.toast(e.data.message);
						this.CVVshow = false
						this.price = ''
					});
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.recharge {
		overflow: hidden;

		.gray {
			background: #d9d9d9;
			color: #3C3C43;
		}
	}

	.card {
		margin: 21rpx 28rpx;
		padding: 0rpx 28rpx 25rpx;
		border-radius: 14rpx;
		background: #fff;

		.card_title {
			height: 91rpx;
			line-height: 91rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #2A2B2E;
		}

		.price {
			// font-size: 88rpx;
			height: 88rpx;
			font-weight: 400;
			color: $btnActive;
			// line-height: 88rpx;
			margin: 52rpx 0 70rpx;
			align-items: flex-end;
			display: flex;

			text {
				font-size: 53rpx;
				font-weight: 500;
				margin-right: 10rpx;
			}
		}

		.tip {
			font-size: 21rpx;
			color: rgba(60, 60, 67, 0.6);
			line-height: 30rpx;
		}

		.blue {
			color: rgba(60, 60, 67, 0.6);
			text-align: center;
			font-size: 21rpx;
			line-height: 40rpx;

			text {
				color: #0092ff
			}
		}
	}

	.mode {
		.mode_item {
			display: flex;
			align-items: center;
			padding: 14rpx 0;

			.img {
				width: 53rpx;
				height: 53rpx;
				margin-right: 14rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.icon {
				width: 39rpx;
				height: 39rpx;
				text-align: center;
				line-height: 39rpx;
				background: #D8D8D8;
				border-radius: 50%;
				margin-left: auto;
			}

			.active {
				background: #0092FF;
			}
		}
	}

	.btn {
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

	.pay_box {
		.title {
			text-align: center;
			font-size: 28rpx;
			font-weight: bold;
			color: #2A2B2E;
			padding: 26rpx 0;
			border-bottom: 1rpx solid #D9D9D9;
		}

		.pay_info {
			height: 152rpx;
			display: flex;
			padding: 0 42rpx;
			align-items: center;
			justify-content: space-between;
			font-size: 30rpx;
			font-weight: 800;
			color: #333333;
			border-bottom: 1rpx solid #D9D9D9;

			.pay {
				font-size: 28rpx;
				font-weight: 600;
				color: rgba(60, 60, 67, 0.9);
			}

			.icon {
				width: 35rpx;
				height: 35rpx;
				background: #D8D8D8;
				line-height: 35rpx;
				text-align: center;
				border-radius: 50%;
				flex: 0 0 35rpx;
			}

			.active {
				background: #0092FF;
			}
		}

		.info {
			height: 280rpx;
			display: flex;
			justify-content: center;

			.btn {
				width: 694rpx;
				height: 105rpx;
				text-align: center;
				line-height: 105rpx;
				background: $btnActive;
				border-radius: 21rpx;
				font-size: 35rpx;
				font-weight: 600;
				color: #FFFFFF;
				margin-top: 88rpx;
			}
		}

	}

	.cvvBox {
		width: 500rpx;

		.title {
			text-align: center;
			font-size: 28rpx;
			font-weight: bold;
			color: #2A2B2E;
			padding: 26rpx 0;
			border-bottom: 1rpx solid #D9D9D9;
		}

		.info {
			// margin: 0 23rpx 20rpx;
			padding: 0 30rpx;
			border-radius: 21rpx;
			font-size: 25rpx;
			color: #000000;
			background-color: #FFFFFF;

			.u-form-item {
				padding: 4rpx 0;
			}
		}

		.cvvInfo {
			height: auto;
			padding-bottom: 35rpx;

			.CVVbtn {
				margin-top: 44rpx;
				width: 400rpx;
				margin-bottom: 0;
			}
		}
	}
</style>
