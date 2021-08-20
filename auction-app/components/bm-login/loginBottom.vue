<template>
	<view class="">
		<view style="width: 100%;height: 350rpx;"></view>
		<!-- <view class="otherLoginWays">
			<view class="otherWay_box">
				<view style="width: 100%;
				height: 32rpx;
				background: #fff;
				position: absolute;
				bottom: 0;"></view>
				<view class="otherWayTextWrapper">
				</view>
				<view class="otherWayText" style="font-size: 19rpx;
				        color: rgba(60, 60, 67, 0.6);
						position: absolute;
						left: 50%;
						transform: translate(-50%, -50%);
						background: #fff;
						padding: 0 14rpx;">{{$t('login.other')}}</view>
			</view>
		   
		    <view class="icons">
		        <slot name="otherLoginWays_icons">
					<image class="icon" src="/static/images/faceBook.png" mode="" @click="login()"></image>
					<image class="icon" src="/static/images/phone.png" mode="" @click="goPath()"></image>
					<image class="icon" src="/static/images/google.png" mode="" @click="goPath()"></image>
		        </slot>
		    </view>
		</view> -->
	</view>
</template>

<script>
	// #ifdef APP-PLUS
	var facebook = uni.requireNativePlugin("sn-facebook");
	// #endif
	export default{
		data(){
			return{
	
			}
		},
		mounted() {
		
		},
		methods:{
			goPath(){
				uni.navigateTo({
					url: '/pages/login/mobilBinding'
				})
			},
			login(){
				
				// 获取key hash（仅android提供）
				// facebook.getKeyHash((e) => {
				// 	console.log(121,e)
				//   if (e.code == 0) {
				//     let keyhash = e.keyHash[0];
				//   }
				// });
				// 获取用户信息：如果已登录,可以调用
				// #ifdef APP-PLUS
				facebook.getUserInfo(
				  {
				    // 返回字段，更多字段请查看 https://developers.facebook.com/docs/graph-api/reference/user/
				    fields: "id, name, email, gender, birthday, picture", // 可选参数，示例是默认值
				  },
				  (e) => {
					if (e.data.picture) {
						console.log(122,e)
						uni.showToast({
						  icon: "none",
						  title: JSON.stringify(e),
						  duration: 2000
						});
					}else {
						// 登录：自定义参数
						facebook.loginWithParams(
						  {
						    permissions: [
						      // 权限，更多权限请看 https://developers.facebook.com/docs/permissions/reference
						      "email",
						      "user_photos",
						      "user_gender",
						      "user_birthday",
						      "public_profile",
						    ],
						    // 返回字段，更多字段请查看 https://developers.facebook.com/docs/graph-api/reference/user/
						    fields: "id, name, email, gender, birthday, picture",
						  },
						  (e) => {
							  console.log(121,e)
						    uni.showToast({
						      icon: "none",
						      title: JSON.stringify(e.errMsg),
							  duration: 2000
						    });
						  }
						);
					}
				  }
				);
				// #endif
				// #ifndef APP-PLUS
				uni.showToast({
				  icon: "none",
				  title: '请使用App登录'
				});
				// #endif
			},
		}
	}
</script>

<style lang="scss" scoped>
	.otherLoginWays{
	    width: calc(100% - 42rpx);
	    position: fixed;
	    bottom: 0rpx;
		background-color: #fff;
	    left: 21rpx;
	    right: 21rpx;
		height: 300rpx;
	    text-align: center;
		.otherWay_box{
			position: relative;
			.otherWayTextWrapper{
			    line-height: 0;
			    color: #666666;
			    &:before,&:after{
			        position: absolute;
			        background: #F0F0F0;
			        content: "";
			        height: 1px;
			        width: 50%;
			    }
			    &:before{
			        left: 0;
			    }
			    &:after{
			        right: 0;
			    }
			    // .otherWayText{
			        
			    // }
			}
		}
	    .icons{
	        display: flex;
	        flex-direction: row;
	        justify-content: space-between;
	        margin: 68rpx 148rpx 0;
	        .icon{
	        	width: 91rpx;
	        	height: 91rpx;
	        }
	    }
	}
</style>
