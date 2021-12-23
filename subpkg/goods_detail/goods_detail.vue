<template>
	<view v-if="goodsInfo.goods_name" class="goods-detail">
		<!-- 商品轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in goodsInfo.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>
    <!-- 商品信息 -->
    <view class="goods-info-box">
      <!-- 商品价格 -->
      <view class="price">￥{{ goodsInfo.goods_price }}</view>
      <!-- 商品信息 -->
      <view class="goods-info-body">
        <!-- 商品名称 -->
        <view class="name">{{ goodsInfo.goods_name }}</view>
        <!-- 收藏 -->
        <view class="favi">
          <uni-icons type="star"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <!-- 运费 -->
      <view class="fy">
        快递：免运费
      </view>
    </view>
    <!-- 图文区域 -->
    <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
    <!-- 商品导航 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :button-group="buttonGroup" @click="onClick" @buttonClick="onButtonGroup" />
    </view>
	</view>
</template>

<script>
  import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
    computed:{
      ...mapState('m_cart', []),
      ...mapGetters('m_cart', ['total']),
    },
    watch:{
       total: {
         handler(newVal) {
           const findRulets = this.options.find(x => x.text === '购物车')
           if (findRulets) {
             findRulets.info = newVal
           }
         },
         // immediate属性用来声明侦听器，是否在页面加载完毕后调用
         immediate: true
       }
    },
		data() {
			return {
				// 商品信息
        goodsInfo: [],
        // 左侧按钮组的配置对象
            options: [{
              icon: 'shop',
              text: '店铺'
            }, {
              icon: 'cart',
              text: '购物车',
              info: 0
            }],
            // 右侧按钮组的配置对象
            buttonGroup: [{
                text: '加入购物车',
                backgroundColor: '#ff0000',
                color: '#fff'
              },
              {
                text: '立即购买',
                backgroundColor: '#ffa200',
                color: '#fff'
              }
            ]
			};
		},
    onLoad (options) {
      // 获取每个商品的id
      const goods_id = options.goods_id
      this.getGoodsDetail(goods_id)
    },
    methods: {
      ...mapMutations('m_cart', ['addToCart']),
      async getGoodsDetail (goods_id) {
        const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display: block;"').replace(/webp/g, 'jpg')
        this.goodsInfo = res.message
      },
      // 点击图片预览大图
      preview(i) {
        // 调用预览大图的方法
        uni.previewImage({
          current:i,
          urls: this.goodsInfo.pics.map(x => x.pics_big)
        })
      },
      onClick(e) {
        console.log(e)
        if (e.content.text === '购物车') {
          uni.switchTab({
            url:'/pages/cart/cart'
          })
        }
      },
      // 点击加入购物车
      onButtonGroup (e) {
        if (e.content.text === '加入购物车') {
          // 定义商品的对象属性结构
          // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
          const goods = {
            goods_id: this.goodsInfo.goods_id,
            goods_name: this.goodsInfo.goods_name,
            goods_price: this.goodsInfo.goods_price,
            goods_count: 1,
            goods_small_logo: this.goodsInfo.goods_small_logo,
            goods_state: true
          }
          // 调用addToCart加入到vuex的cart中
          this.addToCart(goods)
        }
      }
    }
	}
</script>

<style lang="scss">
swiper{
  height: 750rpx;
  image{
    width: 100%;
    height: 100%;
  }
}
.goods-info-box{
  padding: 10px;
  padding-right: 0;
  .price{
    font-size: 18px;
    color: #C00000;
    margin: 10px 0;
  }
  .goods-info-body{
    display: flex;
    justify-content: space-between;
    .name{
      font-size: 13px;
    }
    .favi{
      width: 120px;
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      color: #efefef;
      border-left: 1px solid gray;
    }
  }
  .fy{
    font-size: 13px;
    color: gray;
    margin: 10px 0;
  }
}
.goods-nav{
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.goods-detail{
  padding-bottom: 50px;
}
</style>
