<template>
	<view class="ChangeNickname">
		<view class="section">
			<view class="input-wrapper">
			    <input id="nickname-input" class="nickname-input" :value="nickname" />
				<button id="nickname-button" class="nickname-button">
					<view class="button-text">确认更改</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import{ref}from"vue"
	let nickname = ref("金方琢")
</script>

<style lang="scss" scoped>
 .input-wrapper{
	height: 80rpx;
	background-color: #ffffff;
  }
  .nickname-input{
    height: 60rpx;
	width: 100%;
    font-size: 30rpx;
    padding-top: 5px;
	background-color: #ffffff;
  }
  .nickname-button{
	  margin-top:60rpx;
	  width: 100%;
	  height: 100rpx;
	  border: 1px solid #eee;
	  background-color: #6495ed;
	  .button-text{
		  color: #ffffff;
	  }
  }
  .ChangeNickname{
	  height: 1000rpx;
	  width: 100%;
	  background-color: #f5f5f5;
  }
  .section{
	  height: 200rpx;
  }
</style>
