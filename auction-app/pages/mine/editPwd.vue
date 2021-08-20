<template>
	<view class="editPwd">
		<view class="content">
			<view class="pwd">
				<view class="inpPwd">
					<u-input :type="oldShow?'password':'text'" v-model="password.oldPassword" :password-icon='false' :height="140" :border="false" :placeholder="$t('other.oriPwd')"/>
					<image class="btnPwd" :src="oldShow?'/static/login/hide.png':'/static/login/show.png'" mode="" @click="oldShow = !oldShow"></image>
				</view>
				<!-- <u-input v-model="password.oldPwd" :height="140" type="text" :border="false" placeholder="原密码"/> -->
			</view>
			<view class="pwd">
				<view class="inpPwd">
					<u-input :type="newPwd?'password':'text'" v-model="password.newPassword" :password-icon='false' :height="140" :border="false" :placeholder="$t('other.newPwd')"/>
					<image class="btnPwd" :src="newPwd?'/static/login/hide.png':'/static/login/show.png'" mode="" @click="newPwd = !newPwd"></image>
				</view>
				<!-- <u-input v-model="password.newPwd" :height="140" type="text" :border="false" placeholder="新密码"/> -->
			</view>
			<view class="pwd">
				<view class="inpPwd">
					<u-input :type="configPwd?'password':'text'" v-model="password.configPwd" :password-icon='false' :height="140" :border="false" :placeholder="$t('other.conNewPwd')"/>
					<image class="btnPwd" :src="configPwd?'/static/login/hide.png':'/static/login/show.png'" mode="" @click="configPwd = !configPwd"></image>
				</view>
				<!-- <u-input v-model="password.configPwd" :height="140" type="text" :border="false" placeholder="确认新密码"/> -->
			</view>
		</view>
		
		<view class="posBottom">
			<view :style="{width: '100%',height:windowBottom+175+'rpx'}"></view>
			<view class="posBac" :style="{height:windowBottom+165+'rpx'}"></view>
			<view :style="{bottom:windowBottom+60+'rpx'}" :class="flag?' btn':'noactive btn'" @click="editPwd()">{{$t('other.modify')}}</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		computed: {
			...mapState(['windowBottom']),
			flag(){
				return this.password.oldPassword.length>=6&&this.password.oldPassword.length<=16&&this.password.newPassword.length>=6&&this.password.newPassword.length<=16&&this.password.configPwd.length>=6&&this.password.configPwd.length<=16?true:false
			}
		},
		data() {
			return {
				password:{
					oldPassword:'',
					newPassword:'',
					configPwd:''
				},
				// {
				// 	"newPassword": "",
				// 	"oldPassword": ""
				// }
				oldShow:true,
				newPwd:true,
				configPwd:true,
			};
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.$t('mine.editPwd')
			});
		},
		methods:{
			async editPwd(){
				if(!this.flag)return
				if(this.password.newPassword!==this.password.configPwd)return this.$u.toast(this.$t('message.password'))
				await this.$api('user.password', this.password).then(res => {
				  console.log('password', res);
				  if(res.code==0){
					this.$refs.uToast.show({
						title: this.$t('message.modify'),
						type: 'success',
						callback:()=>{
							uni.navigateBack({delta:1})
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
		}
	}
</script>

<style lang="scss">
.content{
	background: #fff;
	padding: 0 28rpx;
	.pwd{
		height: 140rpx;
		border-bottom: 1rpx solid #d9d9d9;
	}
	.inpPwd{
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		// background: #F2F4F7;
		padding:0 28rpx;
		border-radius: 21rpx;
		/deep/.u-input{padding-right: 0 !important;}
		.btnPwd{
			width: 39rpx;
			height: 39rpx;
		}
	}
	
}
.editPwd .noactive{
		background: #D9D9D9;
		color: #3C3C43;
	}
</style>
