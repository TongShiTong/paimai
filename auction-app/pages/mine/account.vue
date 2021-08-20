<template>
	<view>
		<view class="content">
			<block v-for="(item,index) in accountList" :key='index'>
				<view class="con-item">
					<view class="item-left">
						<view class="img"><image src="../../static/images/faceBook.png" mode=""></image></view>
						<view class="">Facebook</view>
					</view>
					<view class="item-right" @click="unBind(item)">
						<text style="margin-right: 16rpx;">JUDY</text><u-icon name="arrow-right" color="rgba(60, 60, 67, 0.4)" size="28"></u-icon>
					</view>
				</view>
			</block>
		</view>
		<view class="text">
			<view>{{$t('other.accountText')}}</view>
			<view>{{$t('other.accountText1')}}</view>
		</view>
		<view>
			<u-modal v-model="show"
				:show-cancel-button='true'
				border-radius='25'
				:content="$t('other.content')"
				:cancel-text="$t('cancelText')"
				:confirm-text="$t('other.confirm')"
				@confirm='confirmFn'
				:title="$t('other.title')"
				:title-style="{'font-size': '30rpx','font-weight': 600,'color':' #000000'}"
				:content-style="{padding:'12rpx 28rpx 53rpx'}"
				:cancel-style = "{'border-right':'2rpx solid rgba(60, 60, 67, 0.18 '}"
			></u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				accountList:[],
				show:false,
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
			    title: this.$t('mine.account')
			});
		},
		methods: {
			unBind(item){
				this.show = true
			},
			confirmFn(){
				console.log(this.show)
			},
		}
	}
</script>

<style lang="scss" scoped>
.content{
	padding: 0 28rpx 0 21rpx; 
	background-color: #fff;
	.con-item{
		height: 140rpx;
		display: flex;
		align-items: center;
		font-size: 26rpx;
		line-height: 37rpx;
		.item-right{
			margin-left: auto;
			color: rgba(60, 60, 67, 0.8);
		}
		.item-left{
			display: flex;
			align-items: center;
			font-size: 26rpx;
			color: #2A2B2E;
			
			.img{
				width: 53rpx;
				height: 53rpx;
				margin-right: 21rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
}
.text{
	text-align: center;
	margin: 30rpx 28rpx;
	font-size: 21rpx;
	font-weight: 400;
	color: $fontColor;
	line-height: 30rpx;
	view{
		margin-top: 11rpx;
	}
}
</style>
