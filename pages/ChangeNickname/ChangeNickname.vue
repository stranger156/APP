<template>
	<view class="ChangeNickname">
		<view class="section">
			<view class="input-wrapper">
			    <input id="nickname-input" class="uni-input" :value="nickname" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import{ref}from"vue"
	let nickname = ref("金方琢")
</script>

<style lang="scss" scoped>
 .input-wrapper {
    display: flex;
    padding: 8px 13px;
    margin: 5px 0;
    flex-direction: row;
    flex-wrap: nowrap;
    background-color: #ffffff;
  }

  .uni-input {
    height: 28px;
    font-size: 15px;
    padding: 0px;
    flex: 1;
    background-color: #ffffff;
  }
</style>
