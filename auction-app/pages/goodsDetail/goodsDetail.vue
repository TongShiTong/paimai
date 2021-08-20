<template>
	<view :class="[isScllor?'content':'content1']">
		<view class="navbar_box" :style="{background: `rgba(255,255,255,${navback})`}">
			<view style="width: 120rpx;" @click="$back"><view class="back"></view></view>
			<view class="title">{{itemDetail.product.title}}</view>
			<view style="width: 120rpx;">
				<!-- <image style="margin-right: 14rpx;" class="image" src="/static/index/share.png"></image>
				<image class="image" src="/static/index/fanyi.png"></image> -->
			</view>
		</view>
		<view class="swiper-wrap">
			<swiper class="swiper" :indicator-dots="false" :autoplay="autoplay" :interval="interval" :duration="duration" @change="getCurrentNum">
				<swiper-item class="swiper-item" v-for="(item, index) in itemDetail.product.carouselImgUrls" :key="index">
					<image :src="item" @click='previewBanner(index)' class="slide-image" mode="aspectFill" />
				</swiper-item>
			</swiper>
			<view class="explain">
				{{$t('index.Bidding')}}<br>{{$t('index.explain')}}
			</view>
			<view class="watch_num">
				<image class="image" src="/static/index/serch.png"></image>
				<text>{{ $t('other.onlookers', { people: itemDetail.pv }) }}</text>
			</view>
			<view class="swiper-num">{{current + 1}}/{{itemDetail.product.carouselImgUrls.length}}</view>
		</view>
		
		<view class="pm_info">
			<view class="parce_info">
				<view class="parce">
					<view>{{$t('index.currentPrice')}}$<text class="money">{{itemDetail.currentBidPrice?itemDetail.currentBidPrice:0}}</text></view>
					<view class="yugu"><text >{{$t('index.estimated')}}$</text><text class="money">{{itemDetail.product.targetPrice?itemDetail.product.targetPrice:0}}</text></view>
				</view>
				<view class="down_time" v-if="itemDetail.status==1&&this.isBegin==1">{{$t('index.begins')}}：
					<u-count-down :key="componentKey" style="font-weight: bold;" :timestamp="beginTime" color="#1D1E1F" font-size="32" @end="timeBeginEnd"></u-count-down>
				</view>
				<view class="down_time" v-if="itemDetail.status==5">{{$t('index.end')}}：
					<u-count-down :key="componentKey" style="font-weight: bold;" :timestamp="endTime" color="#1D1E1F" font-size="32" @end="timeEnd"></u-count-down>
				</view>
			</view>
			<view class="title">{{itemDetail.product.title}}</view>
		<!-- 	<view class="cost">
				<view class="amount_info">
					逐件检查
				</view>
				<view class="amount_info">
					正品保证
				</view>
				<view class="amount_info">
					全场包邮
				</view>
			</view> -->
			<view class="process_info">
				<view class="process_info_wn">
					<image class="image" src="/static/index/1.png"></image>
					<text class="text">{{$t('index.pick')}}</text>
				</view>
				<image class="image" src="/static/index/sanjiao.png"></image>
				<view class="process_info_wn">
					<image class="image" src="/static/index/2.png"></image>
					<text class="text">{{$t('index.deposit')}}</text>
				</view>
				<image class="image" src="/static/index/sanjiao.png"></image>
				<view class="process_info_wn">
					<image class="image" src="/static/index/3.png"></image>
					<text class="text">{{$t('index.bidding')}}</text>
				</view>
				<image class="image" src="/static/index/sanjiao.png"></image>
				<view class="process_info_wn">
					<image class="image" src="/static/index/4.png"></image>
					<text class="text">{{$t('index.pay')}}</text>
				</view>
				<image class="image" src="/static/index/sanjiao.png"></image>
				<view class="process_info_wn">
					<image class="image" src="/static/index/5.png"></image>
					<text class="text">{{$t('index.receipt')}}</text>
				</view>
			</view>
		</view>
		<view class="line_box">
			<view class="line"></view>
		</view>
		<view style="background-color: #fff;">
			<view v-for="(item, index) in itemDetail.product.detailImgUrls" :key="index">
				<image style="width: 100%;display: block;" :src="item" mode="widthFix"></image>
			</view>
		</view>
		
		<popup v-model="showPopuo" mode="bottom" :stop="true" border-radius="24" :mask="false" :mask-close-able="false" @close="closePop">
			<view style="background: #F3F4F5;border-top-left-radius: 21rpx;border-top-right-radius: 21rpx;">
				<view class="pm_info1" :style="{padding:isShowTitle?'21rpx 28rpx':'14rpx 28rpx'}">
					<view class="parce_info">
						<view class="parce">
							<view>{{$t('index.currentPrice')}}$<text class="money">{{itemDetail.currentBidPrice?itemDetail.currentBidPrice:0}}</text></view>
							<view class="yugu"><text >{{$t('index.estimated')}}$</text><text class="money">{{itemDetail.product.targetPrice?itemDetail.product.targetPrice:0}}</text></view>
						</view>
						<view class="down_time" v-if="itemDetail.status==1&&this.isBegin==1">{{$t('index.begins')}}：
							<u-count-down :key="componentKey" style="font-weight: bold;" :timestamp="beginTime" color="#1D1E1F" font-size="32" @end="timeBeginEnd"></u-count-down>
						</view>
						<view class="down_time" v-if="itemDetail.status==5">{{$t('index.end')}}：
							<u-count-down :key="componentKey" style="font-weight: bold;" :timestamp="endTime" color="#1D1E1F" font-size="32" @end="timeEnd"></u-count-down>
						</view>
					</view>
					<view v-if="isShowTitle">
						<view class="title">{{itemDetail.product.title}}</view>
						<view class="cost">
							<view class="amount_info">
								{{$t('index.bond')}}<text class="amount">${{itemDetail.deposit}}</text>
							</view>
							<view class="amount_info">
								{{$t('index.increase')}}<text class="amount">${{itemDetail.additionPrice}}</text>
							</view>
							<!-- <view class="amount_info">
								{{$t('index.fee')}}<text class="amount">${{itemDetail.entranceFee}}</text>
							</view> -->
						</view>
					</view>
				</view>
				
				<view class="enter_info">
					<block v-if="isShow">
						<image class="image" :src="enterInfo.avatar" mode="aspectFill"></image>
						<text>{{enterInfo.nickName}} {{$t('index.venue')}}</text>
					</block>
				</view>
				<view class="ranking_box">
					<block v-if="isShow">
						<view class="ranking_info" v-if="downUpData">
							<image class="image" :src="downUpData.avatar" mode="aspectFill"></image>
							<view>
								<view class="ranking_name">{{downUpData.nickName}}</view>
								<view class="ranking_zg"><text style="font-size: 21rpx;">$</text>{{downUpData.amount}}<text class="zuigao">{{$t('index.highest')}}</text></view>
							</view>
						</view>
					</block>
					<!-- <view class="ranking_prace" v-if="downUpData">
						+{{downUpData.addAmount}}
					</view> -->
				</view>
			
				<scroll-view :style="{background: '#F3F4F5',height: scrollHeight,transition: 'height 0.5s'}" :scroll-top="scrollTop" :scroll-into-view="toLast" scroll-y="true" class="scroll-Y" @scroll="scroll">
					<block v-if="itemDetail.bidDTOList.length>0&&isShow">
						<view class="ranking_box" v-for="(item,index) in itemDetail.bidDTOList" :key="index" :id="'item'+(index+1)">
							<view class="ranking_info">
								<image class="image" :src="item.avatar" mode="aspectFill"></image>
								<view>
									<view class="ranking_name">{{item.nickName}}</view>
									<view class="ranking_zg"><text style="font-size: 21rpx;">$</text>{{item.amount}}</view>
								</view>
							</view>
							<!-- <view class="ranking_prace">
								+{{item.addAmount}}
							</view> -->
						</view>
					</block>
				</scroll-view>
			</view>
			<view :style="{height: windowBottom+175+'rpx'}"></view>
		</popup>
		 
		<u-popup v-model="showPayment" mode="bottom" border-radius="28" :mask-close-able="false" :closeable="true" @close="closePay">
			<view class="pay_box">
				<view class="title">{{$t('index.paymentfees')}}</view>
				<view class="pay_info">
					<view>
						{{$t('index.bond')}}：
					</view>
					<view class="pay">
						${{paymentData.deposit}}
					</view>
				</view>
				<view class="pay_info">
					<view>
						{{$t('index.participation')}}：
					</view>
					<view class="pay">
						${{paymentData.entranceFee}}
					</view>
				</view>
				<view class="info">
					<view class="info_box">
						<view><text style="font-size: 21rpx;">$</text>{{paymentData.total}}</view>
						<view class="dikou" v-if="bond>0">{{$t('index.first')}}${{paymentData.bond}}</view>
						<view class="dikou" v-else>{{$t('index.paid')}}</view>
					</view>
					<view class="btn" @tap="payMent">{{$t('index.payment')}}</view>
				</view>
			</view>
		</u-popup>
		
		<view :style="{height: windowBottom+175+'rpx'}"></view>
		
		<view v-if="showOffer || continueOffer">
			<u-mask class="mask" :show="showOffer" @click="showOffer = false" z-index='10085'>
				<view class="warp_pop">
					<view class="rect" @tap.stop>
						<view class="wenan">{{$t('index.success')}}</view>
						<view><text class="logo">$</text>{{currentDownPrice-itemDetail.additionPrice}}</view>
					</view>
				</view>
			</u-mask>
			
			<u-mask class="mask" :show="continueOffer" @click="continueOffer = false" z-index='10085'>
				<view class="warp_pop1">
					<view class="rect" @tap.stop>
						<view class="wenan">{{$t('index.congratulations')}}{{finishInfo.nickName}}{{$t('index.midshot')}}</view>
						<view><text class="logo">$</text>{{finishInfo.finalPrice}}</view>
						<view class="cont_btn" @tap="keepOn">{{$t('index.continue')}}</view>
					</view>
				</view>
			</u-mask>
		</view>
		
		
		<view class="btns_box" :style="{height: windowBottom+175+'rpx',background: !showPopuo?'#FFFFFF':'#F3F4F6'}">
			<!-- <block v-if="itemDetail.status==9">
				<view class="btn" v-if="!isShow" @tap="jiePai">已结拍</view>
			</block> -->
			<block>
				<view class="btn" v-if="!isShow" @tap="getBond">{{$t('index.shooting')}}</view>
				<view class="btns" v-else>
					<view class="parce">
						<view class="reduce" @tap="reducePrice"></view>
						<!-- <text style="font-size: 25rpx;">$</text> -->
						<u-input style="font-size: 35rpx;" input-align="center" type="number" :clearable="false" placeholder='' v-model.trim="currentDownPrice" />
						<!-- <view><text style="font-size: 25rpx;">$</text>{{currentDownPrice}}</view> -->
						<view class="add" @tap="addPrice"></view>
					</view>
					<view class="btn_cj" @tap="payBid" v-if="itemDetail.status==5">
						{{$t('index.offer')}}
						<!-- {{itemDetail.status==1?$t('index.register'):$t('index.offer')}} -->
					</view>
					<view class="btn_cj btn_cj1" v-else>
						{{$t('index.offer')}}
						<!-- {{itemDetail.status==1?$t('index.register'):$t('index.offer')}} -->
					</view>
				</view>
			</block>
			<image v-if="!showPopuo" @tap="bandUp" class="image" src="/static/index/up.png"></image>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import popup from '@/components/u-popup/u-popup.vue'
	export default {
		computed: mapState(['windowBottom','user']),
		components:{ popup },
		
		data() {
			return {
				componentKey:0,
				toLast: 'item0',
				navback: 0,
				conut:0,// 是否第一次滚动
				bond: 0, // 获取剩余保证金
				isShowTitle: true,
				isScllor: true, //底层滚动
				showPopuo: false,
				showPayment: false, // 支付的弹出框
				showOffer: false,// 出价成功遮罩层
				continueOffer: false, // 继续出价弹框
				scrollTop: 9999,
				scrollHeight: '180rpx',
				isShow: false,
				autoplay: true,
				interval: 5000,
				duration: 500,
				current: 0,
				beginTime: 0, // 开始倒计时
				endTime: 0, // 开始倒计时
				// timestamp: 86400,
				itemDetail: {
					product:{
						carouselImgUrls:[]
					},
					bidDTOList:[]
				},
				downUpData: null, // 当前最高
				itemId: null, // 拍场id
				isBegin: 0, // 是否开始，1开始，0其他
				currentDownPrice: 0, // 最下面当前价
				paymentData: {}, // 入场不成功需要充值
				enterInfo: {}, // 入场人信息
				finishInfo: {}, // 中拍人的信息
				socketTask: null,
				// 确保websocket是打开状态
				is_open_socket: false
			}
		},
		// 关闭websocket【必须在实例销毁之前关闭,否则会是underfined错误】
		beforeDestroy() {
			this.closeSocket();
		},
		onLoad(e) {
			this.itemId = e.id;
			this.enterInfo = this.user.userInfo;
			uni.setNavigationBarTitle({
			    title: this.$t('detail')
			});
			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			this.connectSocketInit();
			
		},
		onShow() {
			this.getDetail(this.itemId);
		},
		onHide() {
			this.showPayment = false;
		},
		onPageScroll(res) {
			if(res.scrollTop<=200) {
				this.navback = (res.scrollTop/200).toFixed(2)
			}
		},
		methods: {
			// 进入这个页面的时候创建websocket连接【整个页面随时使用】
			connectSocketInit() {
				let that = this
				// 创建一个this.socketTask对象【发送、接收、关闭socket都由这个对象操作】
				this.socketTask = uni.connectSocket({
					// 【非常重要】必须确保你的服务器是成功的,如果是手机测试千万别使用ws://127.0.0.1:9099【特别容易犯的错误】
					url: "ws://116.62.39.17:12029/ws/" + that.user.tokenInfo, // 测试
					// url: "ws://121.41.87.84:12029/ws/" + that.user.tokenInfo, // 正式
					success(data) {
						console.log("websocket连接成功");
					},
				});
 
				// 消息的发送和接收必须在正常连接打开中,才能发送或接收【否则会失败】
				this.socketTask.onOpen((res) => {
					console.log("WebSocket连接正常打开中...！");
					that.is_open_socket = true;
					// 注：只有连接正常打开中 ，才能正常成功发送消息
					let dataBid = {
						key: "auction_subscribe",
						data: {event: "bid", auctionId: that.itemId, single: true}
					}
					let dataTime = {
						key: "auction_subscribe",
						data: {event: "delay_close_time", auctionId: that.itemId, single: true}
					}
					let dataEnd = {
						key: "auction_subscribe",
						data: {event: "finish", auctionId: that.itemId, single: true}
					}
					let dataEnter = {
						key: "auction_subscribe",
						data: {event: "enter", auctionId: that.itemId, single: true}
					}
					// 用户出价后广播所有客户端出价结果
					that.socketTask.send({
						data: JSON.stringify(dataBid),
						// data: "发送一条消息",
						async success(res) {
							console.log("出价结果成功",res);
						},
					});
					// 用户出价后延长拍场关闭时间
					that.socketTask.send({
						data: JSON.stringify(dataTime),
						// data: "发送一条消息",
						async success(res) {
							console.log("关闭时间",res);
						},
					});
					// 拍场结算后通知结果
					that.socketTask.send({
						data: JSON.stringify(dataEnd),
						// data: "发送一条消息",
						async success(res) {
							console.log("结算成功",res);
						},
					});
					// 拍场入场通知结果
					that.socketTask.send({
						data: JSON.stringify(dataEnter),
						// data: "发送一条消息",
						async success(res) {
							console.log("入场成功",res);
						},
					});
					// 注：只有连接正常打开中 ，才能正常收到消息
					that.socketTask.onMessage((res) => {
						if(res.data!='success'){
							  let data = typeof res.data =='string'?JSON.parse(res.data):res.data
							  console.log(data);
							  if(data.event==="bid") {
								  that.downUpData = data.data;
								  that.currentDownPrice = data.data.amount + that.itemDetail.additionPrice;
								  that.itemDetail.currentBidPrice = data.data.amount;
								  that.itemDetail.bidDTOList.push(data.data);
								  
								  that.$nextTick(function() {
									// that.scrollTop = that.itemDetail.bidDTOList.length*100;
									that.toLast = `item${that.itemDetail.bidDTOList.length}`
								  });
							  };
							  if(data.event==="delay_close_time") {
								  // 获取当前时间戳
								let time = new Date().getTime();
								that.endTime = parseInt((data.data.closeTime-time)/1000);
								that.itemDetail.endTime = data.data.closeTime;
								that.$nextTick(function() {
									that.getNewTime();
								});
							  };
							  if(data.event==="enter") {
								that.enterInfo = data.data;
							  };
							  if(data.event==="finish") {
								 that.finishInfo = data.data;
								 that.continueOffer = true;
							  };
						}
					});
				})
				// 这里仅是事件监听【如果socket关闭了会执行】
				this.socketTask.onClose(() => {
					console.log("已经被关闭了")
				})
			},
			// 继续参拍
			keepOn() {
				// uni.$emit("handClickXXX",{data: item,index: index});
				uni.reLaunch({
				    url: '/pages/index/index'
				});
			},
			// 时间开始结束事件
			timeBeginEnd(e) {
				let that = this
				let interval=setInterval(()=>{
					that.getDetail(that.itemId).then(res=> {
						console.log("timeBeginEnd")
						if(that.itemDetail.status===5){
							clearInterval(interval);
						}
					});
				},500);
			},
			// 时间结束事件
			timeEnd(e) {
				let that = this
				let interval=setInterval(()=>{
					that.getDetail(that.itemId).then(res=> {
						console.log("timeEnd")
						if(that.itemDetail.status!==5){
							clearInterval(interval);
						}
					});
				},500);
			},
			// 关闭websocket【离开这个页面的时候执行关闭】
			closeSocket() {
				let that = this
				this.socketTask.close({
					success(res) {
						that.is_open_socket = false;
						console.log("关闭成功", res)
					},
					fail(err) {
						console.log("关闭失败", err)
					}
				})
			},
			clickRequest() {
				if (this.is_open_socket) {
					// websocket的服务器的原理是:发送一次消息,同时返回一组数据【否则服务器会进去死循环崩溃】
					this.socketTask.send({
						data: "请求一次发送一次message",
						async success() {
							console.log("消息发送成功");
						},
					});
				}
			},

			 // 减价
			 reducePrice() {
				 if(this.currentDownPrice<=this.itemDetail.currentBidPrice + this.itemDetail.additionPrice) {
					 this.$u.toast("不能低于此价");
				 }else {
					 this.currentDownPrice = this.currentDownPrice - this.itemDetail.additionPrice
				 }
			 },
			 // 加价
			 addPrice() {
				this.currentDownPrice = Number(this.currentDownPrice) + this.itemDetail.additionPrice
			 },
			 
			 // 获取保证金
			 getBond() {
				 this.$api('user.deposit', {}).then(res => {
					this.bond = res.data
					this.enterField(res.data/100)
				 }).catch((e)=>{
				 	console.log(e);
				 });
			 },
			 // 已结拍
			 jiePai() {
				this.$u.toast("此拍场已经结拍，请选择其他拍场");
			 },
			 // 入场
			async enterField(bond) {
				 await this.$api('enterDetail.enter', {}, this.itemId + '/enter').then(res => {
					if(res.data.enter) {
						this.isShow = true;
						this.bandUp();
					}else {
						res.data.total = Number(res.data.deposit) + Number(res.data.entranceFee);
						res.data.bond = Number(bond);
						// if(bond<=0) {
						// 	res.data.total = Number(res.data.deposit) + Number(res.data.entranceFee);
						// }else {
						// 	if((Number(res.data.deposit) + Number(res.data.entranceFee) - bond)>0) {
						// 		res.data.total = Number(res.data.deposit) + Number(res.data.entranceFee);
						// 		res.data.bond = Number(bond);
						// 	}else {
						// 		res.data.total = 0;
						// 		res.data.bond = Number(res.data.deposit) + Number(res.data.entranceFee);
						// 	};
						// };
						this.paymentData = res.data;
						this.showPayment = true;
					}
				 }).catch((e)=>{
				 	this.$u.toast(e.data.message);
				 });
			 },
			 // 出价
			async payBid() {
				 // this.showPayment = true;
				 await this.$api('enterDetail.bid', { price: Number(this.currentDownPrice*100) }, this.itemId + '/bid').then(res => {
					 console.log(res)
					 if(res.code===0) {
						 this.showOffer = true;
						 setTimeout(()=>{
						 	this.showOffer = false;
						 },2000)
					 }
				 }).catch((e)=>{
				 	this.$u.toast(e.data.message);
				 });
			 },
			 // 跳转支付页面
			 payMent() {
				 uni.navigateTo({
				 	url: '/pages/mine/recharge?pay=' + this.paymentData.total
				 })
			 },
			 // 获取详情
			 async getDetail(id) {
				 await this.$api('auctionDetail', {}, id).then(res => {
					this.currentDownPrice = res.data.currentBidPrice?res.data.currentBidPrice + res.data.additionPrice:0;
					res.data.product.carouselImgUrls = res.data.product.carouselImgUrls.split(',');
					res.data.product.detailImgUrls = res.data.product.detailImgUrls.split(',');
					res.data.bidDTOList = res.data.bidDTOList?res.data.bidDTOList:[];
					this.toLast = `item${res.data.bidDTOList.length}`
			
					if(res.data.bidDTOList.length>0) {
						this.downUpData = res.data.bidDTOList[res.data.bidDTOList.length-1]
					}
					if(res.data.entranceUserList&&res.data.entranceUserList.length>0) {
						for(let i = 0;i<res.data.entranceUserList.length;i++) {
							if(this.user.userInfo.id==res.data.entranceUserList[i].userId) {
								this.isShow = true;
								this.bandUp();
							}
						}
					}

					this.itemDetail = res.data;
					this.getNewTime();
				 }).catch((e)=>{
				 	console.log(e);
				 });
			 },
			 // 弹出
			 bandUp () {
				 this.showPopuo = true;
				 this.isScllor = false;
				 this.getNewTime();
			 },
			 // 获取最新时间
			 getNewTime() {
				 // 获取当前时间戳
				 let time = new Date().getTime();
				 // 获取距离开始时间戳
				 let beginTime = new Date(this.itemDetail.beginTime).getTime();
				 // 获取距离结束时间戳
				 let endTime = new Date(this.itemDetail.endTime).getTime();
				 if(time<beginTime) {
				 	this.isBegin = 1;
				 	this.beginTime = parseInt((beginTime-time)/1000);
				 }else if(beginTime<time<endTime) {
				 	this.endTime = parseInt((endTime-time)/1000);
				 	this.isBegin = 0;
				 }else {
				 	this.isBegin = 0;
				 };
				 this.componentKey += 1;
			 },
			 // 关闭回调
			 closePop(e) {
				 this.isScllor = true;
				 this.conut = 0;
				 this.isShowTitle = true;
				 this.scrollHeight = '180rpx';
			 },
			 closePay(e) {
				 
			 },
			 // upper: function(e) {
				//  console.log(e)
			 // },
			 // lower: function(e) {
				//  console.log(e)
			 // },
			 scroll: function(e) {
				 // console.log(e)
				 if(this.conut++>0) {
					 this.scrollHeight = '374rpx';
					 this.isShowTitle = false;
				 }
				 // this.old.scrollTop = e.detail.scrollTops
			 },
			 previewBanner(index) {
			    if (this.itemDetail.product.carouselImgUrls != "") {
			      uni.previewImage({
			        current: this.itemDetail.product.carouselImgUrls[index], // 当前显示图片的http链接
			        urls: this.itemDetail.product.carouselImgUrls, // 需要预览的图片http链接列表
			      });
			    }
			},
			getCurrentNum(e) {
				// console.log(e)
				this.current = e.detail.current;
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
	.content1 {
		background: #F3F4F5;
		height: 100vh;
		overflow: hidden;
	}
	.navbar_box {
		position: fixed;
		z-index: 999;
		width: 750rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 80rpx 30rpx 0;
		.back {
			border: solid black;
			border-width: 0 4rpx 4rpx 0;
			display: inline-block;
			padding: 8rpx;
			transform: rotate(135deg);
			-webkit-transform: rotate(135deg);
		}
		.title {
			max-width: 400rpx;
			font-size: 30rpx;
			color: #000000;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.image {
			width: 53rpx;
			height: 53rpx;
		}
	}
	.swiper-wrap{
	  position: relative;
	  .swiper {
	    width: 100%;
	    height: 752rpx;
		.swiper-item {
			.slide-image {
			  width: 100%;
			  height: 100%;
			}
		}
	  }
	  .explain {
		  position: absolute;
		  right: 0rpx;
		  bottom: 466rpx;
		  font-size: 21rpx;
		  color: #3C3C43;
		  padding: 7rpx 14rpx 7rpx 11rpx;
		  background: #FFFFFF;
		  box-shadow: 0px 4rpx 11rpx 0px rgba(60,60,67,0.18);
		  border-top-left-radius: 7rpx;
		  border-bottom-left-radius: 7rpx;
	  }
	  .swiper-num{
	    position: absolute;
	    right: 28rpx;
	    bottom: 33rpx;
	  	font-size: 21rpx;
	  	background: #000000;
	  	border-radius: 20rpx;
	  	opacity: 0.4;
	  	color: #fff;
		padding: 0rpx 14rpx 2rpx;
	  }
	  .watch_num {
		display: flex;
		align-items: center;
		position: absolute;
		left: 18rpx;
		bottom: 35rpx;
		font-size: 21rpx;
		color: #3C3C43;
		.image {
			width: 28rpx;
			height: 28rpx;
			margin-right: 4rpx;
		}
	  }
	}
	.pm_info {
		margin-top: 18rpx;
		padding: 28rpx 28rpx 50rpx;
		background: #FFFFFF;
		border-top-left-radius: 21rpx;
		border-top-right-radius: 21rpx;
		.parce_info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.parce {
				font-size: 22rpx;
				font-weight: 800;
				color: #ED5126;
				.money {
					font-size: 42rpx;
				}
				.yugu {
					display: flex;
					color: #ED5126;
					opacity: 0.5;
				}
			}
			.down_time {
				font-size: 22rpx;
				color: #3C3C43;
				display: flex;
			}
		}
		.title {
			font-size: 28rpx;
			color: #1D1E1F;
			font-weight: bold;
			margin: 28rpx 0;
			// text-overflow: -o-ellipsis-lastline;
			// overflow: hidden;
			// text-overflow: ellipsis;
			// display: -webkit-box;
			// -webkit-line-clamp: 2;
			// line-clamp: 2;
			// -webkit-box-orient: vertical;
		}
		.cost {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 19rpx;
			margin-bottom: 28rpx;
			background: rgba(0, 146, 255, 0.04);
			.amount_info {
				width: 33.3%;
				padding: 8rpx 0;
				// background: rgba(0, 146, 255, 0.04);
				border-radius: 7rpx;
				text-align: center;
				font-size: 21rpx;
				color: #0092FF;
			}
		}
		.process_info {
			display: flex;
			justify-content: center;
			align-items: center;
			.process_info_wn {
				width: 104rpx;
				display: flex;
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
				.text {
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
	.pm_info1 {
		padding: 21rpx 28rpx;
		background: #FFFFFF;
		border-radius: 21rpx;
		.parce_info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.parce {
				font-size: 22rpx;
				font-weight: 800;
				color: #ED5126;
				.money {
					font-size: 42rpx;
				}
				.yugu {
					display: flex;
					color: #ED5126;
					opacity: 0.5;
				}
			}
			.down_time {
				font-size: 22rpx;
				color: #3C3C43;
				display: flex;
			}
		}
		.title {
			font-size: 28rpx;
			color: #1D1E1F;
			font-weight: bold;
			margin: 28rpx 0;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
		}
		.cost {
			display: flex;
			align-items: center;
			justify-content: center;
			background: rgba(0, 146, 255, 0.04);
			.amount_info {
				// width: 33.3%;
				width: 50%;
				padding: 8rpx 0;
				// background: rgba(0, 146, 255, 0.04);
				border-radius: 7rpx;
				text-align: center;
				font-size: 21rpx;
				color: #31A7FF;
				.amount {
					font-size: 21rpx;
					font-weight: bold;
					color: #0092FF;
				}
			}
		}
	}
	.line_box {
		background: #FFFFFF;
		.line {
			height: 1rpx;
			margin: 0 18rpx;
			background-color: #D9D9D9;
		}
	}
	
	
	.enter_info {
		display: flex;
		height: 77rpx;
		align-items: center;
		font-size: 21rpx;
		color: rgba(60, 60, 67, 0.9);
		margin-top: 14rpx;
		background: #F3F4F6;
		.image {
			width: 54rpx;
			height: 54rpx;
			margin-right: 28rpx;
			margin-left: 68rpx;
			border-radius: 50%;
		}
	}

	
	.ranking_box {
		height: 98rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 46rpx;
		.ranking_info {
			display: flex;
			align-items: center;
			.image {
				width: 77rpx;
				height: 77rpx;
				margin-right: 21rpx;
				border-radius: 50%;
			}
			.ranking_name {
				font-size: 21rpx;
				color: rgba(60, 60, 67, 0.9);
			}
			.ranking_zg {
				font-size: 32rpx;
				font-weight: bold;
				color: #1D1E1F;
				.zuigao {
					font-size: 18rpx;
					font-weight: 400;
					color: #0092FF;
					margin-left: 6rpx;
				}
			}
		}
		.ranking_prace {
			font-size: 21rpx;
			font-weight: bold;
			color: rgba(60, 60, 67, 0.6);
		}
	}

	.warp_pop {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		.rect {
			width: 350rpx;
			height: 205rpx;
			background-color: #fff;
			border-radius: 25rpx;
			text-align: center;
			box-shadow: 0px 4rpx 53rpx 0px rgba(60,60,67,0.18);
			font-size: 42rpx;
			color: #1D1E1F;
			font-weight: bold;
			.wenan {
				font-size: 30rpx;
				color: #000000;
				font-weight: bold;
				padding: 50rpx 0 30rpx;
			}
			.logo {
				font-size: 21rpx;
			}
		}
	}
	.warp_pop1 {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		.rect {
			width: 473rpx;
			background-color: #fff;
			border-radius: 25rpx;
			text-align: center;
			box-shadow: 0px 4rpx 53rpx 0px rgba(60,60,67,0.18);
			font-size: 42rpx;
			color: #1D1E1F;
			font-weight: bold;
			.wenan {
				font-size: 30rpx;
				color: #000000;
				font-weight: bold;
				padding: 65rpx 0 33rpx;
			}
			.logo {
				font-size: 21rpx;
			}
			.cont_btn {
				width: 100%;
				font-size: 30rpx;
				color: #0092FF;
				border-top: 2rpx solid rgba(60, 60, 67, 0.18);
				padding: 23rpx 0 25rpx;
				margin-top: 46rpx;
			}
		}
	}
	
	.btns_box {
		position: fixed;
		z-index: 10076;
		bottom: 0;
		width: 750rpx;
		background: #FFFFFF;
		padding-top: 14rpx;
		.btn {
			width: 715rpx;
			height: 105rpx;
			margin: 0 auto;
			background: $btnActive;
			border-radius: 21rpx;
			line-height: 105rpx;
			text-align: center;
			font-size: 35rpx;
			color: #ffffff;
			font-weight: bold;
		}
		.btns {
			display: flex;
			justify-content: center;
			.parce {
				width: 391rpx;
				height: 105rpx;
				background: #ffffff;
				border-radius: 21rpx;
				font-size: 35rpx;
				color:#1D1E1F;
				font-weight: bold;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 26rpx;
				box-sizing: border-box;
				margin-right: 18rpx;
				.reduce {
					width: 53rpx;
					height: 53rpx;
					border: 2rpx solid #1D1E1F;
					border-radius: 50%;
					&::after {
						content: '';
						display: block;
						width: 25rpx;
						height: 4rpx;
						background: #1D1E1F;
						margin: 22rpx auto 0;
					}
				}
				.add {
					width: 53rpx;
					height: 53rpx;
					border: 2rpx solid #1D1E1F;
					border-radius: 50%;
					position: relative;
					&::before {
						content: '';
						display: block;
						width: 4rpx;
						height: 25rpx;
						background: #1D1E1F;
						position: absolute;
						left: 43%;
						top: 0%;
						transform: translate(50%, 50%);
					}
					&::after {
						content: '';
						display: block;
						width: 25rpx;
						height: 4rpx;
						background: #1D1E1F;
						position: absolute;
						left: 0%;
						top: 43%;
						transform: translate(50%, 50%);
					}
				}
			}
			.btn_cj {
				width: 307rpx;
				height: 105rpx;
				background: $btnActive;
				border-radius: 21rpx;
				line-height: 105rpx;
				text-align: center;
				font-size: 35rpx;
				color: #ffffff;
				font-weight: bold;
			}
			.btn_cj1 {
				background: #D9D9D9;
				color: #3C3C43;
			}
		}
		.image {
			width: 28rpx;
			height: 28rpx;
			position: absolute;
			top: -14rpx;
			left: 50%;
			transform: translate(-50%, 0);
		}
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
			height: 150rpx;
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
		}
		.info {
			height: 280rpx;
			display: flex;
			padding: 0 18rpx 0 44rpx;
			align-items: center;
			justify-content: space-between;
			font-size: 42rpx;
			font-weight: 800;
			color: #1D1E1F;
			.dikou {
				font-size: 21rpx;
				font-weight: 400;
				color: #0092FF;
			}
			.btn {
				width: 308rpx;
				height: 105rpx;
				text-align: center;
				line-height: 105rpx;
				background: #1D1E1F;
				border-radius: 21rpx;
				font-size: 35rpx;
				font-weight: 600;
				color: #FFFFFF;
			}
		}
	}
</style>
