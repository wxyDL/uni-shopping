import Vue from 'vue'
import App from './App'
// 导入网络请求的包
import { $http } from '@escook/request-miniprogram'
// 引入store
import store from './store/store.js'

// 将网络请求的包挂载到uni的顶级对象中
uni.$http = $http

// 请求根路径
$http.baseUrl = 'https://www.uinav.com'

// 封装提示消息
uni.$showMsg = function (title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

// 请求拦截器
$http.beforeRequest = function (options) {
  // 展示loading效果
  uni.showLoading({
    title:"数据加载中..."
  })
}

// 响应拦截器
$http.afterRequest = function () {
  // 关闭loading效果
  uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
  store
})
app.$mount()
