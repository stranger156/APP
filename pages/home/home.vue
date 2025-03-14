<template>
	<view class="userLayout">
		<view class="userInfo">
			<view class="avatar">
				<image src="/static/wechat_icon.png" mode="aspectFit"></image>
			</view>
			<view class="nickname">金方琢</view>
		</view>
		
		<view class="section">
			<view class="list">
				<view class="row">
					<view class="left">
						<uni-icons type="contact" size="30"></uni-icons>
						<view class="text">我的学员</view>
					</view>
					<view class="right">
						<view class="text">33</view>
						<uni-icons type="right" size="30"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		
		<view class="section">
			
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.userLayout{
	.userInfo{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 50rpx 0;
		.avatar{
			width: 160rpx;
			height: 160rpx;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.nickname{
			font-size: 40rpx;
			padding: 20rpx 0 5rpx;
		}
	}
}	
</style>

