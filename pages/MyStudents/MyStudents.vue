<template>
	<view>
		<view class="MyStudents">
				<uni-list class="list">
					<uni-list-item class="listItem" v-for="(item, index) in List2" 
					 :key="item.id">
						<template v-slot:body>
							<view class="slot-box">
								<text class="slot-text">{{item.name}}</text>
								<br />
								<text class="sub-text">{{item.id}}</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
		</view>
	</view>
</template>

<script setup>
import{ref}from"vue"
let List2 = ref([
	{id:"U202217001",name:"金方琢"},
	{id:"U202217002",name:"银方琢"},
	{id:"U202217003",name:"铜方琢"},
	{id:"U202217004",name:"铁方琢"},
	{id:"U202217005",name:"金圆琢"},
	{id:"U202217006",name:"银圆琢"},
	{id:"U202217007",name:"铜圆琢"},
	{id:"U202217008",name:"铁圆琢"},
])
</script>

<style lang="scss" scoped>
.MyStudents{
	.list{
		.listItem{
			height: 110rpx;
			.slot-box{
				display: block;
				.slot-text{
					font-size: 32rpx;
				}
				.sub-text{
					font-size: 27rpx;
					color: #a9a9a9;
				}
			}
		}
	}
}
</style>
