<template>
  <div class="content">
    <ul class="regInfo">
      <li>
        <input type="text" placeholder="请输入您的手机号" v-model="phone" />
        <span class="btn-captcha">获取验证码</span>
      </li>
      <li>
        <input type="text" placeholder="请设定您的验证码" v-model="YZcode" />
      </li>
      <li>
        <input type="password" placeholder="请设定您的密码" v-model="psw" />
      </li>
      <li>
        <input
          type="password"
          placeholder="请再次输入您的密码"
          v-model="psw_again"
        />
      </li>
    </ul>

    <div class="btn">
      <input type="botton" class="back" @click="backHandle" value="返回" />
      <input type="botton" class="sure" @click="sureHandle" value="确认" />
    </div>
  </div>
</template>
<script>
import { loginIn, isLogin } from "../utils/auth";
export default {
  data() {
    return {
      phone: "",
      YZcode: "",
      psw: "",
      psw_again: ""
    };
  },
  methods: {
    backHandle() {
      this.$router.push({
        name: "login"
      });
    },
    sureHandle() {}
  }
};
</script>
<style scoped>
.content {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}
.btn-captcha {
  width: 80px;
  height: 30px;
  font-size: 10px;
  display: flex;
  float: right;
  padding: 0 0.2rem;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  background: #008842;
}
.regInfo li {
  list-style: none;
  border-bottom: 1px solid #cecece;
  padding: 0.8rem 1rem;
}
.regInfo input {
  border: 0;
}
.btn {
  display: flex;
  justify-content: space-around;
  margin-top: 2rem;
}
.back,
.sure {
  display: block;
  width: 40%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  border-radius: 4px;
  background: #008842;
  border: 0;
}
.back {
  background: 0;
  border: 1px solid #008842;
  color: #008842;
  width: 40%;
}
</style>
