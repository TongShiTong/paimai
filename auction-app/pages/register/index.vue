<template>
    <view class="register">
		<view class="bgColor"></view>
        <bm-login :myConfig="myConfig"
                  @login="to_login"
                  @parent_login="login">
            <!-- <template v-slot:header>
                <view style="display: flex;flex-direction: column;align-items: flex-start;">
                    <h2>用户注册</h2>
                    <h2>账号密码注册</h2>
                </view>
            </template> -->
        </bm-login>
    </view>
</template>

<script>
	import bmLogin from '@/components/bm-login/register.vue'
    export default {
        name: "register",
		components: {
			bmLogin
		},
        data(){
            return{
                myConfig:{
					// 底部是否显示 注册TRUE 授权FALSE
                    register: true,
                }
            }
        },
		onLoad() {
			uni.setNavigationBarTitle({
			    title: this.$t('login.register')
			});
		},
        methods:{
            //根据配置自行选择需要的方法
    //         to_forgetPassword(){
    //             //进入忘记密码页面
				// uni.navigateTo({
				// 	url: '../phone-login/index'
				// })
    //         },
            async login(info){
                //登录
                console.log(info);    //用户输入的用户名和密码
				await this.$api('mobile.register', info).then(async res => {
				  console.log('register', res);
				  if(res.code==0){
					this.$u.toast('注册成功,请完善信息')
					uni.reLaunch({
						url:'/pages/login/meansPerfect?token='+res.data.token
					})
					// uni.setStorageSync('tokenInfo',res.data.token)
					// this.$store.commit('TOKEN_INFO',res.data.token)
					// uni.reLaunch({
					// 	url:'/pages/login/meansPerfect'
					// })
					// const p = {
					// 	"mobile": info.mobile,
					// 	"password": info.password
					// }
					// // if(info.bindToken)p.bindToken = info.bindToken
					// // if(info.bindType)p.bindType = info.bindType
					// await this.$api('auth', p).then(res => {
					//   console.log('auth', res);
					//   if(res.code==0){
					// 	  // uni.setStorageSync('tokenInfo',res.data.token)
					// 	  // this.$store.commit('TOKEN_INFO',res.data.token)
						  
					// 	  // uni.setStorageSync('userInfo',res.data)
					// 	  // this.$store.commit('USER_INFO',res.data)
						  
					// 	  uni.reLaunch({
					// 	  	url:'/pages/login/meansPerfect?token='+res.data.token
					// 	  })
					//   }
					// }).catch((e)=>{
					//   // resolve(false);
					//   uni.hideLoading();
					//   this.$u.toast(e.data.message);
					// });
					
					
				  }else{
					this.$u.toast(res.message);  
				  }
				}).catch((e)=>{
				  uni.hideLoading();
				  this.$u.toast(e.data.message);
				  console.log(e.data);
				});
            },
            to_login(){
                //返回登录页面
				uni.reLaunch({
					url: '/pages/login/index'
				})
            }
        }
    }
</script>

<style scoped>
page{
		background: #fff;
	}
</style>
