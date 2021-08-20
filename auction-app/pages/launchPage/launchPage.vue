<template>
	<view class="bgColor">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onShow() {
			if(uni.getStorageSync('tokenInfo')){
				this.$store.dispatch('getUserInfo').then(res=>{
					if(res.code==0){
						uni.reLaunch({
							url:"/pages/index/index",
							animationType: 'pop-out',
							animationDuration: 200
						})
					}else{
						this.$store.commit('OUT_LOGIN',{})
						uni.reLaunch({
							url:"/pages/login/index",
							animationType: 'pop-out',
							animationDuration: 200
						})
					}
					
				}).catch(err=>{
					this.$store.commit('OUT_LOGIN',{})
					uni.reLaunch({
						url:"/pages/login/index",
						animationType: 'pop-out',
						animationDuration: 200
					})
				})
			}else{
				this.$store.commit('OUT_LOGIN',{})
				uni.reLaunch({
					url:"/pages/login/index",
					animationType: 'pop-out',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
