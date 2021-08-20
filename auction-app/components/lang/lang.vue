<!--
  * Layout 布局
  * ============================================================================
  * 版权所有 2020-2024 www.pfuni.cn，并保留所有权利。
  * 网站地址: http://www.pfuni.cn；
  * ----------------------------------------------------------------------------
  * 这不是一个自由软件！您只能在不用于商业目的的前提下对程序代码进行修改和
  * 使用；不允许对程序代码以任何形式任何目的的再发布。
  * 侵权必究，请遵守版权约定！
  * ============================================================================
  *version 1.0.0
  *author : PanFu panfu163@126.com
  *last update date : 2020-01-01 00:00
-->
<template>
	<view class="content" :style="contentStyle">
		<u-select v-model="show" mode="single-column" :default-value="dfLangId" :list="lang" @confirm="confirm" :confirm-text='$t("confirmText")' :cancel-text='$t("cancelText")' value-name='headCode' label-name='localName'></u-select>
		<view class="con" :style="conStyle" @click="selectLang">
			{{lang[dfLangId[0]].localName}} <image src="/static/login/xsj.png" class="xsj"></image>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default{
		name:'lang',
	    components: {},
		computed: {
			...mapState(['localeLang','langList'])
		},
		props:{
			contentStyle:{
				type:Object,
				default:()=>{return {}}
			},
			conStyle:{
				type:Object,
				default:()=>{return {}}
			},
			language:{
				type:String,
				default:'navTitle'
			}
		},
		data() {
			return{
				lang:[{id: 3605, name: "English", localName: "English", headCode: "en", seq: 6}],
				dfLangId: [0], // 默认语言的id、
				show: false
			}
		},
		mounted() {
			this.getLang()
		},
		methods:{
			
			...mapActions(['setLocaleLang','setLang']),
			async getLang(){
				//获取可选择语言
				if(!this.langList||this.langList.length) {
					this.lang = this.langList
					this.lang.forEach((item, index) => {
						if(item.headCode === this.localeLang) {
							this.dfLangId[0] = index
						}
					})
					return
				}
				await this.$api('languages', {}).then(res => {
				  // console.log('languages', res);
				  if(res.code==0){
					  this.lang = res.data
					  this.setLang(this.lang)
					  this.lang.forEach((item, index) => {
					  	if(item.headCode === this.localeLang) {
					  		this.dfLangId[0] = index
					  	}
					  })
				  }
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				});
			},
			// 注意返回值为一个数组，单列时取数组的第一个元素即可(只有一个元素)
			confirm(e) {
				this.$i18n.locale = e[0].value;
				this.setLocaleLang(e[0].value)
				uni.setStorageSync('language',e[0].value)
				this.lang.forEach((item, key) => {
					if(item.headCode === e[0].value) {
						this.dfLangId[0] = key
					}
				})
				console.log(this.$store.state)
			},
			selectLang() {
				this.show = true
			},
		}
	}
</script>

<style lang="scss" scoped="scoped">
.content{
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
	// .con:after {
	// 	content: "";
	// 	display: inline-block;
	// 	vertical-align: middle;
	// 	width: 0px;
	// 	height: 0px;
	// 	border-top: 9rpx solid #000000;
	// 	border-left: 6rpx solid transparent;
	// 	border-right: 6rpx solid transparent;
	// 	border-bottom: 9rpx solid transparent;
	// 	margin-left: 7px;
	//   }
}						
</style>