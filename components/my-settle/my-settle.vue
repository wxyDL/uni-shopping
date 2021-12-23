<template>
	<view class="settle-container">
		<!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck"></radio>
      <text>全选</text>
    </label>
    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">￥{{ checkGoodsAmount }}</text>
    </view>
    <!-- 结算 -->
    <view class="settle">
      结算({{ checkedCount }})
    </view>
	</view>
</template>

<script>
  // 引入cart的辅助函数
  import { mapGetters, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
    computed:{
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkGoodsAmount']),
      /* 全选的选中*/
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods:{
      ...mapMutations('m_cart', ['updateAllCheck']),
      // 全选反选
      changeAllState() {
        this.updateAllCheck(!this.isFullCheck)
      }
    }
	}
</script>

<style lang="scss">
.settle-container{
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  .radio{
    display: flex;
    align-items: center;
  }
  .amount-box{
    .amount{
      color: #C00000;
      font-weight: 700;
    }
  }
  .settle{
    background-color: #C00000;
    height: 50px;
    line-height: 50px;
    color: white;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>
