<template>
	<view>
		<view class="content">
			<view class="title">
				<image class="img" src="../../static/images/logo.png" mode=""></image>
			</view>
			<view class="about" @click="updateFn">
				<view class="right">{{$t('other.update')}}</view>
				<view class="name">v{{version}}</view>
			</view>
			<view class="about" @click="serverFn()">
				<view class="right">{{$t('other.service')}}</view>
			</view>
			<view class="about" @click="goPhone">
				<view class="right">{{$t('other.hotline')}}</view>
				<view class="name">400-0000-000</view>
			</view>
		</view>
		<view class="text">copyright 2021 {{$t('login.title')}} All Rights Reserved</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version:1
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.$t('other.aboutTitle')
			});
		},
		methods: {
			// 安卓更新新版本 
			 AndroidCheckUpdate1:function(){  
				var _this=this;  
				uni.request({  
					url: 'http://xxxx.com/version.txt',  
					method: 'GET',  
					data: {},  
					success: res => {  
						if(res.data>this.version){  
							if(plus.networkinfo.getCurrentType()!=3){  
								uni.showToast({  
									title: this.$t('message.noWifi'),  
									mask: false,  
									duration: 5000,  
									icon:"none"  
								});  
								return;  
							}  
							uni.showToast({  
								title: this.$t('message.wifi'),  
								mask: false,  
								duration: 5000,  
								icon:"none"  
							});  
							var dtask = plus.downloader.createDownload( "http://xxxx.com/app.apk", {}, function ( d, status ) {  
									// 下载完成  
									if ( status == 200 ) {   
										plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},{},function(error){  
											uni.showToast({  
												title: this.$t('message.failedIns'),  
												mask: false,  
												duration: 1500  
											});  
										})  
									} else {  
										 uni.showToast({  
											title: this.$t('message.faileUpdate'),  
											mask: false,  
											duration: 1500  
										 });  
									}    
								});  
							dtask.start();   
						}  
					},  
					fail: () => {},  
					complete: () => {}  
				});  
			},  
			updateFn(){
				// #ifdef APP-PLUS
					// const url = "/uview-ui/components/u-full-screen/u-full-screen?id=1"
					// uni.navigateTo({
					// 	url
					// })
					 uni.getSystemInfo({  
						success:(res) => {  
							console.log(res.platform);  
							//检测当前平台，如果是安卓则启动安卓更新  
							if(res.platform=="android"){  
								this.AndroidCheckUpdate();  
							}  
						}  
					})  
				// #endif
				
			},
			/**
			 * 安卓应用的检测更新实现
			 */
			AndroidCheckUpdate:function(){  
				var _this = this;  
				uni.request({
					//请求地址，设置为自己的服务器链接
					url: GLOBAL.DOMAIN_URL+'/uniapi/checkAndroidVersion.html',
					//method: 'GET',  
					data: {},  
					success: resMz => {
						var server_version = resMz.data.data.version;
						var currTimeStamp = resMz.data.data.timestamp;
						// 判断缓存时间
						uni.getStorage({
							key: 'tip_version_update_time',
							success: function (res) {
								var lastTimeStamp = res.data;
								//定义提醒的时间间隔，避免烦人的一直提示，一个小时：3600；一天：86400
								var tipTimeLength = 3600;
								if((lastTimeStamp+tipTimeLength) > currTimeStamp){
									//避免多次提醒，不要更新
									console.log("避免多次提醒，不要更新");
								}else{
									//重新设置时间戳
									_this.setStorageForAppVersion(currTimeStamp);
									//进行版本型号的比对 以及下载更新请求
									_this.checkVersionToLoadUpdate(server_version, _this.version);
								}
							},
							fail:function(res){
								_this.setStorageForAppVersion(currTimeStamp);
							}
						});
					},  
					fail: () => {},  
					complete: () => {}  
				});  
			},  
			/**
			 * //设置应用版本号对应的缓存信息
			 * @param {Object} currTimeStamp 当前获取的时间戳
			 */
			setStorageForAppVersion:function(currTimeStamp){
				uni.setStorage({
					key: 'tip_version_update_time',
					data: currTimeStamp,
					success: function () {
						console.log('setStorage-success');
					}
				});
			},
			/**
			 * 进行版本型号的比对 以及下载更新请求
			 * @param {Object} server_version 服务器最新 应用版本号
			 * @param {Object} curr_version 当前应用版本号
			 */
			checkVersionToLoadUpdate:function(server_version,curr_version){
				if(server_version > curr_version){
					//TODO 此处判断是否为 WIFI连接状态
					if(plus.networkinfo.getCurrentType()!=3){
						uni.showToast({  
							title: this.$t('message.noWifi'),  
							mask: true,  
							duration: 5000,
							icon:"none"
						});  
						return;  
					}else{
						uni.showModal({
							title: this.$t('message.updateTitle'),
							content: this.$t('message.download'),
							confirmText:this.$t('message.updateNow'),
							cancelText:this.$t('message.updateLater'),
							success: function (res) {
								if (res.confirm) {
									uni.showToast({
										icon:"none",
										mask: true,
										title: this.$t('message.wifi'),  
										duration: 5000,  
									}); 
									//设置 最新版本apk的下载链接
									var downloadApkUrl = GLOBAL.DOMAIN_URL+"/apk/mzz2.apk";
									var dtask = plus.downloader.createDownload( downloadApkUrl, {}, function ( d, status ) {  
											// 下载完成  
											if ( status == 200 ) {   
												plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename),{},{},function(error){  
													uni.showToast({  
														title: this.$t('message.failedIns'),
														duration: 1500  
													});  
												})
											} else {  
												 uni.showToast({  
													title: this.$t('message.faileUpdate'),
													duration: 1500  
												 });  
											}    
										});  
									dtask.start();
								} else if (res.cancel) {
									console.log('稍后更新');
								}
							}
						});
					}
				}
			},
			
			serverFn(){
				uni.navigateTo({
					url:'/pages/web/index?url=http://www.baidu.com',
				})
				// // #ifdef APP-PLUS
				// 	plus.runtime.openURL('http://www.baidu.com');
				// // #endif
			},
			goPhone(){
				// 客服电话
				uni.makePhoneCall({
				    phoneNumber: '114' //仅为示例
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.content{
	background-color: #fff;
	padding: 0 32rpx;
	.title{
		text-align: center;
		padding: 72rpx 0;
		.img{
			width: 173rpx;
			height: 177rpx;
		}
	}
}
.about{
	height: 140rpx;
	line-height: 140rpx;
	background-color: #fff;
	border-bottom: 2rpx solid #D9D9D9;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 8rpx;
	.right{
		font-size: 26rpx;
		color: #2A2B2E;
	}
	.img{
		width: 97rpx;
		height: 97rpx;
		// background: #EBEBEB;
		border-radius: 50%;
		image{
			width: 97rpx;
			height: 97rpx;
			border-radius: 50%;
		}
	}
	.name{
		font-size: 26rpx;
		color: rgba(60, 60, 67, 0.8);
	}
	&:last-child {
		border-bottom: none;
	}
}

	
.text{
	text-align: center;
	font-size: 21rpx;
	font-weight: 400;
	color: #939599;
	line-height: 30rpx;
	padding-top: 21rpx;
}
</style>
