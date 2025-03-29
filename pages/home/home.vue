<template>  
	<view class="userLayout pageBg">
		<view class="userInfo">
			<view class="avatar">
				<image src="/static/wechat_icon.png" mode="aspectFit"></image>
			</view>
			<view class="nickname">金方琢</view>
		</view>
		
		<view class="section">
			<view class="list">
				<navigator url="/pages/MyClasses/MyClasses" hover-class="none" hover-stay-time="100">
					<view class="row">
						<view class="left">
							<uni-icons type="checkbox-filled" size="30"></uni-icons>
							<view class="text">我的学员</view>
						</view>
						<view class="right">
							<view class="text">33</view>
							<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
				<navigator url="/pages/UserCenter/UserCenter" hover-class="none" hover-stay-time="100">
					<view class="row">
						<view class="left">
							<uni-icons type="contact-filled" size="30"></uni-icons>
							<view class="text">用户中心</view>
						</view>
						<view class="right">
							<view class="text">33</view>
							<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
				<navigator url="/pages/ClassStat/ClassStat" hover-class="none" hover-stay-time="100">
					<view class="row">
						<view class="left">
							<uni-icons type="info-filled" size="30"></uni-icons>
							<view class="text">课程统计</view>
						</view>
						<view class="right">
							<view class="text">33</view>
							<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
			</view>
		</view>
		
		<view class="section">
			<view class="list">
				<navigator url="/pages/UserFeedback/UserFeedback"  hover-class="none" hover-stay-time="100">
					<view class="row">
						<view class="left">
							<uni-icons type="chat-filled" size="30"></uni-icons>
							<view class="text">用户反馈</view>
						</view>
						<view class="right">
							<view class="text">33</view>
							<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
				<navigator url="/pages/AboutUs/AboutUs"  hover-class="none" hover-stay-time="100">
					<view class="row">
						<view class="left">
							<uni-icons type="info-filled" size="30"></uni-icons>
							<view class="text">关于我们</view>
						</view>
						<view class="right">
							<view class="text">33</view>
							<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
				<navigator url="/pages/Exit/Exit"  hover-class="none" hover-stay-time="100">
					<view class="row">
						<view class="left">
							<uni-icons type="minus-filled" size="30"></uni-icons>
							<view class="text">退出登录</view>
						</view>
						<view class="right">
							<view class="text">33</view>
							<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
						</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	@import "../../common/base-style.scss";
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
	.section{
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0,0,0,0.05);
		.list{
			.row{
				display: flex;
				justify-content: space-between;
				padding: 0 30rpx;
				height: 100rpx;
				border-bottom: 1px solid #eee;
				&:last-child{border-bottom: 0;}
				.left{
					display: flex;
					align-items: center;
					.text{
						font-size: 35rpx;
						padding-left: 15rpx;
						color: #666;
					}
					:deep(){
						.uni-icons{
							color:$brand-theme-color !important;
						}
					}
				}
				.right{
					display: flex;
					align-items: center;
					.text{
						font-size: 30rpx;
						padding-left: 15rpx;
						color: #aaa;
					}
				}
			}
		}
	}
}	
</style>

