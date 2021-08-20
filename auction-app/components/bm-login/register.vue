<template>
	<view class="login">
		<view class="toast" v-if="!myConfig.register">{{$t('login.authorize')}}</view>
		<loginTitle></loginTitle>
		<view class="input_wrapper">
			<view class="inp">
				<view class="phone">
					<text class="btn"
						@click="countyShow = true">{{county[dfLangId[0]].name+'(+'+county[dfLangId[0]].phoneCode+')'}}
						<!-- {{$t('login.countyPhone')}} --></text>
					<!-- <view class=""></view> -->
					<u-input v-model="userName.mobile" type="number" :height='105'
						:placeholder="$t('login.phoneAccout')" />
				</view>
				<u-select v-model="countyShow" mode="single-column" :default-value="dfLangId" :list="county"
					@confirm="confirm" :confirm-text='$t("confirmText")' :cancel-text='$t("cancelText")' value-name='id'
					:label-name='"name"' :phoneCode='true'></u-select>
				<!-- <u-input v-model="userName.name" type="text" :height='105' placeholder="手机号或账号"/> -->
			</view>
			<view class="inp code" v-if="myConfig.register&&!myConfig.forgetPwd" >
				<u-input v-model="imageCode" :placeholder="$t('bankCard.enter')" :height='105' type="text">
				</u-input>
				<image :src="image?'data:image/jpg;base64,'+image.img:''" mode="" @click="imgCode"></image>
				
			</view>
			<view class="inp code">
				<u-input v-model="userName.verifyCode" :placeholder="$t('login.phoneCode')" :height='105' type="text">
				</u-input>
				<button :class="codeShow?'selectCode btn':'btn'" @click="getCode">{{codeTips}}</button>
			</view>
			<view class="inp">
				<view class="inpPwd">
					<u-input :type="pwdShow?'password':'text'" v-model="userName.password" :password-icon='false'
						:height='105' :placeholder="$t('login.setPwd')" />
					<image class="btnPwd" :src="pwdShow?'/static/login/hide.png':'/static/login/show.png'" mode=""
						@click="pwdShow = !pwdShow"></image>
				</view>
				<!-- <u-input v-model="userName.password" type="password" :height='105' :placeholder="$t('login.setPwd')" /> -->
			</view>
			<view class="inp">
				<!-- 注册 -->
				<button v-if="myConfig.register&&!myConfig.forgetPwd" :disabled="!flag" :class="flag?'':'gray'"
					class="loginBtn btn" @click="submit()">{{$t('login.register')}}</button>
				<!-- 绑定第三方账号 -->
				<button v-else-if="myConfig.forgetPwd" :disabled="!flag" :class="flag?'':'gray'" class="loginBtn btn"
					@click="$emit('goLogin',userName)">{{$t('login.setPwd')}}</button>
				<!-- 忘记密码 -->
				<button v-else class="loginBtn btn" :disabled="!flag" :class="flag?'':'gray'"
					@click="next_submit()">{{$t('login.next')}}</button>
			</view>
			<u-verification-code seconds="60" ref="uCode" @change="codeChange" :start-text="$t('login.getCode')"
				:change-text='"Xs"' :end-text="$t('login.getCode')"></u-verification-code>
			<view class="text" v-if="myConfig.register&&!myConfig.forgetPwd">
				<view class="register">
					{{$t('login.Accout')}}
					<text class="reg" @click="$emit('login')">{{$t('login.placeLogin')}}</text>
				</view>
				<!-- <view class="forgetPwd reg" @click="$emit('forgetPassword')">
					忘记密码
				</view> -->
			</view>
		</view>

		<view class="bottom" v-if="myConfig.register&&!myConfig.forgetPwd">
			<loginBottom></loginBottom>
		</view>
	</view>
</template>

<script>
	import loginTitle from './logonTitle.vue'
	import loginBottom from './loginBottom.vue'
	import {
		mapState,
		mapActions
	} from 'vuex'

	export default {
		components: {
			loginTitle,
			loginBottom
		},
		name: "register",
		props: {
			myConfig: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				userName: {
					mobile: '',
					verifyCode: '',
					password: ''
				},
				imageCode:'',
				//      mobile
				// 手机号码
				//        mobileCountryId
				// 国家code
				//        password
				// 密码
				//        verifyCode
				// 验证码
				//        bindToken
				// 绑定的社交token
				//        bindType
				// 登录类型, 4: Facebook.5: Google
				value: this.$t('login.getCode'),
				codeShow: false,
				pwdShow: false,
				codeFlag: false,

				// 中国（+86）
				// 印度尼西亚（+62）
				// 马来西亚（+60）
				// 菲律宾（+63）
				// 泰国（+66）
				// 新加坡（+65）
				// 文莱（+673）
				// 柬埔寨（+855）
				// 老挝（+856）
				// 缅甸（+95）
				// 越南（+84）
				// 印度（+91）
				// 国家
				county: [{
					name: '中国',
					id: 3644,
					phoneCode: 86
				}, {
					name: 'USA',
					id: 3830,
					phoneCode: 1
				}, {
					name: 'Malaysia',
					id: 3732,
					phoneCode: 60
				}, {
					name: 'Indonesia',
					id: 3701,
					phoneCode: 62
				}, {
					name: 'Pilipinas',
					id: 3773,
					phoneCode: 63
				}, {
					name: 'ประเทศไทย',
					id: 3815,
					phoneCode: 66
				}, {
					name: 'Singapore',
					id: 3796,
					phoneCode: 65
				}, {
					name: 'Cambodia',
					id: 3636,
					phoneCode: 855
				}, {
					name: 'ປະເທດລາວ',
					id: 3719,
					phoneCode: 856
				}, {
					name: 'မြန်မာ',
					id: 3750,
					phoneCode: 95
				}, {
					name: 'Việt Nam',
					id: 3836,
					phoneCode: 84
				}, {
					name: 'India',
					id: 3700,
					phoneCode: 91
				}],
				countyShow: false,
				image:null
			}
		},

		computed: {
			...mapState(['phoneCountryId', 'localeLang']),
			codeTips: {
				get: function() {
					if (this.value.length == 3 || this.value.length == 2) return this.value
					if (this.$t('login.getCode') != this.value) this.value = this.$t('login.getCode')
					return this.value
				},
				set: function(value) {
					this.value = value
				}
			},
			flag() {
				return this.codeFlag && this.userName.verifyCode.length == 4 && this.userName.mobile.length >= 7 && this
					.userName.mobile.length <= 11 && this.userName.password.length >= 6 && this.userName.password.length <=
					16 ? true : false
			},
			//默认国家选项
			dfLangId: {
				get: function() {
					this.county.forEach((item, index) => {
						if (this.phoneCountryId == item.id) {
							this.index = index
						}
					})
					return [this.index]
				},
				set: function(value) {
					console.log(value)
					// this.value = value
				}
			},
		},

		mounted() {
			// this.getCounty()
			this.imgCode()
			this.setLocaleLang(this.localeLang)
		},
		methods: {
			
			...mapActions(['setCountry', 'setLocaleLang']),
			//获取国家列表
			// async getCounty(){
			// 	await this.$api('countries', {}).then(res => {
			// 	  // console.log('countries', res);
			// 	  if(res.code==0){
			// 		  this.county = res.data
			// 	  }
			// 	}).catch((e)=>{
			// 	  // resolve(false);
			// 	  uni.hideLoading();
			// 	  this.$u.toast(e.data.message);
			// 	  // console.log(e);
			// 	});
			// },
			//选择国家
			confirm(e) {
				this.setCountry(e[0].value)
			},
			imgCode(){
				
				this.$api('mobile.imgCode').then(res=>{
					console.log(res)
					if(res.code==0){
						this.image = res.data
					}
				})
			},
			submit() {
				//发送请求
				if (this.phoneCountryId == 3644) {
					let regexpphone = /^1(2|3|4|5|6|7|8|9)\d{9}$/;
					// if(!regexpphone.test(this.user.mobile))return this.$u.toast(this.$t('message.writePhone'))
					if (!regexpphone.test(this.userName.mobile)) return this.$u.toast(this.$t('login.phone'))
				}
				this.userName.mobileCountryId = this.phoneCountryId
				// console.log(this.userName)
				this.$emit('parent_login', this.userName);
			},
			//下一步
			next_submit() {
				this.$emit('next_login', this.userName);
			},
			//验证码
			codeChange(text) {
				this.codeTips = text;
				if (text == this.$t('login.getCode')) this.codeShow = false
			},
			// 获取验证码
			async getCode() {
				if (this.userName.mobile.length < 7 || this.userName.mobile.length > 11) return this.$u.toast(this.$t(
					'message.writePhone'))
				if (this.phoneCountryId == 3644) {
					let regexpphone = /^1(2|3|4|5|6|7|8|9)\d{9}$/;
					// if(!regexpphone.test(this.user.mobile))return this.$u.toast(this.$t('message.writePhone'))
					if (!regexpphone.test(this.userName.mobile)) return this.$u.toast(this.$t('login.phone'))
				}
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: this.$t('message.obtainCode'),
						mask: true
					})
					if(!this.image)return this.$u.toast(this.$t('login.getCode'))
					if(!this.imageCode)return this.$u.toast(this.$t('login.phoneCode'))
					let p = {
						"mobile": this.userName.mobile,
						"phoneCountryId": this.phoneCountryId,
						imageVerifyCode:Number(this.imageCode),
						uuid:this.image.uuid
					}
					await this.$api('mobile.code', p).then(res => {
						console.log('getWeatherList', res);
						uni.hideLoading();
						if (res.code == 0) {
							this.codeShow = true
							this.codeFlag = true
							// 这里此提示会被this.start()方法中的提示覆盖
							this.$u.toast(this.$t('message.outCode'));
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}else{
							this.$u.toast(res.message);
						}
					}).catch((e) => {
						// resolve(false);
						console.log(e);
						uni.hideLoading();
						this.$u.toast(e.message);
					});
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.gradient {
		background-image: linear-gradient(to right, $mainColor, lighten($mainColor, 18%));
	}

	.toast {
		width: 450rpx;
		background: #F2F4F7;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		line-height: 63rpx;
		border-radius: 32rpx;
		text-align: center;
		font-size: 25rpx;
		color: #1D1E1F;
	}

	.login {
		// width: 80%;
		// margin: 0 auto;
		// text-align: center;
		padding-top: 160rpx;

		h2 {
			color: #666666;
			font-size: 1.6rem;
		}

		.input_wrapper {
			padding: 0 70rpx;

			.u-input {
				background: #F2F4F7;
				border-radius: 21rpx;
				padding: 0 28rpx !important;
			}

			.inp {
				padding-bottom: 30rpx;
			}

			.code {
				display: flex;
				image{
					width: 40%;
					height: 105rpx;
					margin-left: 20rpx;
				}
				.btn {
					margin-left: 14rpx;
					font-size: 28rpx;
					min-width: 198rpx;
				}

				.selectCode {
					background: $fontColor;
				}
			}

			.btn {
				height: 105rpx;
				background: $btnActive;
				border-radius: 21rpx;
				border: none;
				font-size: 35rpx;
				color: #fff;
				font-weight: 600;
				line-height: 105rpx;

				&::after {
					border: none;
				}
			}

			.gray {
				background: $btnDisable;
				color: $fontColor;
			}

			.inpPwd {
				display: flex;
				width: 100%;
				align-items: center;
				justify-content: space-between;
				background: #F2F4F7;
				padding-right: 28rpx;
				border-radius: 21rpx;

				/deep/.u-input {
					padding-right: 0 !important;
				}

				.btnPwd {
					width: 39rpx;
					height: 39rpx;
				}
			}

			.text {
				display: flex;
				justify-content: space-between;

				.reg {
					color: $mainColor;
				}
			}
		}

		.phone {
			display: flex;
			background: #F2F4F7;
			border-radius: 21rpx;
			overflow: hidden;

			.btn {
				background: #F2F4F7;
				min-width: 193rpx;
				max-width: 300rpx;
				border: none;
				font-size: 25rpx;
				font-weight: 500;
				color: rgba(60, 60, 67, 0.8);
				border-radius: 0;
				border-right: 1px solid #D9D9D9;
				text-align: center;
			}
		}
	}
</style>
