<template>
    <view class="resetPassword">
		<view class="bgColor"></view>
        <bm-login :myConfig="myConfig"
                  @goLogin="finish_modify">
            <!-- <template v-slot:header>
                <h2>重置密码</h2>
            </template>> -->
        </bm-login>
    </view>
</template>

<script>
	import { mapState } from 'vuex'
	import bmLogin from '@/components/bm-login/register.vue'
    export default {
        name: "resetPassword",
		components: {
			bmLogin
		},
		computed: mapState(['localeLang']),
        data(){
            return{
                //修改按钮上的文字
                myConfig:{
					register: true,
					forgetPwd:true
                    // finish_btn_value: '完成'
                },
                //修改图标（默认采用base64格式）
                myIcons:{
                }
            }
        },
		onLoad(){
			uni.setNavigationBarTitle({
			    title: this.$t('login.forgetPwd')
			});
		},
		watch:{
			localeLang:function(newVal,oldVal){
				uni.setNavigationBarTitle({
				    title: this.$t('login.forgetPwd')
				});
			}
		},
        methods:{
            //修改密码完成
            finish_modify(password){
                console.log(password);
                //发送请求，提交用户输入的新密码
				
                //跳转到登录页面
                uni.navigateTo({
                	url: '../login/index'
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
