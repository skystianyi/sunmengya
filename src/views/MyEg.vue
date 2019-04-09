<template>
  <div class="list">
    <div class="bg">
      <van-icon name="setting-o" class="set" color="#fff" />
      <div class="info">
        <p class="userImg">
          <img
            alt=" 用户头像"
            src="../../public/images/no-pic.jpg"
            @click="uscenterHandle"
          />
        </p>
        <p class="log_reg" v-if="!isLogin">
          <span class="login" @click="loginHandle">登录</span> /
          <span class="reg" @click="regHandle">注册</span>
        </p>
        <p class="log_reg" v-if="isLogin">
          <span>欢迎回来:{{ user }}</span>
        </p>
      </div>
    </div>
    <div class="count-info">
      <p class="count">
        <span>-</span>
        <span>卡包余额</span>
      </p>
      <p class="money">
        <span>-</span>
        <span>悠币</span>
      </p>
    </div>
    <van-tabbar :fixed="false" class="part1">
      <van-tabbar-item icon="debit-pay">待支付</van-tabbar-item>
      <van-tabbar-item icon="logistics">待收货</van-tabbar-item>
      <van-tabbar-item icon="comment-o">评价送悠币</van-tabbar-item>
      <van-tabbar-item icon="exchange">在线退换货</van-tabbar-item>
      <van-tabbar-item icon="orders-o">全部订单</van-tabbar-item>
    </van-tabbar>

    <van-tabbar :fixed="false">
      <van-tabbar-item icon="coupon-o">优惠券</van-tabbar-item>
      <van-tabbar-item icon="idcard">充值卡</van-tabbar-item>
      <van-tabbar-item icon="send-gift-o">礼品兑换券</van-tabbar-item>
      <van-tabbar-item icon="location-o">收货地址</van-tabbar-item>
    </van-tabbar>
    <van-tabbar :fixed="false">
      <van-tabbar-item icon="question-o">帮助中心</van-tabbar-item>
      <van-tabbar-item icon="manager-o">我的团购</van-tabbar-item>
      <van-tabbar-item icon="gold-coin-o">账户余额</van-tabbar-item>
      <van-tabbar-item icon="service-o">在线客服</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import { LoginOut, isLogin } from "../utils/auth.js";
export default {
  data() {
    return {
      isLogin: false,
      user: ""
    };
  },

  methods: {
    /*LoginHandle() {
      //LoginOut();
      this.$eventBus.$emit("mainNavActive", "home");
      this.$router.push({
        name: "home"
      });
    },*/
    loginHandle() {
      this.$router.push({
        name: "login"
      });
    },
    regHandle() {
      this.$router.push({
        name: "reg"
      });
    },
    uscenterHandle() {
      if(sessionStorage.getItem('token')){
        this.$router.push({
          name: "usercenter"
        });
      }else{
        this.$router.push({
          name: "login"
        });
      }
      
    }
  },
  mounted() {
    if (sessionStorage.getItem('token')) {
      this.isLogin = true;
      this.user = sessionStorage.getItem("username");
    } else {
      this.isLogin = false;
    }
  }
};
</script>
<style scoped>
.list {
  background: #f8f8f8;
}
p,
span,
img,
div {
  margin: 0;
  padding: 0;
}
.bg {
  width: 100%;
  height: 8rem;
  background: url("../../public/images/bg.jpg");
  background-size: 100% 8rem;
  overflow: hidden;
}
img {
  width: 100%;
  height: 8rem;
}
.set {
  float: right;
  margin: 0.6rem 0.8rem 0 0;
}
.userImg {
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 3px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.2rem 0 0 0.8rem;
}
.userImg img {
  width: 68px;
  height: 68px;
  border-radius: 50%;
}
.info {
  display: flex;
  align-items: center;
}
.log_reg {
  margin-left: 1rem;
  color: white;
  font-size: 0.8rem;
}
.count,
.money {
  display: flex;
  flex-direction: column;
  width: 5rem;
  height: 2rem;
  align-items: center;
}
.count-info {
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  background: #fff;
  height: 3rem;
}
.part1 {
  margin: 0.4rem 0;
}
.van-tabbar-item {
  color: #7d7e80;
}
</style>
