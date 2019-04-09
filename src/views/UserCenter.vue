<template>
  <div class="content">
    <van-nav-bar title="个人中心" @click-left="goback" left-arrow />
    <van-cell-group>
      <van-cell title="用户名" :value="userInfo.username" />
    </van-cell-group>
    <van-uploader
      :after-read="onRead"
      accept="image/gif, image/jpeg"
      multiple
      class="headImg"
      @oversize="overHandle"
      :max-size="600000"
    >
      <span class="selfImg">头像</span>
      <van-icon name="photograph" />
      <img src="../../public/images/no-pic.jpg" class="Img" ref="Img" />
    </van-uploader>
    <van-cell-group>
      <van-cell title="手机号" :value="userInfo.phone" />
    </van-cell-group>

    <van-cell-group>
      <van-cell title="密码" :value="userInfo.psw" />
    </van-cell-group>
    <div class="exit">
      <van-button type="primary" @click="exitHandle" size="large"
        >退出登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { LoginOut } from "../utils/auth.js";
export default {
  data() {
    return {
      userInfo: {
        username: "",
        Img: "",
        phone: "",
        psw: ""
      }
    };
  },
  created() {
    //var userInfo = JSON.parse(sessionStorage.getItem("username"));
    this.userInfo.username = sessionStorage.getItem("username");
    /*this.phone = userInfo[0].phone;
    this.Img = userInfo[0].Img;
    this.psw=userInfo[0].psw; */
  },
  methods:{
      goback(){
        this.$router.go(-1);
      },
      exitHandle(){
        sessionStorage.removeItem('token')
        this.$router.push({
          name:"myeg"
        })
        this.$router.go(0)
      },
      //选择图片后执行
    onRead(file) {
          //将原图片显示为选择的图片
          this.$refs.Img.src = file.content;
          this.userInfo.Img=file.content;
      },
      overHandle(){
        alert("头像数据过大，请重新上传！！！")
      }
  }
}
</script>
<style scoped>
.btn {
  width: 100%;
  margin-top: 20px;
}
h1 {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
}
.selfImg {
  font-size: 14px;
  color: #323232;
}
.Img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.headImg {
  line-height: 70px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  justify-content: space-between;
}
.exit {
  display: flex;
  justify-content: center;
  margin-top: 5rem;
}
.van-button--primary {
  background: #008842;
  width: 40%;
  border: 0;
  height: 40px;
  line-height: 40px;
}
</style>
