<template>
	<!-- 完善个人信息 -->
	<view class="means">
		<view class="bgColor"></view>
		<view class="upload">
			<image :src="userName.avatar" mode="" @click="imageShow = true" lazy-load="true"></image>
			<!-- <u-upload ref="uUpload" :custom-btn='true' :max-count='1' :action="action" :file-list="fileList" :height="177" :width="173" :deletable='false' :show-progress='false' :preview-full-image='false' @on-success='onSuccess' @on-remove="onRemove">
				<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
					<view class="addBtn">{{$t('login.imageUrl')}}</view>
				</view>
			</u-upload> -->
		</view>
		<view class="input_wrapper">
		    <view class="inp">
		    	<u-input type="text" v-model="userName.nickName" :height='105' :placeholder="$t('login.name')"/>
		    </view>
			<view class="inp">
				<view class="phone">
					<text class="loginBtn">{{$t('login.selectCounty')}}</text>
					<!-- <u-input type="text" :height='105' placeholder="手机号或账号"/> -->
					<view class="content" :style="contentStyle">
						<u-select v-model="countyShow" mode="single-column" :default-value="dfLangId" :list="county" @confirm="confirm" :confirm-text='$t("confirmText")' :cancel-text='$t("cancelText")' value-name='id' :label-name='localeLang=="zh"?"cname":"name"'></u-select>
						<view class="con" :style="conStyle" @click="countyShow=true">
							{{localeLang=='zh'?county[dfLangId[0]].cname:county[dfLangId[0]].name}} <image src="/static/login/xsj.png" class="xsj"></image>
						</view>
					</view>
					<!-- <lang :contentStyle='contentStyle' :conStyle='conStyle' :language='"navTitle"'></lang> -->
				</view>
			</view>
			<view class="inp">
				<view class="phone">
					<text class="loginBtn">{{$t('login.selectLang')}}</text>
					<lang :contentStyle='contentStyle' :conStyle='conStyle' :language='"navTitle"'></lang>
					<!-- <u-input type="text" :height='105' placeholder="手机号或账号"/> -->
				</view>
			</view>
			<view class="inp">
			    <button class="loginBtn" @click="submit()">
			        {{$t('login.goIndex')}}
			    </button>
			</view>
		</view>
		<u-popup v-model="imageShow" mode="center" width='600'>
			<view class="mask">
				<view v-for="(item,index) in imageList" :key='index'>
					<image :src="item" mode="" @click="userName.avatar = item;imageShow = false"></image>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import lang from '@/components/lang/lang.vue'
	import { mapState, mapActions } from 'vuex'
	export default {
		name:'meansPerfect',
		components:{
			lang
		},
		computed: {
			...mapState(['localeLang','phoneCountryId','langList']),
			dfLangId:{
				get:function(){
					this.county.forEach((item,index)=>{
					  if(this.phoneCountryId==item.id){
						  this.index = index
					  }
					})
					return [this.index]
				},
				set:function(value){
					console.log(value)
					// this.value = value
				}
			},
			languageId(){
				let id
				this.langList.forEach((item,index)=>{
					if(item.headCode==this.localeLang)id=item.id 
				})
				return id
			},
		},
		data() {
			return {
				// action:'http://www.example.com/upload',
				// fileList: [
				// 	{
				// 		url: 'http://114.55.168.60:8099/uploads/user/avatar/21/avatar.png',
				// 	}
				// ],
				
				//
				contentStyle:{
					'margin':'0 28rpx',
					'line-height':'105rpx',
					'width':'calc(100% - 105rpx - 56rpx)'
				},
				conStyle:{
					'justify-content': 'space-between',
					'align-items': 'center'
				},
				userName:{
					avatar:this.$store.state.user.userInfo?this.$store.state.user.userInfo.avatar:'',
					nickName:this.$store.state.user.userInfo?this.$store.state.user.userInfo.nickName:'',
					countryId:this.phoneCountryId,
					languageId:this.languageId
				},
				countyShow:false,
				// dfLangId:[0],
				index:0,
				county:[{cname:'中国',name:'China',id:3644}],
				imageShow:false,
				imageList:[
					'https://test-koali.oss-cn-hangzhou.aliyuncs.com/images/60ed13_1625467850033.jpg',
					'https://test-koali.oss-cn-hangzhou.aliyuncs.com/temp/2e480b_1625810139060.jpg',
					'http://scimg-x-jianbihuadq-x-com.img.abc188.com/touxiang/202004/202004012005563.jpg',
					'https://www.keaidian.com/uploads/allimg/181113/co1Q1130UQ6-0-1.jpg',
					'http://scimg-x-jianbihuadq-x-com.img.abc188.com/touxiang/202003/202003211405131.jpg',
					'https://file.qqtouxiang.com/gaoxiao/2020-01-22/26b385d6c7879c62dfa5a746a39e8875.jpeg',
					'https://file.qqtouxiang.com/gaoguai/2020-02-17/bcbe80a41c1e0ce1fc149aa84848834e.jpeg',
					'https://www.nitutu.com/uploads/allimg/200101/19242115C-4.jpeg',
					'http://www.gx8899.com/uploads/allimg/171113/3-1G113154052.jpg'
				],
				token:''
			};
		},
		onLoad(options) {
			console.log(options)
			// #ifdef H5
			if(options.query){
				let option = options
				option = JSON.parse(options.query)
				this.token = option.token
			}
			// #endif
			// #ifndef H5
			if(options.token){
				let option = options
				this.token = option.token
			}
			// #endif
			
			
			
			uni.setNavigationBarTitle({
			    title: this.$t('myCollection')
			});
			this.getCounty()
			this.getAvatar()
		},
		methods:{
			...mapActions(['setCountry']),
			//获取头像
			getAvatar(){
				if(this.userName.avatar)return
				let length = this.imageList.length
				let count =Math.floor(Math.random()*length) 
				this.userName.avatar = this.imageList[count]
				console.log(this.imageList[count],count)
			},
			//获取国家列表
			async getCounty(){
				await this.$api('countries', {}).then(res => {
				  // console.log('countries', res);
				  if(res.code==0){
					  this.county = res.data
				  }
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				  // console.log(e);
				});
			},
			// //移除图片
			// onRemove(index, lists) {
			// 	console.log('图片已被移除')
			// },
			// //上传成功
			// onSuccess(data, index, lists) {
			// 	console.log(data,index,list)
			// },
			// //上传错误
			// onError(res, index, lists){
			// 	console.log(data,index,list)
			// },
			//选择国家
			confirm(e) {
				this.setCountry(e[0].value)
			},
			async submit(){
				this.userName.countryId = this.phoneCountryId
				// console.log(this.phoneCountryId)
				this.userName.languageId = this.languageId
				if(!this.userName.nickName)return this.$u.toast(this.$t('message.perfectName'))
				// console.log(this.userName)
				if(this.token!=''){
					uni.setStorageSync('tokenInfo',this.token)
					this.$store.commit('TOKEN_INFO',this.token)
				}
				await this.$api('user.editUser', this.userName).then(res => {
				  // console.log('editUser', res);
				  if(res.code==0){
					  this.$store.dispatch('getUserInfo').then(res=>{
						  uni.setStorageSync('language',this.localeLang)
						  uni.reLaunch({
						  	url:'/pages/index/index'
						  })
					  }).catch(err=>{
						  this.$u.toast(e.data.message);
					  })
				  }
				}).catch((e)=>{
				  this.$store.commit('OUT_LOGIN')
				  this.$u.toast(e.data.message);
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	$mainColor: #007cdc;
	page{
		background: #fff;
	}
	.mask{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		view{
			width: 30%;
			height: 150rpx;
			margin: 10rpx 0;
			text-align: center;
		}
		image{
			width: 150rpx;
			height: 150rpx;
		}
	}
	.means{
		padding-top: 96rpx;
		.upload{
			width: 173rpx;
			height: 177rpx;
			margin:0rpx auto 121rpx;
			image{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
			/deep/ .u-list-item{
				border-radius: 50%;
			}
			.slot-btn{
				width: 173rpx;
				height: 177rpx;
				border-radius: 50%;
				font-size: 23rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				color: rgba(60, 60, 67, 0.8);
				background: #F2F4F7;
				line-height: 32rpx;
				.addBtn{
					text-align: center;
				}
			}
		}
		.input_wrapper{
			padding: 0 70rpx;
			.u-input{
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
				line-height: 105rpx;
				border: none;
				color: #fff;
				font-weight: 600;
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
				.reg{
					color: $mainColor;
				}
			}
		}
		.phone{
			display: flex;
			background: #F2F4F7;
			border-radius: 21rpx;
			overflow: hidden;
			.loginBtn{
				background: #F2F4F7;
				width: 151rpx;
				border: none;
				font-size: 25rpx;
				font-weight: 500;
				color: rgba(60, 60, 67, 0.8);
				border-radius: 0;
				border-right: 1px solid #D9D9D9;
				text-align: center;
			}
		}
		.con{
			font-size: 28rpx;
			font-weight: bold;
			color: #2D2720;
			display: flex;
			.xsj {
				width: 39rpx;
				height: 39rpx;
			}
		}
	}
</style>
