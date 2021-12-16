<template>
	<view>
    <!-- 搜索框 -->
	  <view class="search-box">
	  	<uni-search-bar @input="input" :radius="100" cancelButton="none" ></uni-search-bar>
	  </view>
    <!-- 搜索数据列表 -->
    <view class="sugg-list"  v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item) in searchResults" :key="item.goods_id" @click="gotoDetail(item)">
        <view class="goods-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史记录 -->
    <view class="history-box" v-else>
      <view class="title-box">
        <text>搜索历史</text>
        <uni-icons @click="removeHistory" type="trash" size="17"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag :text="item"v-for="(item, i) in historys" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
	</view>
</template>

<script>
	export default {
    computed:{
      historys() {
        return [...this.historyList].reverse()
      }
    },
		data() {
			return {
				// 定时器
        timer: null,
        // 搜索关键词
        kw: '',
        // 搜索的数据列表
        searchResults: [],
        // 搜索的历史记录
        historyList: []
			};
		},
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods:{
      // 搜索框的input事件
      input (e) {
        // 搜索框的防抖处理
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e.value
          this.getSearchList()
        }, 500)
      },
      // 获取搜索数据列表
      async getSearchList () {
        // 判断关键词是否为空
        if (this.kw === '') {
          this.searchResults = []
          return
        }
        // 调用获取搜索数据的接口获取数据
        const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message
        // 调用保存搜索关键词的方法
        this.saveSearchHistory()
      },
      // 跳转到商品详情页
      gotoDetail (item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      // 搜索关键词的保存
      saveSearchHistory () {
        // 创建一个set对象解决历史记录重复的问题
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        // 将set对象转换成数组
        this.historyList = Array.from(set)
        // 将历史记录存储到缓存中
        uni.setStorageSync('kw', JSON.stringify(this.historyList))
      },
      // 删除历史记录
      removeHistory () {
        this.historyList = []
        uni.removeStorageSync('kw')
      },
      // 点击搜索历史跳转到商品列表页
      gotoGoodsList (item) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + item
        })
      }
    }
	}
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list{
  padding: 0 5px;
  .sugg-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goods-name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
.history-box{
  padding: 0 5px;
  .title-box{
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 12px;
    border-bottom: 1px solid #efefef;
  }
  .history-list{
    display: flex;
    .uni-tag{
      margin: 5px 5px 0 0 ;
    }
  }
}
</style>
