<template>
	<view class="content">
		<v-tabs v-model="current" :fixed="true" :tabs="tabs" @change="changeTab" lineHeight="0" height="70rpx" lineRadius="21rpx" :scroll="false" paddingItem="0 8rpx" bgColor="#1D1E1F" fontSize="26rpx" activeColor="#1A1B1D" color="#F5F6F6"></v-tabs>
		<view class="list-box">
			<view 
				v-for="(item,index) in photoList" 
				:key="index" 
				:class="{'active':item.active}"
				:data-index="index"
				@tap="goodsDetail(item.id, item.status)"
				style="padding-bottom: 18rpx;"
			>
				<view class="image_box">
					<image :src="item.product.mainImgUrl" mode="aspectFill" lazy-load="true"></image>
					<view class="jxz">{{ $t('other.onlookers', { people: item.pv }) }}</view>
					<view class="rpz">{{ $t('other.shoot') }}</view>
					<view class="popur" v-if="current==1">
						<view class="yjp">
							{{ $t('other.closed') }}
						</view>
					</view>
				</view>
				<view class="demo-price">
					<text class="logo">$</text>{{item.currentBidPrice}}<text class="dqj">{{ current==1? $t('other.jpPrice'):$t('other.currentPrice') }}</text>
				</view>
				<view class="title">{{item.product.title}}</view>
				<view class="demo-shop">
					{{item.product.subTitle}}
				</view>
			</view>
		</view>
		<view class="load">{{loadTxt}}</view>
	</view>
</template>

<script>
	import vTabs from '@/components/v-tabs/v-tabs1.vue'
	export default {
		components:{ vTabs },
		data() {
            return {
            	// tabs: ['正在热拍', '已结拍'],
            	current: 0,
				photoList:[],
				param: {
					categoryId:null,
					limit:20,
					page:1,
					status: '5',
					me:1
				},
				isGet:true,
				loadTxt:this.$t('index.noData')
            };
        },
		computed:{
			tabs(){
				return [this.$t('other.shooting'),this.$t('other.closed')]
			}
		},
		onShow() {
			
		},
		onLoad(){
			uni.setNavigationBarTitle({
			    title: this.$t('mine.scene')
			});
			this.getPhoto();
		},
		onReachBottom(){
			if(this.total>this.photoList.length) {
				this.getPhoto();
			}else {
				
			}
		},
        methods: {
			changeTab(index) {
			  this.current = index;
			  this.param.page = 1;
			  this.photoList = [];
			  this.param.status = index==1?'9':'5';
			  this.getPhoto();
			},
            toLogin(){
                //跳转传参示例
                this.$Router.push({
                    path: '/pages/login/login',
                    query: {msg:'我要登录！'}
                });
            },
            toOrder(){
                //跳转传参示例
                this.$Router.push({
                    path: '/pages/order/order',
                    query: {msg:'前往订单！'}
                });
            },
			// 进入详情页
			goodsDetail(id,status) {
				if(status===5) {
					uni.navigateTo({
						url:'/pages/goodsDetail/goodsDetail?id=' + id
					})
				}else {
					this.$u.toast("已结拍");
				}
			},
			/* 获取照片 */
			getPhoto(){
				// if(!this.isGet){
				// 	return;
				// }
				// this.isGet=false;
				// /* 第一页弹出加载层 */
				// if(this.param.page==1){
				// 	uni.showLoading({
				// 		title:'加载中',
				// 		mask:true
				// 	})
				// }else{
				// 	this.loadTxt="正在加载中";
				// }
				// this.$api('auction', this.param).then(res => {
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
				// 	this.isGet=true;
				// }).catch((e)=>{
				// 	if(this.param.page==1){
				// 		uni.hideLoading();
				// 	}
				// 	this.isGet=true;
				// });
				
				let that = this
				if(!this.isGet){
					return;
				}
				this.isGet=false;
				new Promise((success,error)=>{
					/* 第一页弹出加载层 */
					if(this.param.page==1){
						uni.showLoading({
							title:this.$t('index.load'),
							mask:true
						})
					}else{
						this.loadTxt=this.$t('index.loading');
					}
					/* 无真实图片请求接口，由 setTimeout 模拟异步过程 */
					this.$api('auction', this.param).then(res => {
						that.total = res.data.total;
						success(res.data.rows);
					}).catch((e)=>{
						uni.hideLoading();
						that.isGet=true;

					});
				}).then((res)=>{
					if(this.param.page==1){
						uni.hideLoading();
					}
					this.photoList=[...this.photoList,...res];
					this.showImages();
				})
			},
			/* 显示照片 */
			showImages(){
				let index=(this.param.page-1)*this.param.limit;
				let show=()=>{
					if(index<this.photoList.length){
						this.$set(this.photoList[index],"active",true);
						index++;
					}else{
						clearInterval(interval);
						// this.loadTxt="上拉加载更多";
						// this.param.page++;
						if(this.total>this.photoList.length) {
							this.param.page++;
							this.loadTxt=this.$t('index.upLoad');
						}else {
							this.loadTxt=this.$t('index.loadMore');
						}
						this.isGet=true;
					}
				}
				
				let interval=setInterval(()=>{
					show();
				},100);
			}
        }
	}
</script>

<style lang="scss" scoped>
    page {
		background-color: #F3F4F5;
	}
	.content {
		background-color: #F3F4F5;
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
			margin-bottom: 30upx;
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
		line-height: 80upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
		background-color: #F3F4F5;
	}

</style>
