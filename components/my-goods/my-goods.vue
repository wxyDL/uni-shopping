<template>
	<view>
		<view class="goods-item">
		  <!-- 左侧的区域 -->
		  <view class="goods-item-left">
        <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
		    <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		  </view>
		  <!-- 右侧的区域 -->
		  <view class="goods-item-right">
		    <!-- 商品名称 -->
		    <view class="goods-name">{{ goods.goods_name }}</view>
		    <!-- 商品信息 -->
		    <view class="goods-info-box">
		      <!-- 商品价格 -->
		      <view class="goods-price">￥{{ goods.goods_price | tofixed }}</view>
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numberChange"></uni-number-box>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
    props:{
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      // 动态显示数字框
      showNum: {
        type: Boolean,
        default: false
      }
    },
		data() {
			return {
				// 默认图片
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
    filters:{
      // 把商品价格以两位小数显示
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods:{
      // radio的点击事件
      radioClickHandler(){
        this.$emit('radio-change', {
            goods_id: this.goods.goods_id,
            goods_state: !this.goods.goods_state
        })
      },
      // number-box的触发事件
      numberChange (val) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    }
	}
</script>

<style lang="scss">
.goods-item{
  width: 750rpx;
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #efefef;
  .goods-item-left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-pic{
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name{
      font-size: 13px;
    }
    .goods-info-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price{
        font-size: 16px;
        color: #C00000;
      }
    }
  }
}
</style>
