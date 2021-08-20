<template>
    <view class="login">
		<view class="bgColor"></view>
        <bm-login :base-config="myConfig"
                  v-on:forgetPassword="to_forgetPassword"
                  v-on:register="to_register"
                  @parent_login="login">
        </bm-login>
    </view>
</template>

<script>
	import bmLogin from '@/components/bm-login/bm-login.vue'
	
    export default {
        name: "login",
		components: {
			bmLogin
		},
        data(){
            return{
                myConfig:{
                    //根据需要自行配置
                }
            }
        },
        methods:{
            to_forgetPassword(){
				uni.navigateTo({
					url: '/pages/reset-pwd/index'
				})
            },
            async login(user){
				await this.$api('auth', user).then(async res => {
				  console.log('auth', res);
				  if(res.code==0){
					  if(res.data.nickName&&res.data.avatar){
						uni.setStorageSync('tokenInfo',res.data.token)
						this.$store.commit('TOKEN_INFO',res.data.token)
					  	this.getUserinfo()
					  }else{
						uni.reLaunch({
							url:'/pages/login/meansPerfect?token='+res.data.token
						})
					  }
					  
					  // this.getUserinfo()
					  // console.log(this.$store.state.localeLang,this.$store.state.langList)
					  // let obj = this.$store.state.langList.filter(item=>{return item.headCode==this.$store.state.localeLang})[0]
					  // // if(!uni.getStorageSync('language'))return this.getUserinfo()
					  // if(res.data.languageId !== obj.id){
						 //  let p = {
							//   countryId:this.$store.state.phoneCountryId,
							//   languageId:obj.id,
						 //  }
						 //  await this.$api('user.editUser', p).then(res => {
						 //    // console.log('editUser', res);
						 //    if(res.code==0){
							// 	this.getUserinfo()
						 //    }
						 //  }).catch((e)=>{
						 //    this.$u.toast(e.data.message);
						 //  });
					  // }else{
						 //  this.getUserinfo()
					  // }
				  }
				}).catch((e)=>{
				  // resolve(false);
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				});
            },
			getUserinfo(){
				this.$store.dispatch('getUserInfo').then(res=>{
					if(res.code==0){
						if(!uni.getStorageSync('language')){
							uni.setStorageSync('language',this.$store.state.localeLang)
						// 	this.$i18n.locale = res.data.languageHeadCode;
						// 	this.$store.dispatch('setLocaleLang',res.data.languageHeadCode)
						}
						uni.reLaunch({
							url:'/pages/index/index'
						})
					}else{
						this.$u.toast(res.message);
					}
				  
				}).catch(err=>{
				  this.$u.toast(e.data.message);
				})
			},
            to_register(){
				uni.navigateTo({
					url: '/pages/register/index'
				})
            }
        }
    }
</script>

<style scoped lang="scss">
	page{
		background: #fff;
	}
   /* .login{
        height: 100vh;
    } */
	.title{
		color: $btnActive;
	}
	
</style>
