<template>
	<view>
		<text>作业暗号：正割</text>
		<camera device-position="front" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
		<button @click="handleClick" >take a shot</button>
		<text>上面是预览画面,下面是拍照画面</text>
		<image mode="widthFix" :src="src"></image>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		onLoad() {

		},
		methods: {
			handleClick(){
				const ctx = uni.createCameraContext()
				ctx.takePhoto({
					quality:"high",
					success:(res)=>{
						this.src = res.tempImagePath
					}
				})
			},
			error(e){
				console.log(e.detail)
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
