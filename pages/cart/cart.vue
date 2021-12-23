<template>
	<view class="cart-container" v-if="cart.length !== 0">
    <my-address></my-address>
		<!-- 购物车的标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 购物车的商品列表 -->
    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :options="options" @click="swipeClickHandler(goods)">
          <my-goods :goods="goods" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true" @num-change="numChange"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 商品结算 -->
    <my-settle></my-settle>
	</view>
  <!--  -->
   <view class="empty-cart" v-else>
    <image src="/static/cart_empty@2x.png" class="empty-pic"></image>
    <text class="text">空空如也~</text>
  </view>
</template>

<script>
  import tabageMix from '@/mixins/tabbar-badge.js'
  import { mapState, mapMutations } from 'vuex'
	export default {
    // 将 badgeMix 混入到当前的页面中进行使用
    mixins: [tabageMix],
    computed:{
      ...mapState('m_cart', ['cart'])
    },
		data() {
			return {
				// 左滑删除的配置
        options: [
          {
            text: '删除',
            style: {
              backgroundColor: '#C00000'
            }
          }
        ]
			};
		},
    methods:{
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeCartGoods']),
      // 点击复选框事件
      radioChangeHandler (e) {
        this.updateGoodsState(e)
      },
      // 数字框的事件
      numChange (e) {
        this.updateGoodsCount(e)
      },
      // 左滑删除商品事件
      swipeClickHandler (goods) {
        this.removeCartGoods(goods)
      }
    }
	}
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
.cart-title{
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #efefef;
  padding-left: 5px;
  .cart-title-text{
    font-size: 14px;
    margin-left: 10px;
  }
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-pic{
    width: 90px;
    height: 90px;
  }
  .text{
    font-size: 12px;
    color: gray;
    margin-top: 10px;
  }
}
</style>
