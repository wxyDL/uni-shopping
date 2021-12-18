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
	export default {
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
              info: 2
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
