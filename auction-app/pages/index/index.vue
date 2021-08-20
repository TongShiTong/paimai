<template>
	<view class="content">
		<view class="nav_box">
			<view :style="{
			  height: statusHeight+'rpx'
			}"></view>
			<view class="navbar_box">
				<view class="navbar_title">{{$t('login.title')}}</view>
				<view class="navbar_img_box">
					<image class="image" src="/static/index/info.png"></image>
					<image @click="myScence" class="image" src="/static/index/user.png"></image>
				</view>
			</view>
		</view>
		<view :style="{
			  height: statusHeight+ 90 +'rpx'
			}">
		</view>
		<block>
			<swiper class="swiper" :style="{ background: banners.length>0?'':'#ffffff' }" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item class="swiper-item" v-for="(item,index) in banners" :key="index">
					<image class="logo" :src="item.imgUrl" mode="aspectFill" @click="jumpWeb(item.targetUrl)"></image>
				</swiper-item>
			</swiper>
		</block>
		<view class="process_box">
			<view class="process_title">{{$t('index.auction')}}</view>
			<view class="process_info">
				<view class="process_info_wn">
					<image class="image" src="/static/index/1.png"></image>
					<text>{{$t('index.pick')}}</text>
				</view>
				<image class="image" src="/static/index/sanjiao.png"></image>
				<view class="process_info_wn">
					<image class="image" src="/static/index/2.png"></image>
					<text>{{$t('index.deposit')}}</text>
				</view>
				<image class="image" src="/static/index/sanjiao.png"></image>
				<view class="process_info_wn">
					<image class="image" src="/static/index/3.png"></image>
					<text>{{$t('index.bidding')}}</text>
				</view>
				<image class="image" src="/static/index/sanjiao.png"></image>
				<view class="process_info_wn">
					<image class="image" src="/static/index/4.png"></image>
					<text>{{$t('index.pay')}}</text>
				</view>
				<image class="image" src="/static/index/sanjiao.png"></image>
				<view class="process_info_wn">
					<image class="image" src="/static/index/5.png"></image>
					<text>{{$t('index.receipt')}}</text>
				</view>
			</view>
			<u-notice-bar type="primary" mode="horizontal" :list="listNotice" bg-color="rgba(0, 146, 255, 0.04)" color="#0092FF" font-size="21" border-radius="7" padding="11rpx 9rpx"></u-notice-bar>
		</view>
		<view style="marginTop: 14rpx;">
			<block v-if="tabs.length>0">
				<u-sticky :enable="enable" :offset-top="statusHeight+90" bg-color="#F3F4F5">
					<view style="padding: 18rpx 0rpx;background: #F3F4F5;">
						<v-tabs v-model="current" :lock="islock" :tabs="tabs" @change="changeTab" lineHeight="0" height="60rpx" paddingItem="0 35rpx" bgColor="#F3F4F5" fontSize="26rpx" activeColor="#1D1E1F" color="#3C3C43"></v-tabs>
					</view>
				</u-sticky>
			</block>
			<view class="list-box">
				<view 
					v-for="(item,index) in photoList" 
					:key="index" 
					:class="{'active':item.active}"
					:data-index="index"
					@tap="goodsDetail(item.id)"
					style="padding-bottom: 18rpx;"
				>
					<view class="image_box">
						<image :src="item.product.mainImgUrl" mode="aspectFill" lazy-load="true"></image>
						<block v-if="item.status==1">
							<view class="jxz">{{ $t('other.onlookers', { people: item.pv }) }}</view>
							<view class="rpz">{{ $t('other.notice') }}</view>
						</block>
						<block v-if="item.status==5">
							<view class="jxz">{{ $t('other.onlookers', { people: item.pv }) }}</view>
							<view class="rpz">{{ $t('other.shoot') }}</view>
						</block>
					</view>
					<view class="demo-price" v-if="item.status==1">
						<text class="logo">$</text>{{item.startingPrice?item.startingPrice:0}}<text class="dqj">{{ $t('other.start') }}</text>
					</view>
					<view class="demo-price" v-if="item.status==5">
						<text class="logo">$</text>{{item.currentBidPrice?item.currentBidPrice:0}}<text class="dqj">{{ $t('other.currentPrice') }}</text>
					</view>
					<view class="title">{{item.product.title}}</view>
					<view class="demo-shop">
						{{item.product.subTitle}}
					</view>
				</view>
			</view>
			<view class="load">{{loadtext[loadTxt]}}</view>
			
		</view>
	</view>
</template>

<script>
	import vTabs from '@/components/v-tabs/v-tabs.vue';
	import { mapState } from 'vuex';
	// import { getContinue } from '@/common/utils/date.js'
	export default {
		components:{ vTabs },
		computed: {
			...mapState(['statusHeight']),
			loadtext(){
				return {
					noData:this.$t('index.noData'),
					loading:this.$t('index.loading'),
					upLoad:this.$t('index.upLoad'),
					loadMore:this.$t('index.loadMore')
				}
			}
		},
		// filters: {
		// 	getContinue(num) {
		// 		return getContinue(num/100)
		// 	},
		// },
		data() {
			return {
				enable: true,
				indicatorDots: true,
				autoplay: true,
				interval: 5000,
				duration: 500,
				listNotice: [
					'搜奇择物App',
					'正在努力开发中',
					'部分功能可能不完善',
					'请谅解！'
				],
				tabs: [],
				islock: false,
				current: 0,
				total:0,// 列表总条数
				banners:[], // 首页轮播图
				photoList:[],
				param: {
					categoryId: null,
					limit:20,
					page:1,
					me: 0,
					status: '1,5'
				},
				loadTxt:'noData'
			}
		},
		onLoad() {
			this.getBannersList();
			// this.param.page = 1;
			// this.photoList = [];
			this.getCategoriesList().then( res=> {
				this.getPhoto();
			});
			
			// uni.$on("handClickXXX", res => {
			//     console.log(res);
			//     // 清除监听
			//     uni.$off('handClickXXX');
			// })
		},
		onReachBottom() {
			if(this.total>this.photoList.length) {
				this.getPhoto();
			}else {
				
			}
		},
		onPullDownRefresh() {
			this.islock = false;
			this.param.page = 1;
			this.photoList = [];
			this.getCategoriesList().then( res=> {
				this.getPhoto()
			});
		},
        onShow() {
			this.enable = true
        },
		onHide() {
			this.enable = false
		},
		methods: {
			/* 获取照片 */
			async getPhoto(){
				// /* 第一页弹出加载层 */
				// if(this.param.page==1){
				// 	uni.showLoading({
				// 		title:'加载中',
				// 		mask:true
				// 	})
				// }else{
				// 	this.loadTxt="正在加载中";
				// }
				// await this.$api('auction', this.param).then(res => {
				// 	if(this.param.page==1){
				// 		uni.hideLoading();
				// 	}
				// 	this.photoList = this.photoList.concat(res.data.rows);
				// 	this.total = res.data.total;
				// 	if(this.total>this.photoList.length) {
				// 		this.param.page++;
				// 		this.loadTxt="上拉加载更多";
				// 	}else {
				// 		this.loadTxt="这是底部了，更多拍品正在准备中";
				// 	}
				// }).catch((e)=>{
				// 	if(this.param.page==1){
				// 		uni.hideLoading();
				// 	}
				// });
				let that = this
			
				new Promise((success,error)=>{
					/* 第一页弹出加载层 */
					if(this.param.page==1){
						uni.showLoading({
							title:this.$t('index.load'),
							mask:true
						})
					}else{
						this.loadTxt='loading';
					}
					/* 无真实图片请求接口，由 setTimeout 模拟异步过程 */
					this.$api('auction', this.param).then(res => {
						that.total = res.data.total;
						success(res.data.rows);
					}).catch((e)=>{
						uni.hideLoading();
					});
				}).then((res)=>{
					// if(this.param.page==1){
						uni.hideLoading();
					// }
					this.photoList=[...this.photoList,...res];
					this.showImages();
				}).catch(err=>{
					uni.hideLoading();
				})
			},
			/* 显示照片 */
			showImages(){
				let index=(this.param.page-1)*this.param.limit;
				let show=()=>{
					// console.log(index,this.photoList.length)
					if(index<this.photoList.length){
						this.$set(this.photoList[index],"active",true);
						index++;
					}else{
						clearInterval(interval);
						uni.stopPullDownRefresh();
						// this.loadTxt="上拉加载更多";
						// this.param.page++;
						if(this.total>this.photoList.length) {
							this.param.page++;
							this.loadTxt='upLoad';
						}else {
							this.loadTxt='loadMore';
						}
						this.islock = true;
					}
				}
				
				let interval=setInterval(()=>{
					show();
				},100);
			},
			
			changeTab(index) {

				this.islock = false;
			  this.current = index;
			  // this.loadTxt = 'noData';
			  this.param.page = 1;
			  this.photoList = [];
			  this.param.categoryId = this.tabs[index].id;
			  this.getPhoto()
			},
			goodsDetail(id) {
				uni.navigateTo({
					url:'/pages/goodsDetail/goodsDetail?id=' + id
				})
			},
			myScence() {
				uni.navigateTo({
					url:'/pages/mine/index',
				})
			},
			// 跳转h5链接
			jumpWeb(e) {
				if(e) {
					uni.navigateTo({
						url:'/pages/web/index?url='+e,
					})
				}
			},
	
            //获取banners
            async getBannersList() {
				await this.$api('banners', {}).then(res => {
					this.banners = res.data;
				}).catch((e)=>{
					console.log(e);
				});
            },
			//获取分类信息
			async getCategoriesList() {
				await this.$api('categories', {}).then(res => {
					let all = {
						id: null,
						name: "全部"
					}
					this.tabs = res.data;
					this.tabs.unshift(all)
				}).catch((e)=>{
					console.log(e);
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F3F4F5;
	}
	.content {
		background: #F3F4F5;
	}
	.nav_box {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 900;
		background: #F3F4F5;
		.navbar_box {
			height: 90rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 28rpx;
			.navbar_title {
				font-size: 40rpx;
				font-weight: bold;
				color: #1D1E1F;
				overflow: hidden;
				white-space: nowrap;
				width: 400rpx;
				text-overflow: ellipsis;
			}
			.navbar_img_box {
				display: flex;
				align-items: center;
				.image {
					width: 54rpx;
					height: 54rpx;
					margin-left: 42rpx;
				}
			}
		}
	}
	
	.swiper {
		margin: 0rpx 28rpx 28rpx;
		height: 180rpx;
		border-radius: 14rpx;
		overflow: hidden;
		.swiper-item{
			border-radius: 14rpx;
			.logo {
				width: 100%;
				height: 100%;
				overflow: hidden;
			}
		}
	}
	.process_box {
		margin: 0 28rpx 34rpx;
		background: #FFFFFF;
		border-radius: 14rpx;
		padding: 25rpx 18rpx 18rpx;
		.process_title {
			margin: 0 0 25rpx 10rpx;
			font-size: 30rpx;
			font-weight: bold;
			color: #2A2B2E;
		}
		.process_info {
			display: flex;
			justify-content: center;
			margin-bottom: 32rpx;
			align-items: center;
			.process_info_wn {
				width: 104rpx;
				display: flex;
				word-wrap:break-word;
				flex-direction: column;
				align-items: center;
				font-size: 26rpx;
				font-weight: 800;
				color: #1D1E1F;
				.image {
					width: 40rpx;
					height: 40rpx;
					margin-bottom: 6rpx;
				}
				text{
					// height: 68rpx;
					display: -webkit-box;
					 -webkit-box-orient: vertical;
					 -webkit-line-clamp: 2;
					 overflow: hidden;
				}
			}
			.image {
				width: 28rpx;
				height: 28rpx;
			}
		}
	}
	
	.list-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: flex-start;
		align-content: flex-start;
		padding: 20upx 28upx 0 28upx;
		background-color: #F3F4F5;
		&>view {
			background: #FFFFFF;
			box-shadow: 4rpx 0px 21rpx 0px rgba(100,90,123,0.08);
			border-radius: 18rpx;
			overflow: hidden;
			width: 338upx;
			margin-bottom: 18upx;
			transform:translateY(40upx);
			transition: all 0.3s ease-in-out 0s;
			
			&.active{
				opacity: 1;
				transform:translateY(0);
			}
		}
		.image_box {
			position: relative;
			image{
				width: 100%;
				height: 340upx;
				// background: rgba(60, 60, 67, 0.8);
				border-radius: 18rpx;
				display: block;
			}
			.jxz {
				position: absolute;
				z-index: 99;
				top: 0;
				left: 0;
				height: 35rpx;
				line-height: 35rpx;
				background: rgb(48, 50, 52);
				border-radius: 22rpx 18rpx 22rpx 22rpx;
				font-size: 18rpx;
				opacity: 0.3;
				color: #F2F4F7;
				padding: 0rpx 14rpx 0rpx 95rpx;
			}
			.rpz {
				position: absolute;
				z-index: 100;
				top: 0;
				left: 0;
				width: 80rpx;
				height: 35rpx;
				text-align: center;
				line-height: 35rpx;
				font-size: 18rpx;
				color: rgba(242,244,247,0.3);
				background-size: 100% 100%;
				background: url(../../static/rpz.png) no-repeat center;
				background-size: 100% 100%;
			}
			.popur {
				position: absolute;
				z-index: 98;
				top: 0;
				left: 0;
				width: 100%;
				height: 340upx;
				background: rgba(60, 60, 67,0.8);
				border-radius: 18rpx;
				.yjp {
					position: absolute;
					z-index: 99;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
					width: 140rpx;
					font-size: 21rpx;
					color: #1D1E1F;
					background: rgba(242, 244, 247, 0.8);
					border-radius: 50%;
					padding: 58rpx 0 54rpx;
					margin: 0 auto;
					text-align: center;
				}
			}
		}
		
		.demo-price {
			font-size: 32rpx;
			font-weight: bold;
			color: #1D1E1F;
			margin: 23rpx 18rpx 14rpx;
			.logo {
				font-size: 21rpx;
			}
			.dqj {
				font-size: 19rpx;
				font-weight: 400;
				color: #0092FF;
				margin-left: 5rpx;
			}
		}
		
		.title {
			margin: 0 18rpx 5rpx;
			font-size: 26rpx;
			color: #2A2B2E;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.demo-shop {
			min-height: 32rpx;
			font-size: 22rpx;
			color: #939599;
			margin: 0px 18rpx 0rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	}
	
	.load{
		line-height: 60upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
		background-color: #F3F4F5;
	}

</style>
