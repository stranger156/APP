<template>
	<view class = "userCenter pageBg">
		<view class="section">
			<view class="row avatar">
				<view class="left">头像</view>
				<view class="right">
					<view class="img">
						<image src="/static/wechat_icon.png" mode="aspectFit"></image>
					</view>
					<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
				</view>
			</view>
			<navigator url="/pages/ChangeNickname/ChangeNickname"  hover-class="none" hover-stay-time="100">
				<view class="row nickname">
					<view class="left">昵称</view>
					<view class="right">
						<view>金方琢</view>
						<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
					</view>
				</view>
			</navigator>
			<view class="row">
				<view class="left">生日</view>
				<view class="right">
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
					<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
				</view>
			</view>
			<view class="row location">
				<view class="left">位置</view>
				<view class="right">
					<view class="region-slecter">
						<uni-data-picker placeholder="请选择地址" popup-title="请选择城市" collection="opendb-city-china" 
						field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code" parent-field="parent_code"
						 @change="bindRegionChange" @nodeclick="onnodeclick">
						 <view class="provinceName">{{region}}</view>
						 </uni-data-picker>
					</view>
					<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import{ref}from"vue";
	import {getDate} from"../../common/utils.js";
	let date = ref(getDate());
	let endDate = getDate();
	let region = ref("请选择城市")
	function bindDateChange(e){
		console.log(e)
		date.value = e.detail.value
	}
	function bindRegionChange(e){
		console.log(e)
		let str = e.detail.value[0].text
		for(let i=1;i<e.detail.value.length;i++)
		{
			str = str+'-'+e.detail.value[i].text
		}
		region.value = str
	}
	function onnodeclick(node){
		
	}
</script>

<style lang="scss" scoped>
.userCenter{
	.section{
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0,0,0,0.05);
		.row{
			display: flex;
			justify-content: space-between;
			padding: 0 30rpx;
			height: 100rpx;
			border-bottom: 1px solid #eee;
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
				.img{
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					overflow: hidden;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					font-size: 30rpx;
					padding-left: 15rpx;
					color: #aaa;
				}
			}	
		}
		.avatar{
			height: 150rpx;
		}
	}
}
</style>
