<template>
	<view>
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-box">
      <!-- 左侧滚动视图 -->
      <scroll-view class="left-scroll-view"  scroll-y="true" :style="{height: wh + 'px'}">
        <block v-for="(item, i) in cateList" :key="i">
           <view :class="['left-scroll-view-item', i === active ? 'active' : '']" @click="activeChanged(i)">{{item.cat_name}}</view>
        </block>
      </scroll-view>
      <!-- 右侧滚动视图 -->
      <scroll-view class="rigth-scroll-view" scroll-y="true" :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item, i) in cateLevel2" :key="i">
          <!-- 二级分类的标题 -->
          <view class="cate-lv2-title">/ {{item.cat_name}} /</view>
          <!-- 二级分类的三级分类 -->
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item2, i2) in item.children" :key="i2" @click="gotoGoodsList(item2)">
              <!-- 三级分类的图片 -->
              <image :src="item2.cat_icon"></image>
              <!-- 三级分类的文本 -->
              <text>{{item2.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
	</view>
</template>

<script>
	import tabageMix from '@/mixins/tabbar-badge.js'
	export default {
	  // 将 badgeMix 混入到当前的页面中进行使用
	  mixins: [tabageMix],
		data() {
			return {
				// 当前设备可使用的屏幕高度
        wh: 0,
        // 分类列表的数据
        cateList: [],
        // 选中项的索引
        active: 0,
        // 二级分类的数据
        cateLevel2: [],
        // 滚动条的位置
        scrollTop: 0
			};
		},
    onLoad() {
      // 获取设备信息
      const sysInfo = uni.getSystemInfoSync()
      this.wh = sysInfo.windowHeight - 50
      this.getCateList()
    },
    methods: {
      // 获取分类列表的数据
      async getCateList () {
        const { data: res } = await uni.$http.get('/api/public/v1/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        // 默认选中的二级分类的数据
        this.cateLevel2 = res.message[0].children
      },
      activeChanged (i) {
        this.active = i
        // 选中的二级分类数据
        this.cateLevel2 = this.cateList[i].children
        // 重置滚动条的位置
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      // 跳转到商品列表
      gotoGoodsList (item) {
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      // 跳转到搜索页面
      gotoSearch () {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
	}
</script>

<style lang="scss">
.scroll-view-box{
  display: flex;
  .left-scroll-view{
    width: 120px;
    .left-scroll-view-item{
      background-color: #f0f0f0;
      line-height: 60px;
      text-align: center;
      font-size: 12px;
      &.active{
        background-color:#FFFFFF;
        position: relative;
        &::before{
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #C00000;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2-title{
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.cate-lv3-list{
  display: flex;
  flex-wrap: wrap;
  .cate-lv3-item{
    width: 33.33%;
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    image{
      width: 60px;
      height: 60px;
    }
    text{
      font-size: 12px;
    }
  }
}
</style>
