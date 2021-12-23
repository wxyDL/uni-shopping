import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('m_cart', ['total'])
  },
  watch: {
    // 监听total的变化，如果变化则tabbar的数字徽标也会变
    total () {
      this.setBadge()
    }
  },
  // 页面一加载调用
  onShow() {
    this.setBadge()
  },
  methods:{
    setBadge () {
      uni.setTabBarBadge({
        index: 2,
        text: this.total + ''
      })
    }
  }
}