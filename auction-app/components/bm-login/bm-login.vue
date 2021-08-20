<template>
    <view class="login">
		<loginTitle></loginTitle>
        <view class="input_wrapper">
            <view class="inp">
            	<u-input v-model="user.mobile" type="number" :height='105' :placeholder="$t('login.phoneAccout')"/>
            </view>
			<view class="inp">
				<view class="inpPwd">
					<u-input :type="pwdShow?'password':'text'" v-model="user.password" :password-icon='false' :height='105' :placeholder="$t('login.password')"/>
					<image class="btnPwd" :src="pwdShow?'/static/login/hide.png':'/static/login/show.png'" mode="" @click="pwdShow = !pwdShow"></image>
				</view>
			</view>
			<view class="inp">
			    <button class="loginBtn" :class="flag?'':'gray'" @click="submit()">
			        {{$t('login.login')}}
			    </button>
			</view>
			<view class="text">
				<view class="register">
					{{$t('login.noAccout')}}
					<text class="reg" @click="$emit('register')">{{$t('login.pleaceReg')}}</text>
				</view>
				<!-- <view class="forgetPwd reg" @click="$emit('forgetPassword')">
					{{$t('login.forgetPwd')}}
				</view> -->
			</view>
        </view>
        <view class="bottom">
            <loginBottom></loginBottom>
        </view>
    </view>
</template>

<script>
	import loginTitle from './logonTitle.vue'
	import loginBottom from './loginBottom.vue'
    export default {
		components:{
			loginTitle,
			loginBottom
		},
        name: "bm_login",
		props:['baseConfig','iconsBase64'],
        data(){
            return{
                user:{
					mobile: '',
					password: ""
				},
				pwdShow:false
            }
        },

        watch: {
            
        },

        computed:{
            flag(){
				return this.user.mobile.length>=7&&this.user.mobile.length<=11&&this.user.password.length>=6&&this.user.password.length<=16?true:false
			}
        },

        mounted() {

        },
        methods:{
			
            submit(){
                //发送请求
				if(this.$store.state.phoneCountryId==3644){
					let regexpphone = /^1(2|3|4|5|6|7|8|9)\d{9}$/;
					// if(!regexpphone.test(this.user.mobile))return this.$u.toast(this.$t('message.writePhone'))
					if(!regexpphone.test(this.user.mobile))return this.$u.toast(this.$t('login.phone'))
				}
				if(!this.flag)return this.$u.toast(this.$t('message.login'))
				this.$emit('parent_login',this.user);
            }
        }
    }
</script>

<style lang="scss" scoped>
	.wrap {
		word-wrap: break-word;
	}
    .login{
		padding-top: 160rpx;
        .input_wrapper{
			padding: 0 70rpx;
			/deep/.u-input{
				background: #F2F4F7;
				border-radius: 21rpx;
				padding: 0 28rpx !important;
			}
			.inp{
				padding-bottom: 30rpx;
			}
			.loginBtn{
				height: 105rpx;
				background: $btnActive;
				border-radius: 21rpx;
				font-weight: 600;
				border: none;
				color: #fff;
				&::after{
					border: none;
				}
			}
			.gray{
				background: $btnDisable;
				color: $fontColor;
			}
			.text{
				display: flex;
				justify-content: space-between;
				color: $fontColor;
				.reg{
					color: $mainColor;
				}
				.forgetPwd{
					color: $fontColor;
				}
			}
			
			.inpPwd{
				display: flex;
				width: 100%;
				align-items: center;
				justify-content: space-between;
				background: #F2F4F7;
				padding-right: 28rpx;
				border-radius: 21rpx;
				/deep/.u-input{padding-right: 0 !important;}
				.btnPwd{
					width: 39rpx;
					height: 39rpx;
				}
			}
		}
    }
</style>
