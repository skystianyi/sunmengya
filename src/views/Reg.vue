<template>
  <div class="content">
    <van-cell-group>
      <van-field
        v-model="userinfo.phone"
        clearable
        placeholder="请输入您的手机号"
        size="large"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="userinfo.YZcode"
        type="text"
        placeholder="请输入您的验证码"
        right-icon="question-o"
        @click-right-icon="$toast('请输入您的验证码')"
        size="large"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="userinfo.psw"
        type="password"
        placeholder="请输入您的密码"
        right-icon="question-o"
        @click-right-icon="$toast('请输入您的密码')"
        size="large"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="userinfo.psw_again"
        type="password"
        placeholder="请再次输入您的密码"
        right-icon="question-o"
        @click-right-icon="$toast('请在再次输入您的密码')"
        size="large"
      />
    </van-cell-group>
    <span class="btn-captcha">获取验证码</span>
    <label for="label" class="read">
      <input type="checkbox" id="label" checked />我已阅读
      <a class="green">《易果服务协议》</a>
      <a class="green">《隐私条款》</a>并同意
    </label>
    <div class="Reg">
      <span @click="registHandle" class="regbtn">注册</span>
    </div>
  </div>
</template>
<script>
import { reg } from "../services/user.js";

export default {
  data() {
    return {
      userinfo: {
        phone: "",
        YZcode: "",
        psw: "",
        psw_again: ""
      }
    };
  },
  methods: {
    registHandle() {
      reg({
        userName: this.userinfo.phone,
        password: this.userinfo.psw
      })
        .then(res => {
          console.log(res)
          if(res.data.code=='error'){
            this.$dialog.alert({
              message: '用户名已存在，请重试！'
            });
            return;
          }else{
            sessionStorage.setItem('username',this.userinfo.phone)
            this.$router.push({
              name:'login'
            })
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {}
};
</script>
<style scoped>
.Reg {
  display: flex;
  justify-content: center;
}
.content {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
}
.regbtn {
  background-color: #008842;
  display: block;
  color: white;
  width: 156px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 5px;
}
.green {
  color: #008842;
}
.read {
  font-size: 12px;
  text-align: center;
  display: block;
  margin: 10px 0 34px;
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
  position: absolute;
  right: 1rem;
  top: 2.6rem;
}
</style>
