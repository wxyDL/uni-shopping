<template>
	<view class="my-search-container" :style="{ 'background-color': bgColor }" @click="searchHandlen">
		<view class="my-search-box" :style="{ 'border-radius': radius + 'px' }">
		  <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
    props:{
      // 背景颜色
      bgColor: {
        type: String,
        default: '#C00000'
      },
      // 搜索框的圆角尺寸
      radius: {
        type: Number,
        default: 18
      }
    },
    methods:{
      searchHandlen () {
        // 给自定义组件添加点击事件
        this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
.my-search-container{
  display: flex;
  height: 50px;
  // background-color: #C00000;
  align-items: center;
  padding: 0 10px;
  .my-search-box{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    // border-radius: 18px;
    background-color: #FFFFFF;
    width: 100%;
    .placeholder{
      font-size: 15px;
      margin-left: 5px;
      cursor: pointer;
    }
  }
}
</style>
