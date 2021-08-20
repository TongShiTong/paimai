<template>
	<view class="orderList">
		<u-sticky bg-color='rgba(0,0,0,0)' :enable='enable'>
			<view class="title">
				<u-tabs name="cate_name" bar-width="47" bar-height='9' inactive-color='#3C3C43' active-color='#1D1E1F' :list="list" :is-scroll="true" :current="current" @change="change"></u-tabs>
			</view>
		</u-sticky>
		
		<view class="content">
			<!-- <block v-for="(item, index) in orderList" :key="item.id" >
				<order-card :order='item' @click='click' @open='open' :index='index' @payFn='payFn' @lookLogistics='lookLogistics' @moreFn='moreFn'></order-card>
			</block> -->
			<!-- 按组使用 -->
			<uni-swipe-action>
			    <uni-swipe-action-item v-for="(item, index) in orderList" :show='item.show' :key="item.id" :auto-close='true' :right-options="options"  @click="bindClick($event, item.id,index)" @change="swipeChange($event, index)">
			        <order-card :order='item' @endTime='endTime' :index='index' @payFn='payFn' @lookLogistics='lookLogistics' @confirm='confirm' @moreFn='moreFn'></order-card>
			    </uni-swipe-action-item>
			</uni-swipe-action>
			
		</view>
		<view class="load" v-if="pageAll>=1">{{loadText[comment]}}</view>
		<!-- <u-loadmore :status="comment" :load-text="loadText" v-if="pageAll>=1"/> -->
		<u-empty :text="$t('message.orderEmpty')" mode="order" v-if="orderList.length == 0" margin-top='300'></u-empty>
	</view>
</template>

<script>
	import orderCard from '@/components/user/orderCard'
	export default {
		name:'orderList',
		components: {
			orderCard
		},
		data() {
			return {
				status: 0,
				enable:true,
				current:0,
				orderList:[],
				unRead:[],//订单未读数
				// unReadCount:0,
				pages:{
					limit:10,
					page:1
				},
				total:0,
				pageAll:0,
				comment: 'loadmore'
			}
		},
		computed:{
			list:{
				get(){
					let list1=this.unRead.filter(item=>{
							return item.status ==1
						}),list2=this.unRead.filter(item=>{
							return item.status ==2
						}),list3=this.unRead.filter(item=>{
							return item.status ==3
						}),list9=this.unRead.filter(item=>{
							return item.status ==9
						})
					return [{
						cate_name: this.$t('order.orderAll'),
						count: 0
					},{
						cate_name: this.$t('mine.paid'),
						count:list1.length==0?0:list1[0].unReadCount
					},{
						cate_name: this.$t('mine.delivered'),
						count:list2.length==0?0:list2[0].unReadCount
					},{
						cate_name: this.$t('mine.received'),
						count:list3.length==0?0:list3[0].unReadCount
					}, {
						cate_name: this.$t('mine.completed'),
						count:list9.length==0?0:list9[0].unReadCount
					}]
				},
				set(val){
					// console.log(val)
				}
			},
			loadText(){
				return {
					loadmore: this.$t('message.loadmore'),
					loading: this.$t('message.loading'),
					nomore: this.$t('message.nomore')
				}
			},
			// list(){
			// 	return 
			// }
			options(){
				return [
					{
						text: this.$t('order.btnDel'),
						style: {
							'backgroundColor': '#FF3B30',
							'writing-mode': 'vertical-rl',
							width:'158rpx'
						}
					}
				] 
			}
		},
		onLoad(options) {
			if(options.status){
				this.pages.status = options.status
				this.current = options.status == 9?4:options.status
			}
			this.orderList = []
			this.pages.page=1
			let that = this
			this.getOrderlist(this.pages).then(res=>{
				that.getUnread().then(res=>{
					if(that.list[that.current].count==0)return
					that.setUnread()
				})
			})
			uni.$on('refreshData',() => {
				this.orderList = []
				this.pages.page=1
				let that = this
				this.getOrderlist(this.pages).then(res=>{
					that.getUnread().then(res=>{
						if(that.list[that.current].count==0)return
						that.setUnread()
					})
				})
			})
		},
		onShow() {
			this.enable = true
			uni.setNavigationBarTitle({
			    title: this.$t('order.orderTitle')
			});
		},
		onHide() {
			this.enable = false
		},
		methods: {
			//删除
			async bindClick(e,id,index){
				// console.log(e,id,index)
			  // console.log('点击了'+(e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
			  await this.$api('order.orderDel', {},id).then(res=>{
			  	if(res.code==0){
			  		this.orderList.splice(index,1)
			  	}
			  }).catch((e)=>{
			    // resolve(false);
			    uni.hideLoading();
			    this.$u.toast(e.data.message);
			  });
			},
			//点击滑块
			swipeChange(e,index){
				// console.log(e,index,this.orderList[index].show)
			},
			
			
			async getOrderlist(pages){
				let that = this
				uni.showLoading({})
				await this.$api('order.order', pages).then(res=>{
					// console.log(res)
					uni.hideLoading()
					if(res.code==0){
						that.total = res.data.total
						that.pageAll = Math.ceil(that.total/that.pages.limit)
						res.data.rows.forEach((val, idx) => {
							res.data.rows[idx].show = 'none';
						})
						that.orderList=[...that.orderList,...res.data.rows];
						that.$forceUpdate()
						// console.log(that.orderList)
						// that.orderList = that.orderList.concat(res.data.rows)
						that.comment = that.pages.page >= that.pageAll?'nomore':'loadmore';
						if(that.pages.status){
							if(that.list[that.current].count==0)return
							that.setUnread()
						}
					}
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				});
			},
			///** 查询订单未读数 ↓ **/
			async getUnread(){
				await this.$api('order.unread', {}).then(res=>{
					// console.log(res)
					if(res.code==0){
						this.unRead = res.data
						
						// console.log(this.unRead)
					}
				}).catch((e)=>{
				  // resolve(false);
				  // uni.hideLoading();
				  this.$u.toast(e.data.message);
				});
			},
			///** 设置订单已读 ↓ **/
			async setUnread(){
				let p ={
					status:this.pages.status,
					minOrderNo:this.list[this.current].count
				}
				await this.$api('order.read', p,`${this.pages.status}/read`).then(res=>{
					// console.log(res)
					if(res.code==0){
						this.getUnread()
					}
				}).catch((e)=>{
				  // resolve(false);
				  // uni.hideLoading();
				  this.$u.toast(e.data.message);
				});
			},
			change(index) {
				this.current = index;
				this.pages = {
					page:1,
					limit:10
				}
				if(index==1)this.pages.status = 1
				if(index==2)this.pages.status = 2
				if(index==3)this.pages.status = 3
				if(index==4)this.pages.status = 9
				// this.orderList.forEach((val, idx) => {
				// 	this.orderList[idx].show = 'none';
				// })
				this.pages.page = 1
				this.orderList = []
				this.comment = 'loadmore';
				this.getOrderlist(this.pages)
			},
			//支付时间过期
			endTime(index){
				this.orderList[index].status = -1
			},
			//查看物流
			lookLogistics(orderNo){
				// console.log(orderNo)
				uni.navigateTo({
					url:'/pages/mine/logistics?orderNo='+orderNo
				})
			},
			//确认收货
			confirm(orderNo,index){
				let that = this
				uni.showModal({
					title: '提示',
					content: '确认收货么？',
					success: (res)=>{
						if (res.confirm) {
							// console.log(index)
							that.$api('order.confirm', {},`${orderNo}/confirm`).then(res=>{
								if(res.code==0){
									// console.log(res,index)
									// console.log(that.orderList[index])
									// console.log(that.orderList[index].status)
									that.orderList[index].status=9
								}
								// console.log(res)
							}).catch((e)=>{
							  that.$u.toast(e.data.message);
							});
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
				
			},
			//立即购买
			payFn(index,orderNo){
				// let url = this.orderList[index].receiverSet?`/pages/mine/orderPay?orderNo=${orderNo}`:`/pages/mine/address?orderNo=${orderNo}`
				uni.navigateTo({
					url:`/pages/mine/orderPay?orderNo=${orderNo}&receiverSet=${this.orderList[index].receiverSet}`
				})
				// console.log(orderNo)
			},
			//更多
			moreFn(index,id){
				// console.log(index,id,this.orderList[index].show)
				if(this.orderList[index].show=='none'){
					this.orderList[index].show = 'right';
					this.orderList.forEach((val, idx) => {
						if(index != idx) this.orderList[idx].show = 'none';
					})
				}else{
					this.orderList[index].show = 'none';
				}
			},
		},
		onPullDownRefresh() {
			this.pages.page = 1
			this.orderList = []
			this.getOrderlist(this.pages).then(res=>{
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom(){
			if(this.pages.page >= this.pageAll) return ;
			this.comment = 'loading';
			this.pages.page++
			this.getOrderlist(this.pages)
			
		}
	}
</script>

<style lang="scss" scoped>
.title{
	padding: 18rpx 28rpx 21rpx;
	background: #fff;
	border-radius: 0 0 18rpx 18rpx;
	box-shadow: 0 0 10rpx 0 rgba(0,0,0,.1);
}
.content{
	padding: 0 28rpx 20rpx;
}
.load{
		line-height: 60upx;
		text-align: center;
		font-size: 24upx;
		color: #999;
		padding-bottom: 20rpx;
		background-color: #F3F4F5;
	}
	/deep/.uni-swipe{
		    margin: 9px 0 0;
		    // background: #fff;
		    // border-radius: 10px;
			background: #fff;
			box-shadow: 0rpx 0rpx 25rpx 0rpx rgba(38, 38, 41, 0.06);
			border-radius: 21rpx;
			overflow: hidden;
	}
</style>
