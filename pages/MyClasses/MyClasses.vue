<template>
    <view class="MyClasses">
        <view v-if="loading">加载中...</view>
        <view v-else-if="List1.length === 0">
            <text>暂无数据</text>
            <button @click="fetchClasses">重新加载</button>
        </view>
        <view v-else>
            <uni-list class="list">
                <uni-list-item class="listItem" v-for="(item, index) in List1" showArrow
                :key="item" clickable @click="selectFaculty(item)">
                    <template v-slot:body>
                        <view class="slot-box">
                            <text class="slot-text">{{item}}</text> <!-- 显示学院名称 -->
                        </view>
                    </template>
                </uni-list-item>
            </uni-list>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getFaculties } from "../../utils/api.js"; // 导入 API 方法

let List1 = ref([]);
let loading = ref(true);

// 获取学院数据
const fetchClasses = () => {
    getFaculties().then(res => {
        if (res.code === 200) {
			console.log(res);
            List1.value = res.faculties;  // 将获取到的学院列表赋值给 List1
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
};

// 选择学院并跳转到班级信息页面
const selectFaculty = (faculty) => {
    console.log("参数是",faculty);
    // 跳转到 MyStudents 页面，并传递学院信息
    uni.navigateTo({
        url: '/pages/MyStudents/MyStudents?faculty='+faculty,
    });
};

// 页面加载时自动调用 fetchClasses 获取数据
onMounted(() => {
    fetchClasses();
});
</script>

<style lang="scss" scoped>
.MyClasses {
    .list {
        .listItem {
            height: 110rpx;
            .slot-text {
                font-size: 33rpx;
            }
        }
    }
}
</style>