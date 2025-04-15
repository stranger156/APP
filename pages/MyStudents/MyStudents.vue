<template>
    <view class="MyStudents">
        <view v-if="loading">加载中...</view>
        <view v-else-if="List2.length === 0">
            <text>暂无数据</text>
            <button @click="fetchClasses">重新加载</button>
        </view>
        <view v-else>
            <uni-list class="list">
                <uni-list-item class="listItem" v-for="(item, index) in List2" 
                :key="item.id">
                    <template v-slot:body>
                        <view class="slot-box">
                            <text class="slot-text">{{ item }}</text>
                        </view>
                    </template>
                </uni-list-item>
            </uni-list>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getClassesByFaculty } from "../../utils/api.js";  // 导入 API 方法

let List2 = ref([]); // 用于存储班级信息
let loading = ref(true); // 用于控制加载状态

// 页面接收参数并传递给请求
const form = ref({
  faculty: null,
});

const onLoad = (option) => {
  form.value.faculty = option.faculty;
  
  console.log('Received Faculty:', form.value); // 打印接收到的参数
  fetchClasses(); // 获取班级数据
};

// 请求班级数据
const fetchClasses = () => {
  if (!form.value.faculty) {
    uni.showToast({
      title: '请选择学院',
      icon: 'none'
    });
    loading.value = false;
    return;
  }

  // 使用获取到的参数调用 API
  getClassesByFaculty({ faculty: form.value.faculty }).then(res => {
    if (res.code === 200) {
      List2.value = res.classes;  // 将获取到的班级列表赋值给 List2
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

// 页面加载时调用 onLoad 获取参数
onLoad(getCurrentPages()[getCurrentPages().length - 1].options); // 获取当前页面的 URL 参数

</script>

<style lang="scss" scoped>
.MyStudents {
    .list {
        .listItem {
            height: 110rpx;
            .slot-box {
                display: block;
                .slot-text {
                    font-size: 32rpx;
                }
                .sub-text {
                    font-size: 27rpx;
                    color: #a9a9a9;
                }
            }
        }
    }
}
</style>
