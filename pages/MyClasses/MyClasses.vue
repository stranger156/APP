<template>
	<view class="MyClasses">
			<uni-list class="list">
				<uni-list-item class="listItem" v-for="(item, index) in List1" 
				showArrow :key="item.id" :to="`/pages/MyStudents/MyStudents`">
					<template v-slot:body>
						<view class="slot-box">
							<text class="slot-text">{{item.name}}</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
	</view>
</template>

<script setup>
import{ref}from"vue"
let List1 = ref([
	{id:1, name:"软件2201班"},
	{id:2, name:"软件2202班"},
	{id:3, name:"软件2203班"},
	{id:4, name:"软件2204班"},
	{id:5, name:"软件2205班"},
])
</script>

<style lang="scss" scoped>
.MyClasses{
	.list{
		.listItem{
			height: 110rpx;
			.slot-text{
				font-size: 33rpx;
			}
		}
	}
}
</style>
