<template>
    <view class="register">
		<view class="bgColor"></view>
		<!-- 其他账号登录绑定手机号 -->
        <bm-login :myConfig="myConfig"
                  @next_login="login">
        </bm-login>
    </view>
</template>

<script>
	import bmLogin from '@/components/bm-login/register.vue'
    export default {
        name: "mobilBinding",
		components: {
			bmLogin
		},
        data(){
            return{
                myConfig:{
					// 底部是否显示 注册TRUE 授权FALSE
                    register: false,
                }
            }
        },
		onLoad() {
			uni.setNavigationBarTitle({
			    title: this.$t('mine.account')
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
            login(input_info){
                //登录
                console.log(input_info);    //用户输入的用户名和密码
				uni.navigateTo({
					url: '/pages/login/meansPerfect'
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
