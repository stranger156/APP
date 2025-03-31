<template>
    <view class="userCenter pageBg">
        <view v-if="loading">加载中...</view>
        <view v-else-if="!hadInfo">
            <text>暂无数据</text>
            <button @click="fetchUserInfo">重新加载</button>
        </view>
        <view v-else>
            <view class="section">
            	<view class="row">
            		<view class="left">校园</view>
            		<view class="right">
            			<view>{{campus}}</view>
            		</view>
            	</view>
            	<view class="row">
            		<view class="left">手机号</view>
            		<view class="right">
            			{{phone}}
            		</view>
            	</view>
            	<navigator url="/pages/ChangeNickname/ChangeNickname"  hover-class="none" hover-stay-time="100">
            		<view class="row campus">
            			<view class="left">修改密码</view>
            			<view class="right">
            				<uni-icons type="forward" size="26" color="#aaa"></uni-icons>
            			</view>
            		</view>
            	</navigator>
            </view>
        </view>
    </view>
</template>

<script setup>
	import{ref, onMounted }from"vue";
	import {getDate} from"../../common/utils.js";
	import { getUserInfo } from "../../utils/api.js";
	let date = ref(getDate());
	let endDate = getDate();
	let region = ref("请选择城市");
	let campus = ref("");
	let phone = ref("");
	let password = ref("");
	let hadInfo = ref(false);
	let loading = ref(true);
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
	const fetchUserInfo = () => {
		getUserInfo().then(res => {
        if (res.code === 200) {
			console.log(res);
			hadInfo.value = true;
            campus.value = res.campusName;
			phone.value = res.phoneNumber;
			password.value = res.password;
            loading.value = false; // 停止加载动画
        } else {
            uni.showToast({
                title: '获取数据失败',
                icon: 'none'
            });
            loading.value = false; // 停止加载动画
        }
    }).catch(err => {
        console.error("请求失败:", err);
        uni.showToast({
            title: '请求失败，请稍后重试',
            icon: 'none'
        });
        loading.value = false; // 停止加载动画
    });
	}
	onMounted(() => {
	    fetchUserInfo();
	});
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
