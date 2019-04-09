<template>
  <div class="list">
    <van-cell-group>
      <van-field
        v-model="userinfo.username"
        clearable
        right-icon="question-o"
        @click-right-icon="$toast('请输入您的用户名')"
        placeholder="请输入您的用户名"
        size="large"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="userinfo.psw"
        type="password"
        placeholder="请输入您的密码"
        right-icon="closed-eye"
        size="large"
      />
    </van-cell-group>
    <van-cell-group>
      <van-field
        v-model="userinfo.YZcode"
        type="text"
        placeholder="请输入验证码"
        size="large"
      />
    </van-cell-group>
    <span class="btn-captcha" >{{ rancode }}</span>
    <p class="forget" @click="forgetPsw">忘记密码？</p>
    <div class="btn">
      <input type="botton" class="login" @click="loginHandle" value="登录" />
      <input type="botton" class="reg" @click="regHandle" value="立即注册" />
    </div>
    <h1 class="logo">
      <img src="../../public/images/yiguo_logo.png" />
    </h1>
  </div>
</template>
<script>
import { loginIn } from "../utils/auth.js";
import { login } from "../services/user.js";
export default {
  data() {
    return {
      userinfo: {
        username: "",
        psw: "",
        YZcode: ""
      },
      rancode: "4MjV"
    };
  },
  created() {
    this.userinfo.username=sessionStorage.getItem('username')
    this.$eventBus.$on("creatrandom", () => {
      if (this.userinfo.YZcode != this.rancode) {
        var str = "";
        for (var i = 0; i < 4; i++) {
          str += parseInt(Math.floor(Math.random() * 10));
        }
        return (this.rancode = str);
      }
    });
  },

  methods: {
    loginHandle() {
      if(this.userinfo.YZcode==this.rancode){         
          login(
              this.userinfo.username,
              this.userinfo.psw
            ).then(res=>{
              if(res.data.code=='success'){
                sessionStorage.setItem('active',3)
                sessionStorage.setItem('token',res.data.token)
                loginIn('username',this.userinfo.username)
                this.$router.push({
                  name: "myeg"
                });
               this.$router.go(0)    
              }
            }).catch(err=>{
              console.log(err)
            })
         //登录判断            
     }else{
       alert("请输入正确的验证码！！");
       this.userinfo.YZcode='';
        this.$eventBus.$emit("creatrandom");
        return;
      }
    },
    regHandle() {
      this.$router.push({
        name: "reg"
      });
    },
    forgetPsw() {
      this.$router.push({
        name: "findpsw"
      });
    }
  }
};
</script>
<style scoped>
.list {
  margin-top: 2rem;
}
.forget {
  padding: 0 0 1.4rem 1rem;
  color: #008842;
}
input {
  border: 0;
}
.btn {
  display: flex;
  justify-content: space-around;
}
.reg,
.login {
  display: block;
  width: 30%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  border-radius: 4px;
  background: #008842;
}
.reg {
  background: 0;
  border: 1px solid #008842;
  color: #008842;
  width: 30%;
}
.logo {
  display: block;
  text-align: center;
  margin-top:5rem;
}
.logo img {
  height: 100px;
  width:240px;
}
.van-tabbar {
  display: inline !important;
}
.btn-captcha {
  width: 80px;
  height: 30px;
  font-weight: bold;
  display: flex;
  float: right;
  padding: 0 0.2rem;
  border: 1px solid #008842;
  align-items: center;
  justify-content: center;
  color: #fff;
  border-radius: 4px;
  position: absolute;
  right: 1rem;
  top: 8.6rem;
  color: red;
  font-size: 20px;
}
</style>
