<template>
	<view>
		<view class="goods-list">
		  <view v-for="(goods, i) in goodsList" :key="i" @click="gotodetail(goods)">
        <my-goods :goods="goods"></my-goods>
      </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 获取商品列表所需要的参数
        queryObj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        // 商品列表
        goodsList: [],
        // 商品的总数
        total: 0,
        // 节流阀防止发起额外的请求
        isloading: false
			};
		},
    onLoad(options) {
      this.queryObj.query = options.query || '',
      this.queryObj.cid = options.cid || ''
      this.getGoodsList()
    },
    methods:{
      async getGoodsList (cb) {
        this.isloading = true
        const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isloading = false
        cb && cb(0)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      // 上拉加载更多数据
      onReachBottom () {
        // 判断数据是否加载完
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕!')
        // 如果isloading为true则是在请求数据,不需要页码加1
        if (this.isloading) return
        this.queryObj.pagenum++
        this.getGoodsList()
      },
      // 下拉刷新
      onPullDownRefresh() {
        // 重置关键参数
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
        this.getGoodsList(() => uni.stopPullDownRefresh())
      },
      // 点击商品跳转到商品详情页
      gotodetail (goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    }
	}
</script>

<style lang="scss">

</style>
