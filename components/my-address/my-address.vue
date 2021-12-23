<template>
	<view>
    <!-- 选择收货地址 -->
		<view class="address-box" v-if="JSON.stringify(address) === '{}'">
		  <button type="primary" size="mini" class="addressBtn" @click="chooseAddress">请选择收货地址+</button>
		</view>
    <!-- 收货地址信息 -->
    <view class="address-info-box" v-else>
      <view class="row1">
        <view class="row1-left">
          <view class="username">收货人：{{ address.userName }}</view>
        </view>
        <view class="row1-right">
          <view class="phone">电话：{{ address.telNumber }}</view>
          <uni-icons type="arrowright" size="16" ></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址:</view>
        <view class="row2-right">{{ address.provinceName }}{{ address.cityName }}{{ address.countyName }}{{ address.detailInfo }}</view>
      </view>
    </view>
    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border">
	</view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
	export default {
		data() {
			return {};
		},
    computed:{
      ...mapState('m_user', ['address'])
    },
    methods:{
      ...mapMutations('m_user', ['updateAddress']),
      // 点击选择收货地址
      async chooseAddress () {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          this.updateAddress(succ)
        }
        // 判断用户有没有授权
         if (err && (err.errMsg === 'chooseAddress:fail auth deny' || err.errMsg === 'chooseAddress:fail authorize no response')) {
            this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
          }
      },
      // 调用此方法，重新发起收货地址的授权
      async reAuth () {
        const [err, confiRelts] = await uni.showModal({
          content: '检测到你没有打开地址授权，是否去打开',
          confirmText: '确认',
          cancelText: '取消'
        })
        // 如果授权错误则直接返回
        if (err) return
        if (confiRelts.cancel) return this.$showMsg('您取消了授权')
        if (confiRelts.confirm) return uni.openSetting({
          success: (settingResult) => {
            if (!settingResult.authSetting['scope.address']) return this.$showMsg('您取消了授权')
            if (settingResult.authSetting['scope.address']) return this.$showMsg('授权成功')
          }
        })
      }
    }
	}
</script>

<style lang="scss">
.address-border{
  display: block;
  width: 100%;
  height: 5px;
}
.address-box{
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.address-info-box{
  font-size: 12px;
  height: 90px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 5px;
  .row1{
    display: flex;
    justify-content: space-between;
    .row1-right{
      display: flex;
      justify-content: space-between;
    }
  }
  .row2{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>
