<template>
	<view class="ChangeNickname">
		<view class="section">
			<view class="input-wrapper">
				<input id="oldPassword-input" class="password-input" :value="oldPassword"
				placeholder="请输入现在的密码" password="true"  />
			    <input id="newPassword-input" class="password-input" :value="newPassword" 
				placeholder="请输入更改后的密码" password="true"  />
				<button id="password-button" class="password-button" @click="onClick">
					<view class="button-text">确认更改</view>
				</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import{ref}from"vue"
	import { revisePassword } from "../../utils/api";
	let oldPassword = ref("");
	let newPassword = ref("");
	const onClick = () => {
		let form = ref({
			oldPassword: oldPassword,
			newPassword: newPassword
		})
		revisePassword().then(res => {
	    if (res.code === 200) {
			console.log(res);
			uni.showToast({
			    title: res.message,
			    icon: 'success'
			});
	    }else if (res.code === 400) {
		    uni.showToast({
		        title: res.message,
		        icon: 'error'
		    });
		}else {
	        uni.showToast({
	            title: '获取数据失败',
	            icon: 'none'
	        });
	    }
	}).catch(err => {
	    console.error("请求失败:", err);
	    uni.showToast({
	        title: '请求失败，请稍后重试',
	        icon: 'none'
	    });
	});
	}
</script>

<style lang="scss" scoped>
  .ChangeNickname{
	  height: 1000rpx;
	  width: 100%;
	  background-color: #f5f5f5;
	  .section{
	  	  height: 200rpx;
	  	  .input-wrapper{
	  	  	height: 80rpx;
	  	  	background-color: #ffffff;
			.password-input{
			  height: 60rpx;
			  width: 100%;
			  font-size: 30rpx;
			  padding-top: 5px;
			  padding-bottom: 5px;
			  margin-bottom: 20rpx;
			  background-color: #ffffff;
			}
			.password-button{
				  	  	  margin-top:20rpx;
				  	  	  width: 100%;
				  	  	  height: 100rpx;
				  	  	  border: 1px solid #eee;
				  	  	  background-color: #6495ed;
				  	  	  .button-text{
				  	  		  color: #ffffff;
				  	  	  }
			}
	  	   }
	  }
  }
</style>
