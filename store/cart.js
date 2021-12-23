export default {
  namespaced: true,
  state: () => ({
    // 购物车的数据
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    // 添加购物车
    addToCart(state, goods) {
      // 判断购物车中有没有相同的商品
      const findRults = state.cart.find(x => x.goods_id === goods.goods_id)
      if (!findRults) {
        // 没有则添加到购物车中
        state.cart.push(goods)
      } else {
        // 有则将购物车中的商品添加1
        findRults.goods_count++
      }
      this.commit('m_cart/saveStorage')
    },
    // 将购物车的数据持久化保存
    saveStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // 更新购物车的商品状态
    updateGoodsState(state, goods) {
      // 判断购物车中是不是有这个商品
      const findRults = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findRults) {
        findRults.goods_state = goods.goods_state
        this.commit('m_cart/saveStorage')
      }
    },
    // 修改购物车中商品的数量
    updateGoodsCount (state, goods) {
      const findRults = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findRults) {
        findRults.goods_count = goods.goods_count
        this.commit('m_cart/saveStorage')
      }
    },
    // 删除购物车中的商品
    removeCartGoods(state, goods) {
      state.cart = state.cart.filter(x => x.goods_id !== goods.goods_id)
      this.commit('m_cart/saveStorage')
    },
    // 更新全选反选
    updateAllCheck (state, newCheck) {
      state.cart.forEach(x => x.goods_state = newCheck)
      this.commit('m_cart/saveStorage')
    }
  },
  getters: {
    // 购物车中所有商品的数量
    total (state) {
      // let c = 0
      // state.cart.forEach(x => c+= x.goods_count)
      // return c
      return state.cart.reduce((total, item) => total += item.goods_count, 0 )
    },
    // 勾选的商品总数量
    checkedCount (state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
    },
    // 计算已勾选中的商品的总价格
    checkGoodsAmount (state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) =>  total += item.goods_count * item.goods_price , 0).toFixed(2)
    }
  }
}