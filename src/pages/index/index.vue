<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <u-button type="success" text="发送请求" :custom-style="{ width: '300rpx' }" @click="getDemo" />
    <view class="text-area">
      <view class="title">请求数据示例:</view>
      <text class="title">{{ demoData.text || '暂无数据' }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
const demoData = ref({ text: '' })

async function getDemo() {
  const res = await uni.$http.get('/v1/demo')
  demoData.value = res.data
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }
  .text-area {
    margin-top: 30rpx;
  }
  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
}
</style>
